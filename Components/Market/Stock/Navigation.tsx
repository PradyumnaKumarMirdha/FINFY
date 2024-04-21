"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "../../../lib/utils";

const Navigation = () => {
  const links = [
    {
      path: "/Market/Stock",
      name: "Stock",
    },
    {
      path: "/Market/Saved",
      name: "Saved",
    },
  ];

  const pathname = usePathname();
  const MotionLink = motion(Link);

  const mapRange = (
    inputLower: number,
    inputUpper: number,
    outputLower: number,
    outputUpper: number
  ) => {
    const INPUT_RANGE = inputUpper - inputLower;
    const OUTPUT_RANGE = outputUpper - outputLower;

    return (value: number) =>
      outputLower + (((value - inputLower) / INPUT_RANGE) * OUTPUT_RANGE || 0);
  };

  const setTransform = (
    item: HTMLElement & EventTarget,
    event: React.PointerEvent,
    x: MotionValue,
    y: MotionValue
  ) => {
    const bounds = item.getBoundingClientRect();
    const relativeX = event.clientX - bounds.left;
    const relativeY = event.clientY - bounds.top;
    const xRange = mapRange(0, bounds.width, -1, 1)(relativeX);
    const yRange = mapRange(0, bounds.height, -1, 1)(relativeY);
    x.set(xRange * 10);
    y.set(yRange * 10);
  };
  return (
    <nav
      className="w-[40%] mt-16 mb-10 flex p-1 justify-around align-middle"
      style={{ marginBottom: "100px" }}
    >
      <ul className="flex gap-5 w-full">
        <AnimatePresence>
          {links.map((link) => {
            const x = useMotionValue(0);
            const y = useMotionValue(0);
            const textX = useTransform(x, (latest) => latest * 0.5);
            const textY = useTransform(y, (latest) => latest * 0.5);
            return (
              <motion.li
                onPointerMove={(event) => {
                  const item = event.currentTarget;
                  setTransform(item, event, x, y);
                }}
                key={link.path}
                onPointerLeave={(event) => {
                  x.set(0);
                  y.set(0);
                }}
                style={{ x, y, flexGrow: 1 }} // Add flexGrow: 1
              >
                <MotionLink
                  className={cn(
                    "w-full font-normal relative rounded-md text-sm text-center py-2 px-4 transition-all duration-500 ease-out dark:text-[white] text-black ",
                    pathname === link.path ? "bg-slate-100" : ""
                  )}
                  href={link.path}
                  style={{
                    display: "block",
                    width: "100%",
                    fontWeight: "500",
                    fontSize: "1rem",
                    paddingTop: ".5rem",
                    paddingBottom: ".5rem",
                    paddingLeft: "5rem",
                    paddingRight: "5rem",
                    backgroundColor: "transparent",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#8018f7a9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <motion.span
                    style={{ x: textX, y: textY }}
                    className="z-10 relative font-semibold "
                  >
                    {link.name}
                  </motion.span>
                  {pathname === link.path  && (
                    <motion.div
                    transition={{ type: "spring" }}
                    layoutId="underline"
                    className="absolute w-full h-full rounded-md left-0 bottom-0 bg-[#8018f7a9] capitalize font-semibold"
                    onClick={(e) => {
                      e.currentTarget.style.backgroundColor = "#8018f7a9";
                    }}
                    
                  ></motion.div>
                  ) }
                </MotionLink>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </nav>
  );
};

export default Navigation;
