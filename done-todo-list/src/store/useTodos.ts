// src/store/useTodos.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Todo, TodoList } from "../types/todo";
import { fetchInitialTodos } from "../lib/api";

type SortMode = "none" | "asc" | "desc"

type State = {
  todos: TodoList;
  loading: boolean;
  initialized: boolean;
  sortMode: SortMode;
};

type Actions = {
  init: () => Promise<void>;
  add: (content: string) => void;
  toggle: (id: number) => void;
  remove: (id: number) => void;
  clearAll: () => void;
  cycleSortMode: () => void;
};

const useTodos = create<State & Actions>()(
  persist(
    (set, get) => ({
      todos: [],
      loading: false,
      initialized: false,
      sortMode: "none",

      init: async () => {
        if (get().initialized) return;              
        if (get().todos.length > 0) {               
          set({ initialized: true });               
          return;
        }

        set({ loading: true });
        try {
          const data = await fetchInitialTodos();
          set({ todos: data, initialized: true });
        } catch (e) {
          console.warn("Failing to seed the endpoint:", e);
        } finally {
          set({ loading: false });
        }
      },

      add: (content) => {
        const txt = content.trim();
        if (!txt) return;
        const nextId = (get().todos.reduce((m, t) => Math.max(m, t.id), 0) || 0) + 1;
        const newTodo: Todo = { id: nextId, content: txt, checked: false };
        set((s) => ({ todos: [newTodo, ...s.todos] }));
      },

      toggle: (id) =>
        set((s) => ({
          todos: s.todos.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t)),
        })),

      remove: (id) =>
        set((s) => ({ todos: s.todos.filter((t) => t.id !== id) })),

      clearAll: () => set({ todos: [] }),

       cycleSortMode: () => {
        const next =
          get().sortMode === "none" ? "asc" :
          get().sortMode === "asc"  ? "desc" : "none";
        set({ sortMode: next });
      },
    }),
    {
      name: "done-todos",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ todos: s.todos, initialized: s.initialized }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.warn("Rehydrate falhou, limpando storage:", error);
          try { localStorage.removeItem("done-todos"); } catch { }
        }
      },
    }
  )
);

export default useTodos;





// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import type { Todo, TodoList } from "../types/todo";
// import { fetchInitialTodos } from "../lib/api";

// type State = { todos: TodoList; loading: boolean };
// type Actions = {
//   init: () => Promise<void>;
//   add: (content: string) => void;
//   toggle: (id: number) => void;
//   remove: (id: number) => void;
// };

// const useTodos = create<State & Actions>()(
//   persist(
//     (set, get) => ({
//       todos: [],
//       loading: false,

//       init: async () => {
//         if (get().todos.length > 0) return;

//         set({ loading: true });
//         try {
//           const data = await fetchInitialTodos();
//           set({ todos: data });
//         } finally {
//           set({ loading: false });
//         }
//       },

//       add: (content) => {
//         const txt = content.trim();
//         if (!txt) return;
//         const nextId = (get().todos.reduce((m, t) => Math.max(m, t.id), 0) || 0) + 1;
//         const newTodo: Todo = { id: nextId, content: txt, checked: false };
//         set((s) => ({ todos: [newTodo, ...s.todos] }));
//       },

//       toggle: (id) =>
//         set((s) => ({
//           todos: s.todos.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t)),
//         })),

//       remove: (id) => set((s) => ({ todos: s.todos.filter((t) => t.id !== id) })),
//     }),
//     {
//       name: "done-todos",
//       storage: createJSONStorage(() => localStorage),
//       partialize: (s) => ({ todos: s.todos }),
//     }
//   )
// );

// export default useTodos;
