const sha256 = require("sha256");
const md5 = require("md5");
const registerModel = require("./../models/Register");
const mail = require("./../configs/send_email");
const moment = require("moment");
exports.daftar = async (req, res) => {
  let ver_code = Math.floor(100000 + Math.random() * 900000);
  // console.log(req.headers.host);
  let prefix = "SKLH" + moment().format("DDMMYYYY");
  let d = await registerModel.prefix(req.con, prefix);
  nomor = d[0].max == null ? 0000 : d[0].max.substr(12, 4); //pecah prefix
  nomor++; //nomor++
  // nomor.padStart(4, "0"); //format nomor
  nomor = ("0000" + nomor).slice(-4); //format nomor
  let resultPrefix = prefix + nomor;
  let data = {
    id_sekolah: resultPrefix,
    id_lembaga_pendidikan: req.body.id_lembaga_pendidikan,
    id_jenjang_pendidikan: req.body.id_jenjang_pendidikan,
    nama_sekolah: req.body.nama_sekolah,
    alamat_sekolah: req.body.alamat_sekolah,
    id_provinsi: req.body.id_provinsi,
    id_kabupaten: req.body.id_kabupaten,
    id_kecamatan: req.body.id_kecamatan,
    email_sekolah: req.body.email_sekolah,
    nomor_tlp_sekolah: req.body.nomor_tlp_sekolah,
    id_status_bank_sampah: 0,
    password_sekolah: sha256(
      md5(req.body.email_sekolah) + req.body.password_sekolah
    ),
    kode_verifikasi_sekolah: ver_code,
    tgl_daftar: moment().format("YYYY-MM-DD HH:mm:ss"),
    status_sekolah_remove: 1,
  };

  let cekemail = await registerModel.getbyemail(req.con, data.email_sekolah);
  let ceknomortelp = await registerModel.getbynomor(
    req.con,
    data.nomor_tlp_sekolah
  );
  console.log(cekemail.length + " " + ceknomortelp.length);
  if (cekemail.length > 0 && ceknomortelp.length > 0) {
    res.json({
      status: "gagal",
      message: "Email dan nomor telp sudah dipakai",
      data: null,
    });
  } else if (cekemail.length > 0) {
    res.json({
      status: "gagal",
      message: "Email sudah dipakai",
      data: null,
    });
  } else if (ceknomortelp.length > 0) {
    res.json({
      status: "gagal",
      message: "Nomor telp sudah dipakai",
      data: null,
    });
  } else {
    await registerModel.daftar(req.con, data).then(async (err, row) => {
      if (err) {
        console.log(err);
        res.json({
          status: "gagal",
          message: "Register gagal",
          data: err,
        });
      } else {
        let send_email = await mail.send_email(
          "alfinforwork@gmail.com",
          "register",
          `<h1>Masukkan verifikasi kode ${ver_code} atau bisa verifikasi otomatis dengan <a href="http://${req.headers.host}/register/verifikasi/${resultPrefix}/${ver_code}">klik disini</a></h1>`
        );
        if (send_email) {
          res.json({
            status: "berhasil",
            message: "Register berhasil",
            data: null,
          });
        } else {
          res.json({
            status: "gagal",
            message: "Email gagal dikirim",
            data: null,
          });
        }
      }
    });
  }
};
