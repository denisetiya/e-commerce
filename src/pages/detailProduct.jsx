import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Avatar } from 'flowbite-react'
import { ChatCircleDots,ShoppingCart,Stack,MapPinLine} from '@phosphor-icons/react'
import { motion } from 'framer-motion'

function detailProduct() {
  
  const navigate = useNavigate();
  const [data,setData] = useState([]);
  const {id} = useParams();
  const [nama,setNama] = useState('');
  const [deskripsi,setDeskripsi] = useState('');
  const [harga,setHarga] = useState('');
  const [stok,setStok] = useState('');
  const [imgUrl,setImgUrl] = useState('');
  const [idSaller,setIdSaller] = useState('');
  const [namaBrand,setNamaBrand] = useState('');
  const [alamat,setAlamat] = useState('');
  const [imgBrand,setImgBrand] = useState('');
  

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`http://localhost:3000/store/product/get/${id}`)
        .then((res) => {
          const datas = res.data.data
          setNama(datas[0].nama)
          setDeskripsi(datas[0].deskripsi)
          setHarga(datas[0].harga)
          setStok(datas[0].stok)
          setImgUrl(datas[0].imgUrl)
          setIdSaller(datas[0].idSaller)
        }) .catch((err) => {
          console.log(err);
        })

        await axios.get(`http://localhost:3000/store/brand/${idSaller}`)
        .then((res) => {
          const datas = res.data.data
          setNamaBrand(datas[0].name_brand)
          setAlamat(datas[0].alamat)
          setImgBrand(datas[0].imgUrl)
        }) .catch((err) => {
          console.log(err);
        })
    }
    fetchData();
  },[idSaller])

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
    <div className='mt-32'>
      <div>
        <div className='flex gap-3 justify-center items-center flex-col'>
          <motion.div
            initial={{ opacity: 0 , y:-200 }}
            animate={{ opacity: 1 , y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            
          >
            <Link to ={`http://localhost:3000/assets/product/${imgUrl}`}>
             <img src={`http://localhost:3000/assets/product/${imgUrl}`} width={400} alt="" />
            </Link>
          </motion.div>
      
          <motion.div
          initial={{ opacity: 0 , x:-200 }}
          animate={{ opacity: 1 , x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}

          className='text-2xl font-bold'>
            {nama}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 , y:70 }}
            animate={{ opacity: 1 , y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          className='text-xl font-bold text-gray-500'>
            Rp {CurrencyFormat({ number: harga })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 , y:70 }}
            animate={{ opacity: 1 , y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          className='font-bold flex gap-1 items-center'>
            <Stack size={32} />
            Stock : {stok} 
          </motion.div>

          <motion.div
          initial={{ opacity: 0 , x:70 }}
          animate={{ opacity: 1 , x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}

          className='mt-6 flex gap-3'>
            <Avatar className='border-r-2  pr-4'  img={`http://localhost:3000/assets/saller/${imgBrand}`} size={"lg"} rounded>
              <div className="space-y-1 font-medium dark:text-white">
                <div>{namaBrand}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <MapPinLine size={25} />
                  {alamat}
                </div>
              </div>
            </Avatar>

              {localStorage.getItem('idUser') !== null ? (
                <div className='flex justify-center flex-col gap-1'>
      
                  <Link to={`/chatRoom/${idSaller}/${id}`} className='flex gap-1 items-center'>
                    <ChatCircleDots size={32} /> 
                    Chat
                  </Link>
                  <button className='flex gap-1' onClick={() => handleClick(id,nama,imgUrl,harga,idSaller)}>
                    <ShoppingCart size={32} />
                    Add to cart
                  </button>
                </div>
              ):(
                <div className='flex justify-center flex-col gap-1'>
                  <button onClick={() => alert('Anda harus login terlebih dahulu') }  className='flex gap-1 items-center'>
                    <ChatCircleDots size={32} /> 
                    Chat
                  </button>
                  <button onClick={() => alert('Anda harus login terlebih dahulu')} className='flex gap-1'>
                    <ShoppingCart size={32} />
                    Add to cart
                  </button>
              </div>
              )}
          </motion.div>

        
          <motion.div
          initial={{ opacity: 0 , y:-100 }}
          animate={{ opacity: 1 , y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          
          className='text-center mt-10 mx-10'>
            <div className='font-bold text-xl mb-4'>
              About Product
            </div>
            {deskripsi}
          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default detailProduct