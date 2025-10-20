import { useMemo, useRef, useEffect } from "react";
import { gsap } from "gsap";
import useTodos from "../../store/useTodos";

export default function RingProgress() {
  const SIZE = 120;
  const THICKNESS = 12;

  const boxRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<SVGCircleElement>(null);

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

  // ✅ anima SEM hover sempre que a % mudar
  useEffect(() => {
    if (!progressRef.current) return;
    gsap.killTweensOf(progressRef.current);
    gsap.to(progressRef.current, {
      strokeDashoffset: dashOffset,
      duration: 0.45,
      ease: "power2.out",
    });
  }, [dashOffset]);

  // Hover: usa o valor VISUAL atual como ponto de partida (não o fechado no closure)
  const onEnter = () => {
    gsap.killTweensOf([boxRef.current, progressRef.current]);

    gsap.to(boxRef.current, { scale: 1.06, duration: 0.25, ease: "power2.out" });

    const current = Number(gsap.getProperty(progressRef.current!, "strokeDashoffset"));
    const advance = Math.max(current - 0.12 * circumference, 0); // avança ~12%
    gsap.fromTo(
      progressRef.current,
      { strokeDashoffset: current },
      { strokeDashoffset: advance, yoyo: true, repeat: 1, duration: 0.45, ease: "power2.inOut" }
    );
  };

  const onLeave = () => {
    gsap.killTweensOf([boxRef.current, progressRef.current]);
    gsap.to(boxRef.current, { scale: 1, duration: 0.25, ease: "power2.inOut" });
    // volta pro valor correto (caso o usuário saia no meio do pulse)
    gsap.to(progressRef.current, { strokeDashoffset: dashOffset, duration: 0.25, ease: "power2.inOut" });
  };

  return (
    <div
      ref={boxRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative grid place-items-center ml-10 transform-gpu will-change-transform"
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
          ref={progressRef}
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={radius}
          fill="none"
          stroke="var(--color-white)"
          strokeWidth={THICKNESS}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset} // React ainda define o target
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        />
      </svg>

      <div className="absolute text-center select-none">
        <span className="block text-white text-xl font-bold">{percent}%</span>
      </div>
    </div>
  );
}




// import { useMemo } from "react";
// import useTodos from "../../store/useTodos";

// export default function RingProgress() {
//   // Tamanho fixo
//   const SIZE = 120; 
//   const THICKNESS = 12; 

//   const todos = useTodos((s) => s.todos);

//   const { total, done, percent, radius, circumference, dashOffset } = useMemo(() => {
//     const total = todos.length;
//     const done = todos.filter((t) => t.checked).length;
//     const percent = total === 0 ? 0 : Math.round((done / total) * 100);

//     const radius = (SIZE - THICKNESS) / 2;
//     const circumference = 2 * Math.PI * radius;
//     const dashOffset = circumference * (1 - percent / 100);

//     return { total, done, percent, radius, circumference, dashOffset };
//   }, [todos]);

//   return (
//     <div
//       className="relative grid place-items-center ml-10"
//       style={{ width: SIZE, height: SIZE }}
//       aria-label={`Progress: ${percent}% (${done} de ${total})`}
//     >
//       <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
//         <circle
//           cx={SIZE / 2}
//           cy={SIZE / 2}
//           r={radius}
//           fill="none"
//           stroke="rgba(255,255,255,0.35)"   
//           strokeWidth={THICKNESS}
//         />
//         <circle
//           cx={SIZE / 2}
//           cy={SIZE / 2}
//           r={radius}
//           fill="none"
//           stroke="var(--color-white)"     
//           strokeWidth={THICKNESS}
//           strokeLinecap="round"
//           strokeDasharray={circumference}
//           strokeDashoffset={dashOffset}
//           transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`} 
//           style={{ transition: "stroke-dashoffset 400ms ease" }}
//         />
//       </svg>
      
//       <div className="absolute text-center select-none">
//         <span className="block text-white text-xl font-bold">{percent}%</span>
//       </div>
//     </div>
//   );
// }
