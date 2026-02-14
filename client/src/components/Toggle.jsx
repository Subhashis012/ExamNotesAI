import React from 'react'
import { motion } from "motion/react";

function Toggle({label, checked, onChange}) {
  return (
    <div className='flex items-center gap-4 cursor-pointer select-none' onClick={onChange}>
        <motion.div
        animate={{
            backgroundColor: checked ? "#4ade80" : "#e5e7eb",
        }}
        transition={{duration: 0.25}}
        className='relative w-12 h-6 rounded-full border border-white/20 backdrop-blur-lg'
        >
            <motion.div
            transition={{type: "spring", stiffness: 500, damping: 300}}
             className='absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-[0,0,0,0.5]'
            style={{
                left: checked ? "1.6rem" : "0.25rem"
            }}>
                
            </motion.div>

        </motion.div>
        <span className={`text-sm transition-colors ${checked ? "text-green-300" : "text-gray-300"}`}>{label}</span>
    </div>
  )
}

export default Toggle
