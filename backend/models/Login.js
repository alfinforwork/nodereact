exports.getAll = (con, email, callback) => {
  con.query(
    // "select * from sekolah where email_sekolah='" + email + "'",
    "select * from sekolah where email_sekolah='" + email + "'",
    callback
  );
};
