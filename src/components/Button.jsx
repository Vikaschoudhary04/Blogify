import React from "react";
import { motion } from "motion/react"
export default function Button({
  children,

  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {

  


  return (
    <motion.button
    whileHover={{scale: 1, backgroundColor: "#ff6b6b", color: "#ffffff",y:10,  transition: {
          type: "spring",
          stiffness: 400,
          damping: 20,
        },}}
    whileTap={{ scale: 0.95, y:-10,  }}
      className={`w-full flex items-center justify-center gap-2 bg-white text-gray-700 font-medium py-2 px-4 rounded-lg shadow hover:bg-gray-100 transition hover:cursor-pointer
    ${bgColor}${textColor}${className}
    `}
      {...props}
    >
      {children}
    </motion.button>
  );
}
