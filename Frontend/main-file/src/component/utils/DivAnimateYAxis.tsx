import React from "react";
import { motion } from "framer-motion";
type Props = {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  position?: number;
  visible?: boolean;
};
const DivAnimateYAxis = ({
  children,
  className,
  duration,
  position,
  visible,
}: Props) => {
  return (
    <motion.div
      className={className ? className : ""}
      initial={{
        y: position !== undefined ? position : 60,
        opacity: visible ? 1 : 0,
      }}
      whileInView={{
        y: 0,
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

export default DivAnimateYAxis;
