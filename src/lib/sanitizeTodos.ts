import { RemoteTodosPayloadSchema, TodoSchema, type TodoList } from "../types/todo";

export function sanitizeTodos(payload: unknown, verbose = false): TodoList {
  const root = RemoteTodosPayloadSchema.safeParse(payload);
  if (!root.success) {
    if (verbose) console.warn("Payload inválido na raiz:", root.error);
    return [];
  }

  const out: TodoList = [];
  const seen = new Set<number>();

  for (const raw of root.data.todos) {
    const parsed = TodoSchema.safeParse(raw);
    if (!parsed.success) {
      if (verbose) console.warn("Descartado (schema inválido):", raw);
      continue;
    }
    const item = parsed.data;
    if (seen.has(item.id)) {
      if (verbose) console.warn("Descartado (id duplicado):", item);
      continue;
    }
    seen.add(item.id);
    out.push(item);
  }
  return out;
}
