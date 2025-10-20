import { useMemo } from "react";
import useTodos from "../../../store/useTodos";
import CardItem from "../CardItem";

type Props = { query?: string };

export default function CardContainer({ query = "" }: Props) {
  const todos    = useTodos((s) => s.todos);
  const sortMode = useTodos((s) => s.sortMode);
  const toggle   = useTodos((s) => s.toggle);
  const remove   = useTodos((s) => s.remove);
  const edit     = useTodos((s) => s.edit);

  const collator = useMemo(
    () => new Intl.Collator(undefined, { sensitivity: "base", numeric: true }),
    []
  );

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const source = q
      ? todos.filter((t) => t.content.toLowerCase().includes(q))
      : todos;

    const unchecked: typeof source = [];
    const checked: typeof source = [];
    for (const t of source) (t.checked ? checked : unchecked).push(t);

    if (sortMode !== "none") {
      const cmp = (a: typeof source[number], b: typeof source[number]) =>
        collator.compare(a.content, b.content);
      unchecked.sort(cmp);
      checked.sort(cmp);
      if (sortMode === "desc") {
        unchecked.reverse();
        checked.reverse();
      }
    }

    return [...unchecked, ...checked];
  }, [todos, sortMode, collator, query]);

  return (
    <div className="min-h-0 overflow-y-auto pr-3 scrollbar-primary">
      <div className="flex flex-col space-y-4 max-h-[65vh] overflow-y-auto overflow-x-hidden pr-2 scrollbar-primary mb-[90px] pb-2">
        {list.length === 0 && (
          <div className="text-light-gray">No results</div>
        )}

        {list.map((t) => (
          <CardItem
            key={t.id}
            id={t.id}
            description={t.content}
            checked={t.checked}
            onToggle={() => toggle(t.id)}
            onDelete={() => remove(t.id)}
            onEdit={(newText) => edit(t.id, newText)}
          />
        ))}
      </div>
    </div>
  );
}