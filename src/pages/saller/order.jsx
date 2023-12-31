import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown } from 'flowbite-react';
import { motion } from 'framer-motion'



function order() {

const [data,setData] = useState([])
const [status,setStatus] = useState('')
const [refresh,setRefresh] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`http://localhost:3000/store/payment/all-saller/${localStorage.getItem('idUser')}`)
        .then((res) => {
          if(res.status == 200){
            setData(res.data.data)
          }
          else{
            alert(res.data.message)
          }
        }) .catch((err) => {
          alert(err)
        })
      }
    fetchData()
  },[refresh])

  function CurrencyFormat({ number }) {
    const formattedNumber = new Intl.NumberFormat('id-ID').format(number);
    return formattedNumber;
  }

  console.log(data)
 
  const handleStatus = async (id) => {
    
    await axios.put(`http://localhost:3000/store/payment/update-status-saller/${id}`,{
      status : status
    }) .then((res) => {
      if(res.data.status == 200){
        alert('berhasil update data')
        setRefresh(refresh + 1)
      }
      else{
        alert(res.data.message)
      }
    }) .catch((err) => {
      alert(err)
    })

  }

  console.log(status)

  return (
    <div className='flex flex-col gap-3 mt-32'>
    {data.length == 0 ? (
      <div>
        <p>
          Tidak ada Order
        </p>
      </div>
    ): (
      data.map((item, index) => (
        <motion.div
        initial={{ opacity: 0 , x: -100 }}
        animate={{ opacity: 1 , x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 * index }}
        key={item.id}>
          <div >
            <div className='flex border p-3 gap-3 rounded-xl shadow-md flex-col sm:flex-row justify-center items-center sm:justify-start sm:items-start'>
               <img src={`http://localhost:3000/assets/product/${item.imgUrl}`}  alt=""  className=' w-48'/>
               <div className='flex flex-col items-center gap-2 sm:justify-start sm:items-start'>
                  <p className='font-medium'> 
                    {item.namaProduct}
                  </p>
                  <p>
                    Rp {CurrencyFormat({number: item.hargaProduct})}
                  </p>
                  <p>
                   Jumlah : {item.qty} unit
                  </p>
                  <p>
                    Metode Pembayaran : {item.payWith}
                  </p>
                  <p>
                    Status : {item.status}
                  </p>
                  <Dropdown label="Update Status" inline className='text-cyan-700'>
                    <Dropdown.Item onClick={() => {setStatus('Telah Dikirim'); handleStatus(item.id)}}>Telah Dikirim</Dropdown.Item>
                    <Dropdown.Item onClick={() => {setStatus('Sampai'); handleStatus(item.id)}}>Sampai</Dropdown.Item>
                  </Dropdown>
               </div>
            </div>
          </div>
        </motion.div>
      ))
    )}
   
  </div>
  )
}

export default order