import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import RingProgress from "../Progress";

function SideContainer() {
  const boxRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        boxRef.current,
        { xPercent: -100, autoAlpha: 0 },
        { xPercent: 0, autoAlpha: 1, duration: reduce ? 0 : 1, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-reveal]",
        { y: 12, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: "power2.out", stagger: 0.06, delay: 0.05 }
      );
    }, boxRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={boxRef}
      className="bg-primary flex-col justify-center rounded-tr-[24px] rounded-br-[24px] w-[32vw] absolute left-0 top-28 h-screen transform-gpu will-change-transform"
    >
      <h3 data-reveal className="flex mb-10 mt-28 w-[80%] ml-10 font-bebas text-5xl text-white">
        HERE IS THE STATUS OF YOUR TASKS!
      </h3>
      <div data-reveal className="ml-10">
        <RingProgress />
      </div>
    </div>
  );
}

export default SideContainer;




// import RingProgress from "../Progress";

// function SideContainer() {
//     return (
//         <div className="bg-primary flex-col justify-center rounded-tr-[24px] rounded-br-[24px] w-[32vw] absolute left-0 top-28 h-screen">
//             <h3 className="flex mb-10 mt-28 w-[80%] ml-10 font-bebas text-5xl text-white">HERE IS THE STATUS OF YOUR TASKS!</h3>
//             <RingProgress />
//         </div>
//     )
// }

// export default SideContainer;