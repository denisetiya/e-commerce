import React from 'react'
import axios from 'axios'
import { Button } from 'flowbite-react';
import { useState,useEffect } from 'react'
import {Trash} from '@phosphor-icons/react'
import {useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'

function cart() {

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [unit, setUnit] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`http://localhost:3000/store/cart/all/${localStorage.getItem('idUser')}`)
        .then((res) => {
          setData(res.data.data);
        }) .catch((err) => {
          console.log(err);
        })

    }
    fetchData();
  },[unit])



  function CurrencyFormat({ number }) {
    const formattedNumber = new Intl.NumberFormat('id-ID').format(number);
    return formattedNumber;
  }

  const handlePlus = async (id, qty, idk,price) => {

      await axios.put(`http://localhost:3000/store/cart/qty/${id}/`,{
        qty : qty,
        price : price
      })
      .then((res) => {
        setUnit(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
    
      if(qty =='min' && idk == 1 || idk == null || idk == 0){
        await axios.delete(`http://localhost:3000/store/cart/delete/${id}`)
        .then((res) => {
          setUnit(res.data.data)
        })
        .catch((err) => {
          console.log(err)
        })

      }

  }



  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/store/cart/delete/${id}`)
    .then((res) => {
      setUnit(res.data.data)
    })
    .catch((err) => {
      console.log(err)

    })
  }

  const handleCheckout = async (id) => {
    navigate('/cart-pay/' + id);
  }

  return (
    <div className='mt-20'>
        <div className='flex flex-col'>

        <h1 className='text-center font-bold text-2xl mt-16 mb-10 '>Product Cart</h1>
            <div className='flex flex-wrap justify-center items-center'>
              {data.length === 0 ? (
                <div className='text-center text-2xl font-bold'>
                  Your shopping cart is empty
                </div>
              ): (
                data.map((data,index) => (
               
                    <motion.div
                    initial={{ opacity: 0 , scale: 0.5 }}
                    animate={{ opacity: 1 , scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 * index }}
                    layout
                    key={data.id} className='border flex gap-3 items-center mx-2 rounded-xl shadow-lg max-w-xl pb-8 pr-10 mt-4 justify-center'>
                        <img src={`http://localhost:3000/assets/product/` + data.imgUrl} width={140} alt="" />
                        <div className='flex w-full justify-between relative items-center mt-5'>
                          <div>
                              <h1 className='font-bold'>{data.namaProduct}</h1>
                              <h1>Rp {CurrencyFormat({ number: data.hargaProduct })}</h1>
                              <h1 className='flex gap-2 items-center'>Jumlah : 
                                <button onClick={() => handlePlus(data.id,'min',data.qty,data.fixedPrice)}  className='border rounded-full w-5 h-5  flex justify-center items-center bg-cyan-700 text-white font-extrabold'>-</button> 
                                  {data.qty} Unit 
                                <button onClick={() => handlePlus(data.id,'plus',data.qty,data.fixedPrice)}  className='border rounded-full w-5 h-5 flex justify-center items-center bg-cyan-700 text-white font-extrabold'>+</button></h1>
                                <div className='flex gap-3 justify-center items-center pt-5'>
                                  <Button onClick={() => handleCheckout(data.id)}>
                                    CheckOut
                                  </Button>
                                  <Trash onClick={() => handleDelete(data.id)} className='text-red-800 cursor-pointer' size={32} />
                                </div>
                          </div >
                        </div>
                    </motion.div>
                ))
                                
              )}
            </div>
        </div>
    </div>
  )
}

export default cart