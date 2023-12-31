import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import cat from '../assets/cat.jpeg'
import { motion } from 'framer-motion'

function about() {
  return (
    <div className='mt-32'>
      <div className='flex justify-center items-center flex-col'>
        <motion.div
          initial={{ opacity: 0 , scale: 0.5 }}
          animate={{ opacity: 1 , scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src={cat} alt="" className='w-96 h-96' />
        </motion.div>
        <motion.div
        initial={{ opacity: 0 , y:200 }}
        animate={{ opacity: 1 , y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='text-2xl font-bold'>
           Deni Setiya
        </motion.div>
        <motion.div
          initial={{ opacity: 0 , x:200 }}
          animate={{ opacity: 1 , x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Sistem Informasi IIIB
        </motion.div>
      </div>
    </div>
  )
}

export default about