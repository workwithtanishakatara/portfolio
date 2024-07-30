"use client"

import { motion } from 'framer-motion'
import React, { useState } from 'react'

const AnimatedText = ({text}) => {

    const [hover, setHover] = useState(false)

  return (
    <motion.div transition={{ease: "easeInOut", duration: 0.25}} animate={{
        opacity: hover ? 0.5 : 1
    }} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} className='relative overflow-hidden'>
        <motion.div transition={{ease: "easeInOut", duration: 0.25}} className='absolute' animate={{
            top: hover ? -25 : 0
        }}>{text}</motion.div>
         <motion.div className='invisible select-none'>{text}</motion.div>
        <motion.div transition={{ease: "easeInOut", duration: 0.25}} animate={{
            top: hover ? 0 : 25
        }} className='absolute'>{text}</motion.div>
    </motion.div>
  )
}

export default AnimatedText