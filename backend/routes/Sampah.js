"use strict";
const express = require("express");
const dashboardRouter = require("../controllers/Dashboard");
const { check, validationResult } = require("express-validator");
let router = express.Router();

let sampah = (koneksi, data) => {
  return new Promise((callback) => {
    koneksi.query("SELECT * from jenis_sampah", (err, row) => {
      if (err) throw err;
      callback(row);
    });
  });
};

router.get("/getbysekolah", async (req, res) => {
  let sampahNew = await sampah(req.con, null);
  res.json({
    status: "berhasil",
    message: "berhasil mendapatkan data sampah",
    data: sampahNew,
  });
});

module.exports = router;
