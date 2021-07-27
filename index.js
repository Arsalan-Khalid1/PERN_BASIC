const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const port = 5000;


//middlewares

app.use(cors());
app.use(express.json());


//routes


//controller

app.post("/todo", async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        res.status(201).json(newTodo);
    } catch (error) {
        res.json(error);
    }
});

app.listen(port, () => {
    console.log("App is running at port: " + port);
})