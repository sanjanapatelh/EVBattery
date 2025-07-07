import { motion } from "framer-motion";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

const ImgAnimateLeftToRight = ({ src, alt, className }: Props) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      initial={{
        opacity: 0,
        clipPath: "polygon(0 0, 20% 0, 20% 100%, 0% 100%)",
        scale: 1.2,
      }}
      whileInView={{
        opacity: 1,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        scale: 1,
      }}
      transition={{
        duration: 1.2,
        ease: "easeIn",
      }}
      viewport={{
        once: true,
      }}
      className={className ? className : ""}
    />
  );
};

export default ImgAnimateLeftToRight;
