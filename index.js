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
        console.log(error);
    }
});

app.get("/", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.status(200).json(allTodos.rows);
    } catch (error) {
        console.log(error);
    }
});

app.get("/todo/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id])
        res.status(200).json(todo.rows);
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () => {
    console.log("App is running at port: " + port);
})