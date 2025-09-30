// npm i framer-motion
"use client";
import { motion } from "framer-motion";
import css from "./loading.module.css";

const style = {
  width: 20,
  height: 20,
  opacity: 1,
  margin: 8,
  borderRadius: 6,
  display: "inline-block",
  background: "#c81c60",
};

const variants = {
  start: {
    scale: 0.2,
    rotate: 0,
  },
  end: {
    scale: 1,
    rotate: 480,
  },
};

export default function Loader() {
  return (
    <div className={css.loaderContainer}>
      <motion.div
        style={style}
        variants={variants}
        initial={"start"}
        animate={"end"}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          ease: "anticipate",
          duration: 1,
          delay: 0,
        }}
      />
      <motion.div
        style={style}
        variants={variants}
        initial={"start"}
        animate={"end"}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          ease: "anticipate",
          duration: 1,
          delay: 0.2,
        }}
      />
      <motion.div
        style={style}
        variants={variants}
        initial={"start"}
        animate={"end"}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          ease: "anticipate",
          duration: 1,
          delay: 0.4,
        }}
      />
    </div>
  );
}
