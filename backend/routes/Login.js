const express = require("express");
let router = express.Router();
const login = require("../controllers/Login ");
const { check, validationResult } = require("express-validator");

router.post(
  "/auth",
  [check("email").isEmail(), check("password").isLength({ min: 5 })],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ status: "gagal", message: errors.array(), data: null });
    }
    next();
  },
  login.auth
);
module.exports = router;
