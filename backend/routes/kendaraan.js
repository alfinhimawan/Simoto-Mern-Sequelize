const express = require("express");
const bodyParser = require("body-parser");
const { Op } = require(`sequelize`);
const auth = require("../auth")

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const model = require("../models/index");
const kendaraan = model.kendaraan;

app.get("/getAllData", auth, async (req, res) => { 
    await kendaraan
      .findAll()
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
    await kendaraan
      .findOne({ where: {id_kendaraan: req.params.id}})
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

app.get("/search/:alias_name", auth, async (req, res) => { 
  await kendaraan
    .findAll({ where: { alias_name: req.params.alias_name } }) 
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
  
app.post("/create", auth, async (req,res) => {
    const data = {
        nopol: req.body.nopol,
        alias_name: req.body.alias_name,
        merk: req.body.merk,
        jenis: req.body.jenis,
        tanggal_pajak: req.body.tanggal_pajak,
        status: "tidak_dipakai"
    };
    await kendaraan
    .findOne({ where: { nopol: data.nopol } })
    .then((result) => { 
      if (result) {
        res.status(400).json({
          status: "error",
          message: "nopol already exists",
        });
      } else {
        kendaraan 
          .create(data) 
          .then((result) => { 
            res.status(200).json({ 
              status: "success",
              message: "data has been inserted", 
              data: result, 
            });
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
  const param = { id_kendaraan: req.params.id };
  const data = {
    nopol: req.body.nopol,
    alias_name: req.body.alias_name,
    merk: req.body.merk,
    jenis: req.body.jenis,
    tanggal_pajak: req.body.tanggal_pajak,
    status: req.body.status
};

kendaraan.findOne({ where: param }).then((result) => {
    if (result) {
      if (data.nopol != null) { 
        kendaraan
          .findOne({ where: { nopol: data.nopol } }) 
          .then((result) => {
            if (result) { 
              res.status(400).json({
                status: "error",
                message: "nopol already exists",
              });
            } else {
              kendaraan
                .update(data, { where: param })
                .then((result) => { 
                  res.status(200).json({
                    status: "success",
                    message: "data has been updated",
                    data: { 
                      id_kendaraan: param.id_kendaraan,
                      nopol: req.body.nopol,
                      alias_name: req.body.alias_name,
                      merk: req.body.merk,
                      jenis: req.body.jenis,
                      tanggal_pajak: req.body.tanggal_pajak,
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
          });
      } else {
        kendaraan
          .update(data, { where: param })
          .then((result) => {
            res.status(200).json({ 
              status: "success",
              message: "data has been updated",
              data: {
                nopol: data.nopol,
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
      res.status(404).json({
        status: "error",
        message: "data not found",
      });
    }
  });
});

app.delete("/delete/:id",  async (req, res) => {
    const param = { id_kendaraan: req.params.id };
    kendaraan
      .destroy({ where: param })
      .then((result) => {
        if (result) {
          res.status(200).json({
            status: "success",
            message: "data has been delete",
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

module.exports = app