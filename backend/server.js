const express = require("express"),
  app = express();
const con = require("./configs/db.js");
const port = 5000;
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
//let baseurl = req.headers.host;
// set jwt
app.set("secretKey", "kompis"); // jwt secret token

// Validasi jwt
function validasiJWT(req, res, next) {
  jwt.verify(
    req.headers["x-access-token"],
    req.app.get("secretKey"),
    (err, decoded) => {
      if (err) {
        res.json({ status: "error", message: err.message, data: null });
      } else {
        // add user id to request
        req.body = req.body;
        console.log(req.body);
        next();
      }
    }
  );
} // express doesn't consider not found 404 as an error so we need to handle 404 explicitly

// body parser
app.use(bodyParser.urlencoded({ extended: false }));

// connecting route to database
app.use(function (req, res, next) {
  req.con = con;
  next();
});
// bring jwt to request
app.use(function (req, res, next) {
  req.jwt = jwt;
  next();
});

// include router
app.use(cors());
// routing
app.get("/", (req, res) => {
  res.json({
    message: "hello node js",
  });
});
app.use("/register", require("./routes/Register"));
app.use("/login", require("./routes/Login"));
app.use("/dashboard", validasiJWT, require("./routes/Dashboard"));
app.use("/sampah", require("./routes/Sampah"));

// pavicon
app.get("/favicon.ico", function (req, res) {
  res.sendStatus(204);
});

// handle 404 error
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
}); // handle errors
app.use(function (err, req, res, next) {
  console.log(err);

  if (err.status === 404) res.status(404).json({ message: "Not found" });
  else res.status(500).json({ message: "Kesalahan status 500" });
});

app.listen(port, () => {
  console.log("Node server listening on port " + port);
});
