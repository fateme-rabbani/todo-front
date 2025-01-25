"use client";

import { useState } from "react";
import { addTodo, deleteTodo, changeStatus } from "./todoActions";

type Status = "todo" | "doing" | "done";

interface Todo {
  id: number;
  name: string;
  i_status: Status;
  documentId: string;
}

interface Props {
  todos: Todo[];
}

export default function TodoList({ todos }: Props) {
  const [todoText, setTodoText] = useState<string>("");

  const handleAddTodo = async () => {
    await addTodo(todoText);
    setTodoText("");
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id);
  };

  const handleChangeStatus = async (id: string, status: Status) => {
    await changeStatus(id, status);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTodo();
        }}
      >
        <input
          type="text"
          placeholder="Add new todo here..."
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <button type="submit">add</button>
      </form>

      <ul>
        {["todo", "doing", "done"].map((status) => (
          <div key={status}>
            <h2>{status}</h2>
            {todos
              .filter((todo) => todo.i_status === status)
              .map((todo) => (
                <li key={todo.id}>
                  <span>{todo.name}</span>
                  <div>
                    {["todo", "doing", "done"].map((targetStatus) => (
                      <button
                        key={targetStatus}
                        onClick={() =>
                          handleChangeStatus(
                            todo.documentId,
                            targetStatus as Status
                          )
                        }
                      >
                        {targetStatus}
                      </button>
                    ))}
                    <button onClick={() => handleDeleteTodo(todo.documentId)}>
                      remove
                    </button>
                  </div>
                </li>
              ))}
          </div>
        ))}
      </ul>
    </div>
  );
}
