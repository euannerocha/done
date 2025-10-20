import { useMemo } from "react";
import useTodos from "../../../store/useTodos";
import CardItem from "../CardItem";

function CardContainer() {
  const todos = useTodos((s) => s.todos);
  const sortMode = useTodos((s) => s.sortMode);
  const toggle = useTodos((s) => s.toggle);
  const remove = useTodos((s) => s.remove);

  const collator = useMemo(
    () => new Intl.Collator(undefined, { sensitivity: "base", numeric: true }),
    []
  );

  const list = useMemo(() => {
    const unchecked: typeof todos = [];
    const checked: typeof todos = [];
    for (const t of todos) (t.checked ? checked : unchecked).push(t);

    if (sortMode !== "none") {
      const cmp = (a: typeof todos[number], b: typeof todos[number]) =>
        collator.compare(a.content, b.content);
      unchecked.sort(cmp);
      checked.sort(cmp);
      if (sortMode === "desc") {
        unchecked.reverse();
        checked.reverse();
      }
    }

    return [...unchecked, ...checked];
  }, [todos, sortMode, collator]);

  if (!Array.isArray(todos)) return null;

  return (
    <div className="flex flex-col space-y-4 max-h-[65vh] overflow-y-auto pr-2 scrollbar-primary mb-[90px] pb-2">
      {list.length === 0 && <div className="text-light-gray">{"No tasks here :( Let's create one?"}</div>}

      {list.map((t) => (
        <CardItem
          key={t.id}
          id={t.id}
          description={t.content}
          checked={t.checked}
          onToggle={() => toggle(t.id)}
          onDelete={() => remove(t.id)}
        />
      ))}
    </div>
  );
}

export default CardContainer;