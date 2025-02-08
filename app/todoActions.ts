"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

type Status = "todo" | "doing" | "done";

export async function fetchTodos() {
  const response = await axios.get("http://localhost:1337/api/todos");
  return response.data.data;
}

export async function addTodo(name: string) {
  await axios.post("http://localhost:1337/api/todos", {
    data: { name, i_status: "todo" },
  });
  revalidatePath("/");
}

export async function deleteTodo(id: string) {
  await axios.delete(`http://localhost:1337/api/todos/${id}`);
  revalidatePath("/");
}

export async function changeStatus(id: string, status: Status) {
  const response = await axios.put(`http://localhost:1337/api/todos/${id}`, {
    data: { i_status: status },
  });
  revalidatePath("/");
}

export async function handleQuestions(answers: Record<number, number>) {
  await axios.post("http://localhost:1337/api", {
    data: answers,
  });
}
