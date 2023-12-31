import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import {MapPinLine, Note, FilePlus, Basket,CurrencyCircleDollar, Pen} from '@phosphor-icons/react'
import ListBrandProduct from '../../components/listBrandProduct'
import {motion} from 'framer-motion'


function dasboardSeller() {

  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/store/brand/' + localStorage.getItem('idUser'));
        setData(res.data.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  },[])

  
  

  return (
    <div className='mt-32'>
      <div className='flex justify-center gap-10 flex-col md:flex-row mx-5'>
        <motion.div
          initial={{ opacity: 0 , y: -100 }}
          animate={{ opacity: 1 , y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        className='flex flex-col md:flex-row md:h-56 border rounded-2xl pr-10 shadow-lg relative '>
            <img src={"http://localhost:3000/assets/saller/" + data.imgUrl}  alt="" className='rounded-2xl max-w-[600px] ' />
            <div className='flex gap-1 flex-col justify-center ml-4 my-5 md:ml-10'>
              <div className='text-2xl font-bold'>
                {data.name_brand}
              </div>
              <div className='flex gap-2 text-gray-700 flex-wrap'>
                <Note size={24} />
                {data.deskripsi_toko}
              </div>
              <div className='font-bold flex gap-2 text-gray-700'>
                <MapPinLine size={24} />
                {data.alamat}
              </div>
              <div className='flex gap-2 text-gray-500 absolute bottom-4 right-8'>
                <Pen size={24} />
                <Link to='/saller/edit-profile' className='text-sm '>
                  Edit 
                </Link>
              </div>
            </div>
        </motion.div>

        <motion.div
        initial={{ opacity: 0 , x: 100 }}
        animate={{ opacity: 1 , x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }
      }
        className='flex md:h-56 md:justify-center text-start flex-col gap-2 mx-1 md:mx-0 '>
          <Link to='/saller/add' className=' px-4 py-2 rounded-md flex gap-2 items-center hover:bg-slate-200 transition-all duration-300 cursor-pointer '>
           <FilePlus size={32} />
            Tambah Product
          </Link>
          <Link to='/saller/order' className=' px-4 py-2 rounded-md flex gap-2 items-center hover:bg-slate-200 transition-all duration-300 cursor-pointer border-y'>
            <Basket size={32} />
            List Orders
          </Link>
          <div className=' px-4 py-2 rounded-md flex gap-2 items-center hover:bg-slate-200 transition-all duration-300 cursor-pointer '>
           <CurrencyCircleDollar size={32} />
            Payments
          </div>
          <div>

          </div>
        </motion.div>

      </div>

      <motion.div
      initial={{ opacity: 0 , y: 100 }}
      animate={{ opacity: 1 , y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className='text-center font-bold border-y py-4 mt-10 shadow-md'>
        List Product
      </motion.div>

      <div className='flex justify-center mt-20 '>
        <ListBrandProduct />
      </div>

    </div>
  )
}

export default dasboardSeller