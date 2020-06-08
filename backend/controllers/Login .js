const loginModel = require("../models/Login");
const sha256 = require("sha256");
const md5 = require("md5");

exports.auth = (req, res) => {
  const password = sha256(md5(req.body.email) + req.body.password);

  loginModel.getAll(req.con, req.body.email, (err, row, field) => {
    if (row.length == 0) {
      res.json({
        status: "gagal",
        message: "Email tidak ditemukan",
        data: null,
      });
    } else {
      let pwdb = row[0].password_sekolah;
      if (password == pwdb) {
        const token = req.jwt.sign(
          {
            email: row[0].email_sekolah,
            password: row[0].password_sekolah,
          },
          req.app.get("secretKey"),
          { expiresIn: "12h" }
        );
        res.json({
          status: "berhasil",
          message: "Berhasil login",
          data: {
            token: token,
          },
        });
      } else {
        res.json({
          status: "gagal",
          message: "Password salah",
          data: null,
        });
      }
    }
  });
};
