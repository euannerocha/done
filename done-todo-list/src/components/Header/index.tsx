import { useRef } from "react";
import { gsap } from "gsap";
import logo from "../../assets/done_logo.svg";

function Header() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = wrapRef.current!;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2); 

    gsap.to(imgRef.current, {
      rotateY: dx * 10, rotateX: -dy * 10, y: -2, scale: 1.02,
      transformPerspective: 600, transformOrigin: "center",
      duration: .2, ease: "power2.out"
    });
  };

  const onLeave3D = () => gsap.to(imgRef.current, {
    rotateX: 0, rotateY: 0, y: 0, scale: 1, duration: .3, ease: "power2.inOut"
  });

  return (
    <div ref={wrapRef} onMouseMove={onMove} onMouseLeave={onLeave3D}
      className="bg-transparent w-screen h-16 absolute top-0 grid items-center">
      <img ref={imgRef} src={logo} alt="done." className="ml-10 w-[132px] h-[76px] transform-gpu will-change-transform cursor-pointer" />
    </div>
  );
}

export default Header;