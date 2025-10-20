// src/components/MainContainer/index.tsx
import { useState } from "react";
import GenericButton from "../Button/GenericButton";
import IconButton from "../Button/IconButton";
import CardContainer from "../Card/CardContainer";
import AddButton from "../Button/AddButton";
import Modal from "../Modal";
import useTodos from "../../store/useTodos";

function MainContainer() {
  const [isOpen, setIsOpen] = useState(false);

  const add = useTodos((s) => s.add);
  const clearAll = useTodos((s) => s.clearAll);
  const cycleSort = useTodos((s) => s.cycleSortMode);
  const hasTodos = useTodos((s) => s.todos.length > 0);
  const sortMode = useTodos((s) => s.sortMode);

  const isActive = sortMode !== "none";
  const label = sortMode === "desc" ? "Z-A" : "A-Z";

  return (
    <div className="absolute top-28 w-[60vw] right-10">
      <div className="flex items-center justify-between mb-8">
        <h2>To-do List</h2>
        <div className="flex gap-3 box">
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

      <CardContainer />

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




// import GenericButton from "../Button/GenericButton";
// import IconButton from "../Button/IconButton";
// import CardContainer from "../Card/CardContainer";

// function MainContainer() {
//     return (
//         <div className="absolute top-28 w-[60vw] flex-row right-10">
//             <div className="flex justify-between mb-16">
//                 <h2>To-do List</h2>
//                 <div className="flex gap-2">
//                     <GenericButton text={"Clean All"} bgColor={"bg-light-red-1"} textColor={"text-dark-red"} onClick={() => { }} />
//                     <IconButton text={"A-Z"} bgColor={"bg-light-primary-2"} textColor={"text-primary"} onClick={() => { }} />
//                 </div>
//             </div>
//             <CardContainer />
//         </div>
//     )
// }

// export default MainContainer;