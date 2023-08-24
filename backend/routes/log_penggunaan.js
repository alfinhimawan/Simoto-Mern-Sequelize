const express = require("express");
const bodyParser = require("body-parser");
const { Op } = require(`sequelize`);
const auth = require("../auth");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const model = require("../models/index");
const log_penggunaan = model.log_penggunaan;
const kendaraan = model.kendaraan;
const user = model.user;

app.get("/getAllData", auth, async (req, res) => {
  await log_penggunaan
    .findAll({
      include: [
        {
          model: kendaraan,
          as: "kendaraan",
        },
        {
          model: user,
          as: "user",
        },
      ],
    })
    .then((result) => {
      res.status(200).json({
        status: "success",
        data: result,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    });
});

app.get("/getById/:id", auth, async (req, res) => {
  await log_penggunaan
    .findByPk(req.params.id, {
      include: [
        {
          model: kendaraan,
          as: "kendaraan",
        },
        {
          model: user,
          as: "user",
        },
      ],
    })
    .then((result) => {
      if (result) {
        res.status(200).json({
          status: "success",
          data: result,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "data not found",
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    });
});

app.get("/search/:id", auth, async (req, res) => {
  await kendaraan
    .findAll({ where: { id_kendaraan: req.params.id_kendaraan } })
    .then((result) => {
      res.status(200).json({
        status: "success",
        data: result,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    });
});

app.post("/create", auth, async (req, res) => {
  const data = {
    id_kendaraan: req.body.id_kendaraan,
    id_user: req.body.id_user,
    nama_pengguna: req.body.nama_pengguna,
    tujuan: req.body.tujuan,
    km_awal: req.body.km_awal,
    km_akhir: req.body.km_akhir,
    bensin_awal: req.body.bensin_awal,
    bensin_akhir: req.body.bensin_akhir,
    tgl_berangkat: null,
    jam_berangkat: "null",
    tgl_kembali: null,
    jam_kembali: "null",
    kondisi: req.body.kondisi,
    keterangan: "null",
    status: "menunggu",
  };
  await log_penggunaan
    .findOne({
      where: { status: "telah_diacc", id_kendaraan: data.id_kendaraan },
    })
    .then((result) => {
      if (result) {
        res.status(400).json({
          status: "error",
          message: "id_kendaraan already exists",
        });
      } else {
        log_penggunaan
          .create(data)
          .then((result) => {
            res.status(200).json({
              status: "success",
              message: "data has been inserted",
              data: result,
            });
            // update status kendaraan
            kendaraan.update(
              { status: "dipakai" },
              { where: { id_kendaraan: req.body.id_kendaraan } }
            ); // mengubah status meja menjadi dipesan
          })
          .catch((error) => {
            res.status(400).json({
              status: "error",
              message: error.message,
            });
          });
      }
    });
});

app.put("/edit/:id", auth, async (req, res) => {
  const param = { id_log_penggunaan: req.params.id };
  const data = {
    id_kendaraan: req.body.id_kendaraan,
    id_user: req.body.id_user,
    nama_pengguna: req.body.nama_pengguna,
    tujuan: req.body.tujuan,
    km_awal: req.body.km_awal,
    km_akhir: req.body.km_akhir,
    bensin_awal: req.body.bensin_awal,
    bensin_akhir: req.body.bensin_akhir,
    tgl_berangkat: req.body.tgl_berangkat,
    jam_berangkat: req.body.jam_berangkat,
    tgl_kembali: req.body.tgl_kembali,
    jam_kembali: req.body.jam_kembali,
    kondisi: req.body.kondisi,
    keterangan: req.body.keterangan,
    status: req.body.status,
  };
  log_penggunaan.findOne({ where: param }).then((result) => {
    if (result) {
      log_penggunaan
        .update(data, { where: param })
        .then((result) => {
          res.status(200).json({
            status: "success",
            message: "data berhasil diubah",
            data: {
              id_log_penggunaan: param.id_log_penggunaan,
              ...data,
            },
          });

          if (req.body.status === "tolak") {
            kendaraan.update(
              { status: "tidak_dipakai" },
              { where: { id_kendaraan: req.body.id_kendaraan } }
            );
          }
        })
        .catch((error) => {
          res.status(400).json({
            status: "error",
            message: error.message,
          });
        });
    } else {
      // jika data tidak ditemukan
      res.status(404).json({
        // mengembalikan response dengan status code 404 dan pesan data tidak ditemukan
        status: "error",
        message: "data tidak ditemukan",
      });
    }
  });
});

app.put("/acc/:id", async (req, res) => {
  const param = { id_log_penggunaan: req.params.id };
  const data = {
    status: req.body.status,
  };
  log_penggunaan.findOne({ where: param }).then((result) => {
    if (result) {
      log_penggunaan
        .update(data, { where: param })
        .then((result) => {
          res.status(200).json({
            status: "success",
            message: "data berhasil diubah",
            data: {
              id_log_penggunaan: param.id_log_penggunaan,
              status: data.status,
            },
          });

          if (req.body.status === "ditolak") {
            kendaraan.update(
              { status: "tidak_dipakai" },
              { where: { id_kendaraan: req.params.id } }
            );
          }
          if (req.body.status === "telah_diacc") {
            kendaraan.update(
              { status: "dipakai" },
              { where: { id_kendaraan: req.params.id } }
            );
          }
        })
        .catch((error) => {
          res.status(400).json({
            status: "error",
            message: error.message,
          });
        });
    } else {
      // jika data tidak ditemukan
      res.status(404).json({
        // mengembalikan response dengan status code 404 dan pesan data tidak ditemukan
        status: "error",
        message: "data tidak ditemukan",
      });
    }
  });
});

app.put("/tolak", async (req, res) => {
  const param = { id_log_penggunaan: req.body.id };
  const data = {
    keterangan: req.body.keterangan,
  };
  log_penggunaan.findOne({ where: param }).then((result) => {
    if (result) {
      log_penggunaan
        .update(data, { where: param })
        .then((result) => {
          res.status(200).json({
            status: "success",
            message: "data berhasil diubah",
            data: {
              id_log_penggunaan: param.id_log_penggunaan,
              keterangan: data.keterangan,
            },
          });
        })
        .catch((error) => {
          res.status(400).json({
            status: "error",
            message: error.message,
          });
        });
    } else {
      // jika data tidak ditemukan
      res.status(404).json({
        // mengembalikan response dengan status code 404 dan pesan data tidak ditemukan
        status: "error",
        message: "data tidak ditemukan",
      });
    }
  });
});

app.put("/go/:id", async (req, res) => {
  const param = { id_log_penggunaan: req.params.id };
  const data = {
    status: req.body.status,
  };
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentSeconds = currentTime.getSeconds();

  const formattedTime = `${currentHour}:${currentMinutes}:${currentSeconds}`;

  const currentYear = currentTime.getFullYear();
  const currentMonth = currentTime.getMonth() + 1;
  const currentDate = currentTime.getDate();

  const formattedDate = `${currentYear}-${currentMonth}-${currentDate}`;

  log_penggunaan.findOne({ where: param }).then((result) => {
    console.log(result);
    if (result) {
      if (req.body.status === "berangkat") {
        log_penggunaan
          .update(
            { jam_berangkat: formattedTime, tgl_berangkat: formattedDate },
            { where: { id_log_penggunaan: req.params.id } }
          )
          .then((outturn) => {
            console.log(outturn);
            res.status(200).json({
              status: "success",
              message: "data berhasil diubah",
              data: {
                jam_berangkat: formattedTime,
              },
            });
          })
          .catch((error) => {
            res.status(400).json({
              status: "error",
              message: error.message,
            });
          });
      }
      if (req.body.status === "kembali") {
        log_penggunaan
          .update(
            { jam_kembali: formattedTime, tgl_kembali: formattedDate },
            { where: { id_log_penggunaan: req.params.id } }
          )
          .then((outcome) => {
            res.status(200).json({
              status: "success",
              message: "data berhasil diubah",
              data: {
                jam_kembali: formattedTime,
              },
            });
          })
          .catch((error) => {
            res.status(400).json({
              status: "error",
              message: error.message,
            });
          });
      }
    } else {
      // jika data tidak ditemukan
      res.status(404).json({
        // mengembalikan response dengan status code 404 dan pesan data tidak ditemukan
        status: "error",
        message: "data tidak ditemukan",
      });
    }
  });
});

app.delete("/delete/:id", auth, async (req, res) => {
  const param = { id_log_penggunaan: req.params.id };
  const penggunaan = await log_penggunaan.findOne({ where: param });
  log_penggunaan
    .destroy({ where: param })
    .then(async (result) => {
      if (result) {
        await kendaraan.update(
          { status: "tidak_dipakai" },
          { where: { id_kendaraan: penggunaan.id_kendaraan } }
        );
        res.status(200).json({
          status: "success",
          message: "data has been deleted",
          data: param,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "data not found",
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    });
});

module.exports = app;
