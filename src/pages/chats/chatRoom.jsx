import React from 'react'
import { useState,useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { Avatar,TextInput, Textarea } from 'flowbite-react'
import { PaperPlaneRight } from '@phosphor-icons/react'

function chatRoom() {

  const { id } = useParams()
  const {idProduct} = useParams()
  const navigate = useNavigate();

  const [namaProduct,setNamaProduct] = useState('')
  const [imgProduct,setImgProduct] = useState('')
  const [harga,setHarga] = useState('')
  const [imgBrand,setImgBrand] = useState('')
  const [namaBrand,setNamaBrand] = useState('')
  const [pesan,setPesan] = useState('')


  useEffect(() => {
    const fetchData = async () => {
      try {
       await axios.get(`http://localhost:3000/store/product/get/${idProduct}`)
        .then((res) => {
          const datas = res.data.data[0]
          setNamaProduct(datas.nama)
          setImgProduct(datas.imgUrl)
          setHarga(datas.harga)

        })
        await axios.get(`http://localhost:3000/store/brand/${id}`)   
        .then((res) => {
          const datas = res.data.data
          setImgBrand(datas[0].imgUrl)
          setNamaBrand(datas[0].name_brand)
        })
      } catch (error) {
        console.log("Error fetching data:", error)
      }
    }
    fetchData()
  },[])

  const handleKlik = () => {
    setPesan(`saya ingin tanya product ${namaProduct}`)
  }
  
  const handleSend = () => {
    const fetchData = async () => {
      try {
        await axios.post(`http://localhost:3000/store/chat/room/`, {
          pengirim: localStorage.getItem('idUser'),
          namaPengirim : localStorage.getItem('nama'),
          imgPengirim : localStorage.getItem('imgUrl'),
          penerima: id,
          namaPenerima : namaBrand,
          imgPenerima : imgBrand,
          message: pesan
        }).then((res) => {
          if(res.data.status == 200){
            navigate(`/chat-room/${id}`)
          } else {
            alert(res.data.message)
          }
        })

      } catch (error) {
        alert(error)
        console.error("Error fetching data:", error);
      }
      }
    fetchData()

  }

  

  return (
    <div className='mt-20'>
      <div>
        <div className='flex justify-between mx-10 border px-3 py-2 rounded-lg shadow-md'>
          <div>
            <Avatar img={`http://localhost:3000/assets/saller/${imgBrand}`}  rounded>
            </Avatar>
          </div>
            <div className="font-medium flex items-center justify-center ">
              <div>{namaBrand}</div>
            </div>
        </div>
        <div className='flex relative justify-between mx-10 border px-3 py-2 rounded-lg shadow-md mt-2 flex-col gap-2 '>
          <div className='h-full flex items-center flex-col sm:flex-row'>
            <img src={`http://localhost:3000/assets/product/${imgProduct}`} alt="" width={200}/>
            <div className='flex flex-col gap-1 items-center sm:items-start'>
              <div className='font-medium'>
                {namaProduct}
              </div>
              <div className='font-medium text-gray-500'>
                Rp {harga}
              </div>
              <div>
                <button onClick={handleKlik} className='text-cyan-700'>
                  Tanyakan
                </button>
              </div>
            </div>
          </div>  
          <div className='w-full flex items-center gap-3 fixed bottom-4 left-8 sm:left-auto'>
            <Textarea type="text" className='w-[74%] sm:[79%] md:w-[83%] xl:w-[59%] resize-y overflow-y-hidden h-auto' placeholder="Tulis Pesan ..." rows={2} value={pesan} onChange={(e) => setPesan(e.target.value)}/>
            <PaperPlaneRight size={32} className='cursor-pointer' onClick={handleSend}/>
         </div>
        </div>
        </div>
    </div>
  )
}

export default chatRoom