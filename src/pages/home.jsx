import React from 'react'
import Carousel from '../components/carousel'
import Rekomendasi from '../components/rekomendasi'
import ListProduct from '../components/listProduct'
import {motion} from 'framer-motion'
 

function Home() {

 
  return (
    <div >
      <motion.div
        initial={{ opacity: 0 , y: -100 }}
        animate={{ opacity: 1 , y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Carousel />
      </motion.div>
      <motion.div
      >
        <Rekomendasi />
      </motion.div>
      <motion.div>
        <ListProduct />
      </motion.div>
    </div>
  )
}

export default Home