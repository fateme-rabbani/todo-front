import { fetchTodos } from "./todoActions";
import TodoList from "./TodoList";

export default async function Home() {
  const todos = await fetchTodos();

  return (
    <div>
      <h1>Todo App</h1>
      <TodoList todos={todos} />
    </div>
  );
}
