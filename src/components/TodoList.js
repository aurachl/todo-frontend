import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { useEffect } from "react";
import axios from "axios";
import { getTodos, updateTodoData } from "../lib/api";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos()
      .then((todos) => setTodos(todos))
      .catch((error) => alert(error.message));
  }, []);

  const addTodo = (todo) => {
    if (!todo.title || /^\s*$/.test(todo.title)) {
      return;
    }

    axios
      .post("http://localhost:3000/api/v1/to-dos", {...todo}).then(()=>{
        getTodos()
      .then((todos) => setTodos(todos))
      .catch((error) => alert(error.message));
    });
  };

  const showDescription = (todoId) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.showDescription = !todo.showDescription;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const updateTodo = (todoId, { title, description}) => {
    if (!title || /^\s*$/.test(title)) {
      return;
    }

    updateTodoData(todoId, { title, description })
    .then(() => {
      getTodos()
        .then((todos) => setTodos(todos))
        .catch((error) => alert(error.message));
    })
    .catch((error) => alert(error.message));

  };

  const removeTodo = (id) => {
    axios
      .delete(`http://localhost:3000/api/v1/to-dos/${id}`).then(()=>{
        getTodos()
          .then((todos) => setTodos(todos))
          .catch((error) => alert(error.message));
    });
  };

  const completeTodo = (id, is_done) => {
    updateTodoData(id, { isDone: is_done === 1 ? 0 : 1 })
      .then(() => {
        getTodos()
        .then((todos) => setTodos(todos))
        .catch((error) => alert(error.message));
      })
      .catch((error) => alert(error.message));
  };

  return (
    <>
      <h1>✅ 🇹🅾️🇩🅾️ ✅</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        showDescription={showDescription}
      />
      {/* <footer>
        <br></br>
        <p><img src="https://cdn-icons-png.flaticon.com/512/984/984196.png" width="30"></img></p>
        <p><b>&copy; 2022 Aura Chamalé</b></p><br></br>
        <p><img src="https://cdn-icons-png.flaticon.com/512/1384/1384088.png" width="30"></img></p>
        <p><b><a href="https://www.linkedin.com/in/aurachamale">My Linkedin</a></b></p><br></br>
        <p><img src="https://cdn-icons-png.flaticon.com/512/1051/1051377.png" width="30"></img></p>
        <p><b><a href="https://github.com/aurachl">My GitHub</a></b></p><br></br>
        <p><img src="https://uploads-ssl.webflow.com/622ecede02e90a7526aafe35/6232b7e105cd6b4c54b5b628_faviconcc.png" width="30"></img></p>
        <p><b><a href="https://www.core-code.io/">CoreCode</a></b></p><br></br>  
      </footer> */}
      <footer class="footerapp">
        <div class="group-1">
          <div class="box">
            <a href="https://www.core-code.io/">
              <img src="https://uploads-ssl.webflow.com/622ecede02e90a7526aafe35/622ed25bed04e77d4988729b_corecode%20logo%20negative.svg" alt="CoreCode Logo" width="150"></img>  
            </a>
            <h2>About Me</h2>
            <p>This is my final project for the bootcamp "Software Dev. Fundamentals" 🚀 </p>
            <p>Thanks for dropping by ⚙️ Developer in process 🔧</p>
          </div>
          <div class="box">
            <img src="https://cdn-icons-png.flaticon.com/512/2026/2026506.png" alt="Let's Connect" width="135"></img> 
            <h2>Let's Connect!</h2>
            <div class="socials">
            <a href="https://www.linkedin.com/in/aurachamale">
            <img src="https://cdn-icons-png.flaticon.com/512/1409/1409945.png" alt="My Linkedin" width="30"></img>
            </a>
            <a href="https://github.com/aurachl">
            <img src="https://cdn-icons-png.flaticon.com/512/270/270798.png" alt="My GitHub" width="30"></img>
            </a>
            </div>
          </div>
        </div>
        <div class="group-2">
          <small>&copy; 2022 Aura C.🛸</small>
        </div>
      </footer>
    </>
  );
}

export default TodoList;
