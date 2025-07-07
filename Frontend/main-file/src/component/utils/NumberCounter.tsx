import React, { useEffect, useRef, useState } from "react";

interface NumberCounterProps {
  number: number;
  durationToComplete: number; // in seconds
  icon?: string;
  initialNumber?: number; // optional initial number
}

const NumberCounter: React.FC<NumberCounterProps> = ({
  number,
  durationToComplete,
  icon,
  initialNumber = 0, // default initial number is 0
}) => {
  const [count, setCount] = useState(initialNumber);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const start = Date.now();
          const end = start + durationToComplete * 1000;
          const increment =
            (((number - initialNumber) / durationToComplete) * 1000) / 60;

          const updateCount = () => {
            const now = Date.now();
            if (now < end) {
              const elapsedTime = now - start;
              let newCount =
                Math.floor(elapsedTime / increment) + initialNumber;
              if (newCount > number) {
                // Check if new count exceeds the final number
                newCount = number;
              }
              setCount(newCount);
              requestAnimationFrame(updateCount);
            } else {
              setCount(number);
            }
          };

          requestAnimationFrame(updateCount);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [number, durationToComplete, initialNumber]);

  return (
    <h3 ref={ref}>
      {count}
      {icon}
    </h3>
  );
};

export default NumberCounter;
