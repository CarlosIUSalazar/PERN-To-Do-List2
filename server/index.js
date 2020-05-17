const express = require("express")
const app = express();
const cors = require("cors")
const pool = require("./db")  //By using pool we can run queries with postgres

//middleware
app.use(cors())
app.use(express.json());   //req.body To get data from client side you need the request.body object, and then we can get JSON data.


// Arguments to the SQL function are referenced in the function body using the syntax $n: $1 refers to the first argument, $2 to the second, and so on. If an argument is of a composite type, then the dot notation, e.g., $1.name, can be used to access attributes of the argument.

//ROUTES//
//create a todo

app.post("/todos", async(req,res) => {
    try {
        const {description} = req.body;   //Insert into table todo2 column description 
        const newTodo = await pool.query("INSERT INTO todo2 (description) VALUES($1) RETURNING * ",   //RETURNING Adds the inserted data to the raw JSON easy to see in console 21:53
        [description]
    );
    res.json(newTodo)  //[0] gives us something easier to read in postman lower serction
    } catch (err) {
        console.error(err.message);
    }
});

//get all todos

app.get("/todos", async(req,res) =>{
    try{
        const allTodos = await pool.query("SELECT * FROM todo2");  //you dont need Returning * because the prupose of Select * is to return data
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message)
    }
})


//get a todo
app.get("/todos/:id", async(req,res) => {
    try{
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo2 WHERE todo_id2 = $1", [
            id
        ]);
        res.json(todo.rows[0])  //We just want one to do
        //console.log(req.params)
    } catch (err) {
        console.error(err.message)
    }
})

//update a todo
app.put("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const updateTodo = await pool.query(
        "UPDATE todo2 SET description = $1 WHERE todo_id2 = $2",
        [description, id]  //$1 is description and $2 is id
      );
  
      res.json("Todo was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });

//delete
app.delete("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM todo2 WHERE todo_id2 = $1", [
        id
      ]);
      res.json("Todo was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });
  


app.listen(5000, () => {
    console.log("server has started on port 5000")
})