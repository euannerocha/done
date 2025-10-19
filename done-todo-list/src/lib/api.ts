import type { TodoList } from "../types/todo";
import { sanitizeTodos } from "./sanitizeTodos";


export const INPUT_URL =
  "https://everest-interview-public-files.s3.amazonaws.com/input.json";

export async function fetchInitialTodos(): Promise<TodoList> {
  const res = await fetch(INPUT_URL);
  if (!res.ok) throw new Error("Falha ao carregar a lista inicial");
  const raw = await res.json();
  return sanitizeTodos(raw, /* verbose */ false);
}