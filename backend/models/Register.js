exports.getbyemail = async (con, email) => {
  return new Promise((callback, error) => {
    con.query(
      "select * from sekolah where email_sekolah=?",
      [email],
      (err, row) => {
        if (err) return error(err);
        callback(row);
      }
    );
  });
};
exports.getbynomor = async (con, nomor) => {
  return new Promise((callback, error) => {
    con.query(
      "select * from sekolah where nomor_tlp_sekolah=?",
      [nomor],
      (err, row) => {
        if (err) return error(err);
        callback(row);
      }
    );
  });
};
exports.daftar = (con, body) => {
  return new Promise((callback) => {
    con.query("insert into sekolah set ?", body, (err, row) =>
      callback(err, row)
    );
  });
};
exports.prefix = (con, id) => {
  return new Promise((callback) => {
    con.query(
      "SELECT max(id_sekolah) AS max FROM sekolah WHERE id_sekolah LIKE '" +
        id +
        "%'",
      (err, row) => callback(row)
    );
  });
};
