"use strict";
const express = require("express");
const dashboardRouter = require("../controllers/Dashboard");
const { check, validationResult } = require("express-validator");
let router = express.Router();

router.get(
  "/jumlahkoin",
  [
    check("id_sekolah")
      .trim()
      .isAlphanumeric()
      .withMessage("Masukkan data dengan benar"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ status: "gagal", message: errors.array(), data: null });
    } else {
      next();
    }
  },
  dashboardRouter.jumlahKoin
);
router.get(
  "/totalberatsampah",
  [
    check("id_sekolah")
      .trim()
      .isAlphanumeric()
      .withMessage("Masukkan data dengan benar"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ status: "gagal", message: errors.array(), data: null });
    } else {
      next();
    }
  },
  dashboardRouter.totalBeratSampah
);

module.exports = router;
