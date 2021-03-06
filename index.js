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
        res.status(201).json(newTodo.rows);
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

app.patch("/todo/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { desc } = req.body;
        const todo = await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2", [desc, id])
        res.status(204);
    } catch (error) {
        console.log(error);
    }
});

app.delete("/todo/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("DELETE FROM todo WHERE todo_id=$1", [id])
        res.json("Record Deleted!!!!");
    } catch (error) {
        console.log(error);
    }
});



app.listen(port, () => {
    console.log("App is running at port: " + port);
})