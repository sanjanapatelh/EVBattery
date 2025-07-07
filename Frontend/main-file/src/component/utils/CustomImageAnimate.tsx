import { motion } from "framer-motion";
type Props = {
  className?: string;
  alt: string;
  src: string;
};

const CustomImageAnimate = ({ className, alt, src }: Props) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={className ? className : ""}
      initial={{
        scale: 1.2,
      }}
      whileInView={{
        scale: 1,
      }}
      transition={{
        duration: 1.2,
        ease: "easeIn",
      }}
      viewport={{ once: true }}
    />
  );
};

export default CustomImageAnimate;
