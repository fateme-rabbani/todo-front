"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Status = "todo" | "doing" | "done";
interface Todo {
  id: number;
  name: string;
  i_status: Status;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoText, setTodoText] = useState<string>("");

  useEffect(() => {
    const fetchTodos = async () => {
      const result = await axios.get("http://localhost:1337/api/todos");
      setTodos(result.data.data);
    };
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (todoText.trim().length > 0) {
      const result = await axios.post("http://localhost:1337/api/todos", {
        data: {
          name: todoText,
          i_status: "todo",
        },
      });

      setTodos([...todos, result.data.data]);
      setTodoText(""); // Reset input after adding
    }
  };

  const deleteTodoItem = async (id: number) => {
    if (confirm("Do you really want to delete this item?")) {
      const a = await axios.delete(`http://localhost:1337/api/todos/${id}`);
      console.log(a);
      setTodos(todos.filter((_todo) => _todo.id !== id));
    }
  };

  const changeStatus = async (id: number, status: Status) => {
    const result = await axios.put(`http://localhost:1337/api/todos/${id}`, {
      i_status: status,
    });
    console.log(result);

    setTodos(
      todos.map((_todo) => (_todo.id === id ? result?.data?.data : _todo))
    );
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
        <input
          type="text"
          placeholder="Add new todo here..."
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>

      <ul>
        {["todo", "doing", "done"].map((status) => (
          <div key={status}>
            <h1>{status}</h1>
            {todos
              .filter((t) => t.i_status === status)
              .map((todo) => (
                <li key={todo.id}>
                  <span>{todo.name} </span>
                  <button onClick={() => changeStatus(todo.id, "todo")}>
                    todo
                  </button>
                  <button onClick={() => changeStatus(todo.id, "doing")}>
                    doing
                  </button>
                  <button onClick={() => changeStatus(todo.id, "done")}>
                    done
                  </button>
                  <button onClick={() => deleteTodoItem(todo.id)}>
                    Delete
                  </button>
                </li>
              ))}
          </div>
        ))}
      </ul>
    </div>
  );
}
