
# Done To-Do List

A minimal, fast, and polished to-do app built with **React 18 + TypeScript + Vite**, styled with **Tailwind CSS v4.1** (via `@theme` + CSS variables), global state with **Zustand** (persisted to `localStorage`), **runtime data validation with Zod** and animations with **GSAP**.

---

**Design (Figma):**
[https://www.figma.com/design/0tAT6pzPEwLl13qqruXbYm/Untitled?node-id=0-1&t=ecq86COq2SZdiFt6-1](https://www.figma.com/design/0tAT6pzPEwLl13qqruXbYm/Untitled?node-id=0-1&t=ecq86COq2SZdiFt6-1)

---

## ⚙️ Getting Started

**Requirements**

* Node.js **≥ 18**

**Install**

```bash
npm i
```

**Development**

```bash
npm run dev
```

**Build**

```bash
npm run build
npm run preview
```

---

## 🧱 Tech Stack

* **React 18** + **TypeScript** + **Vite**
* **Tailwind CSS v4.1** with `@theme` & CSS variables (design tokens)
* **Zustand** (`persist` + `createJSONStorage`) for global state
* **Zod** for **runtime** validation & safe parsing of external data
* **GSAP** for animations

---

## ✨ Features

* **Initial bootstrap from API** (first load only)
  Endpoint: `https://everest-interview-public-files.s3.amazonaws.com/input.json`
  The response is **validated with Zod** and sanitized; only items matching the exact shape below are accepted. Invalid entries (wrong types, missing fields) or duplicate IDs are discarded:

  ```ts
  type Todo = { id: number; content: string; checked: boolean };
  type TodoList = Todo[];
  ```
* **Local persistence** only (Zustand + `localStorage`). The server is never mutated.
* **Add Task** via modal (Add button stays disabled until non-empty text).
* **Inline Edit** in each card: click ✎ or double-click the text → edit in place.
  Enter saves, Esc cancels, blur saves. Empty strings are rejected.
* **Toggle** completed and **Delete** per card.
* **Clear All** with confirmation, and it **stays empty after reload**
  (we persist an `initialized` flag to prevent re-seeding).
* **Tri-state Sort**: `none → A-Z → Z-A → none`, while **always keeping unchecked items first and checked items last**.
* **Search** (input near “To-do List”) filters in real time and still respects grouping + sorting.
* **UI/UX**

  * Cards container with **internal scrolling** (the page itself doesn’t scroll).
  * **Ring progress** shows completion %, **animates on value change** and **pulses on hover**.
  * **Side panel** (status) **slides in** from the left (GSAP).
  * **Subtle hover scale** on each card.
  * Buttons are **disabled** when the list is empty (and switch bg to `bg-light-gray`).

---

## 🎨 Design System & Theme

`src/index.css` defines the theme via Tailwind’s **`@theme`** (v4.1).

Use tokens directly in class names:

```jsx
<div className="bg-[--color-primary] text-[--color-white]">…</div>
```

---

## 🧰 Data Validation with Zod

I use **Zod** to validate incoming data at runtime, ensuring only valid items enter the app state. This complements TypeScript’s compile-time guarantees.

**Location:** `src/types/todo.ts` (schemas) and `src/lib/api.ts` (fetch + sanitize).

Why Zod?

* **Runtime safety** for external/unknown data.
* Clear error boundaries and discard strategy.
* Keeps the store clean and predictable.

---

## 🗂 Folder Structure (overview)

```
src/
  components/
    Button/
      AddButton/
      GenericButton/
      IconButton/
      Button.types.ts
    Card/
      CardContainer/
      CardItem/
      Card.types.ts
    Header/
    MainContainer
    Modal/
    Progress/
      index.tsx
      progress.types.ts
    SideContainer/
  lib/
    api.ts              // Fetch 
    sanitizeTodos.ts    // Sanitization with Zod
  pages/
    Home.tsx
  store/
    useTodos.ts         // Zustand store (todos, init, add, toggle, remove, clearAll, sortMode, edit)
  types/
    todo.ts             // Zod schemas + TS types
App.css
App.tsx
index.css
main.tsx

```

---

## 🔌 Data Rules & Bootstrapping

* On first run (or if `localStorage` is empty), the app fetches from:

  ```
  https://everest-interview-public-files.s3.amazonaws.com/input.json
  ```
* The response is validated with **Zod**. Only entries matching:

  ```ts
  { id: number; content: string; checked: boolean }
  ```

  are accepted. Invalid entries are discarded. Duplicate IDs are dropped (we keep the **first** valid occurrence).

* **Persistence**:

  * The app persist `{ todos, initialized }` in `localStorage` via Zustand.
  * After **Clear All**, the list remains empty on reload (because `initialized: true` prevents re-seeding).

---

## 🧠 Core Logic Decisions

* **Base order** of items is **insertion order** (the store never sorts).
  Rendering creates a **derived list**:

  1. Filter by **search query** (case-insensitive).
  2. Split into **unchecked** and **checked** groups (unchecked always first).
  3. Apply **tri-state sort** (A-Z / Z-A) **inside each group**.
* **Idempotent init**: an `initialized` flag ensures we don’t fetch again after bootstrapping or after `clearAll`.
* **Persist only what matters** (`todos`, `initialized`) to keep the state portable and predictable.
* **UI safety**:

  * Buttons disable with empty lists (and visually switch to `bg-light-gray`).
  * Modal “Add” enforces non-empty input (`trim()`).
  * Inline edit forbids empty save (Enter saves, Esc cancels, blur saves).

---

## 🎞 Animations

* **GSAP**

  * **Side panel** slides in from the left (`xPercent: -100 → 0`).
  * **Header logo** tilt 3D/parallax on hover.
  * **Cards** get a subtle scale on hover.
  * **Ring progress** animates when the percentage changes and “pulses” on hover.

---

## 🚧 Roadmap / Future Work

* **Mobile version** (full responsive layout & touch interactions).
* **Start / Onboarding page** (not implemented yet, but you can check at Figma).
* Accessibility refinements (custom focus rings, richer labels).
* E2E tests (Playwright), drag & drop, due dates, categories/tags, light/dark themes.
* Optional backend persistence & offline-first sync.
