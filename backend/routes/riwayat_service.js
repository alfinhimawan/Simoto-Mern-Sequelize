const express = require("express");
const bodyParser = require("body-parser");
const { Op } = require(`sequelize`);
const auth = require("../auth")

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const model = require("../models/index");
const riwayat_service = model.riwayat_service;

app.get("/getAllData", auth, async (req, res) => { 
    await riwayat_service
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
    await riwayat_service
      .findOne({ where: {id_riwayat_service: req.params.id}})
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
  riwayat_service 
    .findAll({
      where: { 
        [Op.or]: [
          { alias_name: { [Op.like]: "%" + req.params.alias_name + "%" } },
        ],
      },
    })
    .then((result) => { 
      if (result.length > 0) { 
        res.status(200).json({ 
          status: "success",
          message: "data berhasil ditemukan",
          data: result,
        });
      } else { 
        res.status(400).json({
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

app.post("/create", auth, (req,res) => {
    let data = {
        alias_name: req.body.alias_name,
        tempat_service: req.body.tempat_service,
        tgl_service_awal: req.body.tgl_service_awal,
        tgl_service_selesai: req.body.tgl_service_selesai,
        detail_service: req.body.detail_service,
        pic: req.body.pic
    }
    riwayat_service.create(data)
        .then(result => {
            res.json({
                status: "success", 
                message: "data has been inserted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.put("/edit/:id", auth, (req,res) => {
    let param = {
        id_riwayat_service : req.params.id
    }
    let data = {
        alias_name: req.body.alias_name,
        tempat_service: req.body.tempat_service,
        tgl_service_awal: req.body.tgl_service_awal,
        tgl_service_selesai: req.body.tgl_service_selesai,
        detail_service: req.body.detail_service,
        pic: req.body.pic
    }
    riwayat_service.update(data, {where: param})
        .then(result => {
            res.json({
                status: "success", 
                message: "data has been updated"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.delete("/delete/:id", auth,async (req, res) => {
    const param = { id_riwayat_service: req.params.id };
    riwayat_service
      .destroy({ where: param })
      .then((result) => {
        if (result) {
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