exports.jumlahKoin = (con, id_sekolah, callback) => {
  con.query(
    "SELECT SUM(saldo_siswa) as total_saldo_siswa FROM siswa where id_sekolah = '" +
      id_sekolah +
      "' GROUP BY id_sekolah",
    callback
  );
};
exports.totalBeratSampah = (con, id_sekolah, callback) => {
  console.log(id_sekolah);
  con.query(
    "select sum(berat_setoran) as totalBeratSampah from setoran_siswa s join setoran_siswa_detail d on d.id_setoran_siswa = s.id_setoran_siswa where id_sekolah = '" +
      id_sekolah +
      "' and id_status_setoran=7",
    callback
  );
};
