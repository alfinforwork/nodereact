const express = require("express");
let router = express.Router();
const register = require("./../controllers/register");

const { check, validationResult } = require("express-validator");
router.post(
  "/action",
  [
    check("id_jenjang_pendidikan")
      .trim()
      .isAlphanumeric()
      .withMessage("Pilih jenjang dengan benar"),
    check("id_lembaga_pendidikan")
      .trim()
      .isAlphanumeric()
      .withMessage("Pilih lembaga dengan benar"),
    check("email_sekolah")
      .trim()
      .isEmail()
      .withMessage("Isi email sekolah dengan benar"),
    check("nomor_tlp_sekolah")
      .trim()
      .isNumeric()
      .withMessage("Isi nomor telp sekolah dengan benar"),
    check("password_sekolah")
      .trim()
      .isAlphanumeric()
      .withMessage("Isi password dengan benar"),
    check("konfirmasi_password_sekolah")
      .trim()
      .isAlphanumeric()
      .withMessage("Isi konfirmasi password dengan benar"),
    check("nama_sekolah")
      .trim()
      .matches(/^[A-Za-z\s]+$/)
      //   .isAlpha()
      .withMessage("Isi nama sekolah dengan benar"),
    check("alamat_sekolah")
      .trim()
      .notEmpty()
      .withMessage("Isi alamat sekolah dengan benar"),
    check("id_provinsi")
      .trim()
      .isAlphanumeric()
      .withMessage("Pilih provinsi dengan benar"),
    check("id_kabupaten")
      .trim()
      .isAlphanumeric()
      .withMessage("Pilih kabupaten dengan benar"),
    check("id_kecamatan")
      .trim()
      .isAlphanumeric()
      .withMessage("Pilih kecamatan dengan benar"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ status: "gagal", message: errors.array(), data: null });
    }
    next();
  },
  register.daftar
);
module.exports = router;
