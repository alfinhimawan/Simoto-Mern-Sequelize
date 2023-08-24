const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());

const kendaraan = require('./routes/kendaraan')
app.use('/kendaraan', kendaraan)

const user = require('./routes/user')
app.use('/user', user)

const riwayat_service = require('./routes/riwayat_service')
app.use('/riwayat_service', riwayat_service)

const log_penggunaan = require('./routes/log_penggunaan')
app.use('/log_penggunaan', log_penggunaan)

app.listen(PORT, () => {
    console.log("server run on port " + PORT);
});