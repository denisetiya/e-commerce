import React from 'react'
import { useState,useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { Avatar,TextInput, Textarea } from 'flowbite-react'
import { PaperPlaneRight } from '@phosphor-icons/react'

function chat() {

  const { id } = useParams()
  const navigate = useNavigate();

  const [pengirim, setPengirim] = useState('')
  const [penerima, setPenerima] = useState('')
  const [message, setMessage] = useState([])
  const sender = localStorage.getItem('idUser')
  const [data, setData] = useState([]);

  const [imgBrand,setImgBrand] = useState('')
  const [namaBrand,setNamaBrand] = useState('')
  const [pesan,setPesan] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {

        await axios.get(`http://localhost:3000/store/brand/${id}`)   
        .then((res) => {
          setData(res.data.data)
        })
      } catch (error) {
        console.log("Error fetching data:", error)
      }
    }
    fetchData()
  },[])

  console.log(data)
  const handleKlik = () => {
    setPesan(`saya ingin tanya product ${namaProduct}`)

  }
  const handleSend = () => {
    const fetchData = async () => {
      try {
        await axios.post(`http://localhost:3000/store/chat/room/`, {
          pengirim: localStorage.getItem('idUser'),
          penerima: id,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`http://localhost:3000/store/chat/room/${id}/${sender}`)
          .then((res) => {
            const datas = res.data.data
            setMessage(datas)
          })
      } catch (error) {
        console.log("Error fetching data:", error)
      }
    }
    fetchData()
  },[])

  console.log(message)


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
            {message.map((msg) => (
              <div key={msg.id}>
                {msg.pengirim == sender ? (
                  <div className='flex justify-end'>
                    <div className='p-3 rounded-lg border'>
                      <div>
                        <div className='text-end'>
                          {msg.namaPengirim}
                        </div>
                        {msg.message}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='flex justify-start'>
                    <div className='bg-slate-300 p-3 rounded-lg'>
                      <div>
                        <div>
                          {msg.namaPenerima}
                        </div>
                        {msg.message}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
              <div className='w-full flex items-center gap-3 fixed bottom-4 left-8 sm:left-auto'>
                <Textarea type="text" className='w-[74%] sm:[79%] md:w-[83%] xl:w-[59%] resize-y overflow-y-hidden h-auto' placeholder="Tulis Pesan ..." rows={2} value={pesan} onChange={(e) => setPesan(e.target.value)}/>
                <PaperPlaneRight size={32} className='cursor-pointer' onClick={handleSend}/>
              </div>
          </div>
      </div>
    </div>
  )
}

export default chat