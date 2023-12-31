import React from 'react'
import { Button, Card } from 'flowbite-react';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { Stack } from '@phosphor-icons/react';
import {motion} from 'framer-motion'


function listProduct() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`http://localhost:3000/store/product/all`)
        .then((res) => {
          setData(res.data.data);
        }) .catch((err) => {
          console.log(err);
        })
    }
    fetchData();
  },[])



  function CurrencyFormat({ number }) {
    const formattedNumber = new Intl.NumberFormat('id-ID').format(number);
    return formattedNumber;
  }

  const handleClick = async(id,namaProduct,imgUrl,harga,idSaller) => {
    await axios.post(`http://localhost:3000/store/cart/add`,{
      namaProduct : namaProduct,
      hargaProduct : harga, 
      imgUrl: imgUrl, 
      idSaller : idSaller, 
      idUser: localStorage.getItem('idUser'), 
      idProduct: id

    }).then((res) => {
      alert(res.data.message)
    }).catch((err) => {
      console.log(err)
    })
  }
  
  return (
    <div className='mt-10 flex justify-center items-center flex-col gap-10'>
      <div className='text-center text-2xl font-bold'>
        List Product
      </div>
      <div className='flex gap-3 mx-1 2xl:ml-[65px] flex-wrap mt-5 justify-center lg:justify-start align-middle'>
      {data.map((data,index) => (
        
        <motion.div
        key={data.id}
          initial={{ opacity: 0 , scale: 0.5 }}
          animate={{ opacity: 1 , scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 * index }}
        >
      `    <Card 
            className="max-w-[180px] relative h-80"
          >
            <img src={`http://localhost:3000/assets/product/` + data.imgUrl}  alt="" className='w-full h-28 object-cover object-center'/>
            <div  className='mb-24'>
              <Link to ={`/detail-product/${data.id}`} className="text-sm font-semibold tracking-tight text-cyan-700 dark:text-white">
              {data.nama}
              </Link>
            </div>
      

            <div className="flex flex-col gap-2 absolute bottom-3 w-full left-3">
              <span className="font-bold text-gray-900 dark:text-white text-sm">
                <div className='flex gap-1 items-center text-sm text-gray-500'>
                  <Stack size={15} />Stok : {data.stok}
                </div>
                Rp {CurrencyFormat({ number: data.harga })}
              </span>
              <Button
                  onClick={() => handleClick(data.id,data.nama,data.imgUrl,data.harga,data.idSaller)}
                className="w-[87%]"
              >
                Add to Cart
              </Button>
            </div>
          </Card>`
        </motion.div>
         ))}
    </div>
    </div>
  );
}

export default listProduct