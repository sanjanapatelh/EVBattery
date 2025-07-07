import React from "react";
import { motion } from "framer-motion";
type Props = {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  position?: number;
  id?: string;
};
const DivAnimateXAxis = ({
  children,
  className,
  duration,
  position,
  id,
}: Props) => {
  return (
    <motion.div
      className={className ? className : ""}
      id={id ? id : ""}
      initial={{
        x: `${position !== undefined ? position : 60}`,
        opacity: 0,
      }}
      whileInView={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        duration: `${duration ? duration : 1.2}`,
        ease: "easeIn",
      }}
      viewport={{
        once: true,
      }}
    >
      {children}
    </motion.div>
  );
};

export default DivAnimateXAxis;
