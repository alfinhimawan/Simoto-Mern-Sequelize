const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt")
const { Op } = require(`sequelize`);
const auth = require("../auth")
const jwt = require("jsonwebtoken");
const SECRET_KEY = "TryMe"

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const model = require("../models/index");
const user = model.user;

app.post("/auth", async (req, res) => { 
  const data = await user.findOne({ where: { email: req.body.email } });

  if (data) { 
    const validPassword = await bcrypt.compare(
      req.body.password, 
      data.password 
    );
    if (validPassword) { 
      let payload = JSON.stringify(data); 
      let token = jwt.sign(payload, SECRET_KEY); 
      res.status(200).json({
        status: "success", 
        logged: true, 
        message: "valid password", 
        token: token,
        data: data, 
      });
    } else { 
      res.status(400).json({ 
        status: "error", 
        message: "invalid Password",
      });
    }
  } else { 
    res.status(400).json({ 
      status: "error", 
      message: "user does not exist",
    });
  }
});

app.get("/getAllData", auth, async (req, res) => { 
    await user
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
    await user
      .findOne({ where: {id_user: req.params.id}})
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

app.get("/search/:role", auth, async (req, res) => { 
  await user
    .findAll({ where: { role: req.params.role } }) 
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

app.post("/register", async (req, res) => {
  const data = {
    departemen: req.body.departemen,
    nama_karyawan: req.body.nama_karyawan,
    role: req.body.role,
    email: req.body.email,
    password:  bcrypt.hashSync(req.body.password, 10),
    resultArr: {},
  };
  await user 
    .findAll({ 
      where: { 
        [Op.or]: [{ email: data.email }],
      },
    })
    .then((result) => {
      resultArr = result; 
      if (resultArr.length > 0) { 
        res.status(400).json({ 
          status: "error", 
          message: "email already exist", 
        });
      } else { 
        user 
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
  const param = { id_user: req.params.id };
  const data = { 
      departemen: req.body.departemen,
      nama_karyawan: req.body.nama_karyawan,
      role: req.body.role,
      email: req.body.email,
      password: req.body.password,
      resultArr: {},
  };
  if (data.password) { 
    const salt = await bcrypt.genSalt(10); 
    data.password = await bcrypt.hash(data.password, salt);
  }
  if (data.email) { 
    user 
      .findAll({ 
        where: { 
          [Op.or]: [{ email: data.email }], 
        },
      })
      .then((result) => { 
        resultArr = result; 
        if (resultArr.length > 0) { 
          res.status(400).json({ 
            status: "error",  
            message: "email already exist", 
          });
        }
      });
  }
  user 
    .update(data, { where: param }) 
    .then((result) => { 
      res.status(200).json({ 
        status: "success", 
        message: "user has been updated", 
        data: { 
          id_user: param.id_user,
          departemen: data.departemen,
          nama_karyawan: data.nama_karyawan,
          role: data.role,
          email: data.email,
        },
      });
    })
    .catch((error) => { 
      res.status(400).json({ 
        status: "error",
        message: error.message,
      });
    });
});

app.delete("/delete/:id", auth, async (req, res) => {
    const param = { id_user: req.params.id };
    user
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