import { useEffect, useRef, useState } from "react";

const useCountUp = (target) => {
  const safeTarget = Number.isInteger(target) && target >= 0 ? target : 0;
  const [value, setValue] = useState(safeTarget > 0 ? 1 : 0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let intervalId;
    let frameId;

    const showFinalValue = () => {
      window.clearInterval(intervalId);
      frameId = window.requestAnimationFrame(() => {
        setValue(safeTarget);
        hasAnimated.current = true;
      });
    };

    if (reducedMotion.matches || hasAnimated.current || safeTarget <= 1) {
      showFinalValue();
    } else {
      let currentValue = 1;
      const stepDuration = Math.max(
        24,
        Math.min(60, Math.round(1000 / safeTarget)),
      );

      intervalId = window.setInterval(() => {
        currentValue += 1;
        setValue(currentValue);

        if (currentValue >= safeTarget) {
          window.clearInterval(intervalId);
          hasAnimated.current = true;
        }
      }, stepDuration);
    }

    reducedMotion.addEventListener("change", showFinalValue);
    return () => {
      window.clearInterval(intervalId);
      window.cancelAnimationFrame(frameId);
      reducedMotion.removeEventListener("change", showFinalValue);
    };
  }, [safeTarget]);

  return value;
};

export default useCountUp;
