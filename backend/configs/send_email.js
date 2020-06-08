const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "mzq100m@gmail.com", // generated ethereal user
    pass: "Alpin123", // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false,
  },
});
exports.send_email = (email, subject, message) => {
  return new Promise((result) => {
    var mailOptions = {
      from: "System kompis <mzq100m@gmail.com>",
      to: `${email}`,
      subject: `${subject}`,
      html: `${message}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        result(false);
      } else {
        result(true);
      }
    });
  });
};
