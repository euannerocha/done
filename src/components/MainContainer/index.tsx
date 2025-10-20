import { useState } from "react";
import GenericButton from "../Button/GenericButton";
import IconButton from "../Button/IconButton";
import CardContainer from "../Card/CardContainer";
import AddButton from "../Button/AddButton";
import Modal from "../Modal";
import useTodos from "../../store/useTodos";

function MainContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");    

  const add = useTodos((s) => s.add);
  const clearAll = useTodos((s) => s.clearAll);
  const cycleSort = useTodos((s) => s.cycleSortMode);
  const hasTodos = useTodos((s) => s.todos.length > 0);
  const sortMode = useTodos((s) => s.sortMode);
  const uncheckedCount = useTodos((s) =>
    s.todos.reduce((acc, t) => acc + (t.checked ? 0 : 1), 0)
  );

  const isActive = sortMode !== "none";
  const label = sortMode === "desc" ? "Z-A" : "A-Z";

  return (
    <div className="absolute top-28 w-[60vw] right-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <h2>To-do List</h2>
          <div className="bg-light-primary-2 rounded-full px-2 flex items-center">
            <p className="text-primary font-thin text-[0.75rem]">{uncheckedCount}</p>
          </div>

          <div className="ml-2 flex items-center bg-light-primary-2 rounded-full px-3 py-1.5 w-[300px]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tasks..."
              className="bg-transparent outline-none w-full text-primary placeholder-light-primary-1"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="ml-1 text-primary/70 hover:text-primary"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <GenericButton
            text="Clear All"
            bgColor="bg-light-orange-1"
            textColor="text-dark-red"
            onClick={() => { if (confirm("Clear all tasks?")) clearAll(); }}
            disabled={!hasTodos}
          />
          <IconButton
            text={label}
            bgColor={isActive ? "bg-light-primary-1" : "bg-light-primary-2"}
            textColor={isActive ? "text-white" : "text-primary"}
            onClick={cycleSort}
            disabled={!hasTodos}
          />
        </div>
      </div>

      <CardContainer query={query} />

      <div className="hidden md:block">
        <AddButton desktop="desktop" onClick={() => setIsOpen(true)} />
      </div>
      <div className="md:hidden mt-4">
        <AddButton onClick={() => setIsOpen(true)} desktop={"desktop"} />
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAdd={(content) => add(content)}
        bgColor="bg-primary"
      />
    </div>
  );
}

export default MainContainer;