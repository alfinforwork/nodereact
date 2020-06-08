const dashboardModel = require("./../models/dashboard");
exports.jumlahKoin = (req, res) => {
  dashboardModel.jumlahKoin(
    req.con,
    req.query.id_sekolah,
    (err, row, field) => {
      if (row.length == 0) {
        res.json({
          status: "gagal",
          message: "Sekolah tidak ditemukan",
          data: null,
        });
      } else {
        res.json({
          status: "berhasil",
          message: "jumlah koin",
          data: row,
        });
      }
    }
  );
};

exports.totalBeratSampah = (req, res) => {
  dashboardModel.totalBeratSampah(
    req.con,
    req.query.id_sekolah,
    (err, row, field) => {
      if (row.length == 0) {
        res.json({
          status: "gagal",
          message: "Data tidak ditemukan",
          data: null,
        });
      } else {
        res.json({
          status: "berhasil",
          message: "",
          data: row,
        });
      }
    }
  );
};
