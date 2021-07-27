const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const port = 5000;


//middlewares

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log("App is running at port: " + port);
})