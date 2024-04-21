// @ modal is parrallel routing 
// (..)stock is intercepitng routing
// [id] is dynamic routing
"use client";
import { useCallback, useRef, useEffect, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      style={{ position: "fixed", zIndex: "22"}}
      className="fixed top-0 w-full h-full bottom-0 mx-auto bg-gray-200 bg-opacity-30 z-22 flex items-center  backdrop-blur-sm justify-center"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="w-full h-full bg-gray-200 bg-opacity-30 first-letter: backdrop-blur-sm flex items-center justify-center z-22 lg:flex-row flex-col  lg:h-full  p-4 relative"
      >
        {children}
      </div>
    </div>
  );
}