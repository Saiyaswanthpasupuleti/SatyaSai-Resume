/**
 * Smooth Cursor — MagicUI spec implementation
 * https://magicui.design/docs/components/smooth-cursor
 */
import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
} from 'framer-motion';

interface SpringConfig {
  damping: number;
  stiffness: number;
  mass: number;
  restDelta: number;
}

const defaultSpringConfig: SpringConfig = {
  damping: 45,
  stiffness: 400,
  mass: 1,
  restDelta: 0.001,
};

function DefaultCursorSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Arrow / pointer shape */}
      <path
        d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
        fill="#3b82f6"
        stroke="white"
        strokeWidth="1"
      />
    </svg>
  );
}

interface SmoothCursorProps {
  cursor?: React.ReactNode;
  springConfig?: SpringConfig;
}

export function SmoothCursor({
  cursor = <DefaultCursorSVG />,
  springConfig = defaultSpringConfig,
}: SmoothCursorProps) {
  const cursorX = useMotionValue(-300);
  const cursorY = useMotionValue(-300);

  const springX = useSpring(cursorX, springConfig as SpringOptions);
  const springY = useSpring(cursorY, springConfig as SpringOptions);

  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState(0);

  const prevPos = useRef({ x: -300, y: -300 });
  const rafRef  = useRef<number>(0);
  const targetRot = useRef(0);
  const currentRot = useRef(0);

  useEffect(() => {
    // Skip on touch/non-fine-pointer devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const onMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      const dx = x - prevPos.current.x;
      const dy = y - prevPos.current.y;

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        targetRot.current = Math.atan2(dy, dx) * (180 / Math.PI) + 45;
      }

      cursorX.set(x);
      cursorY.set(y);
      prevPos.current = { x, y };
      setIsVisible(true);
    };

    const onLeave  = () => setIsVisible(false);
    const onEnter  = () => setIsVisible(true);

    // Smooth rotation via RAF lerp
    const tick = () => {
      currentRot.current += (targetRot.current - currentRot.current) * 0.15;
      setRotation(currentRot.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    document.addEventListener('mousemove',  onMove,  { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top:     springY,
        left:    springX,
        rotate:  rotation,
        pointerEvents: 'none',
        zIndex: 9999,
        userSelect: 'none',
      }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
    >
      {cursor}
    </motion.div>
  );
}
