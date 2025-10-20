import { z } from "zod";

export const RemoteTodosPayloadSchema = z.object({
  todos: z.array(z.unknown()),
});
export type RemoteTodosPayload = z.infer<typeof RemoteTodosPayloadSchema>;

export const TodoSchema = z.object({
  id: z.number().int(),
  content: z.string(),
  checked: z.boolean(),
});
export type Todo = z.infer<typeof TodoSchema>;
export type TodoList = Todo[];
