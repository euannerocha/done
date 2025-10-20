import { useMemo } from "react";
import useTodos from "../../store/useTodos";

export default function RingProgress() {
  // Tamanho fixo
  const SIZE = 120; 
  const THICKNESS = 12; 

  const todos = useTodos((s) => s.todos);

  const { total, done, percent, radius, circumference, dashOffset } = useMemo(() => {
    const total = todos.length;
    const done = todos.filter((t) => t.checked).length;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);

    const radius = (SIZE - THICKNESS) / 2;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - percent / 100);

    return { total, done, percent, radius, circumference, dashOffset };
  }, [todos]);

  return (
    <div
      className="relative grid place-items-center ml-10"
      style={{ width: SIZE, height: SIZE }}
      aria-label={`Progress: ${percent}% (${done} de ${total})`}
    >
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.35)"   
          strokeWidth={THICKNESS}
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={radius}
          fill="none"
          stroke="var(--color-white)"     
          strokeWidth={THICKNESS}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`} 
          style={{ transition: "stroke-dashoffset 400ms ease" }}
        />
      </svg>
      
      <div className="absolute text-center select-none">
        <span className="block text-white text-xl font-bold">{percent}%</span>
      </div>
    </div>
  );
}
