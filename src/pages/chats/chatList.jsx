import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Avatar } from 'flowbite-react'


function chatList() {
  const id = localStorage.getItem('idUser')
  const [data, setData] = useState([])



  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`http://localhost:3000/store/chat/list/${id}`)
        .then((res) => {
          setData(res.data.data)
        })
      } catch (error) {
        console.log("Error fetching data:", error)
      }
    }
    fetchData()
  },[])

  
 

  return (
    <div className='mt-32 mx-3 sm:mx-20'>
      {data.map((item) => (
        <div key={item.id} className='flex border p-3 rounded-xl shadow-sm'>
          <Link to={`/chat-room/${item.penerima}`}>
            <div className='flex gap-3'>
              <div className='flex '>
                <Avatar img={`http://localhost:3000/assets/saller/${item.imgPenerima}`} rounded={true} />
              </div>
              <div>
                {localStorage.getItem('id') == item.idPengirim ? (
                  <div>
                    <h1>{item.namaPengirim}</h1> 
                  </div> 
                ) : (
                  
                  <h1>{item.namaPenerima}</h1>
                )
                }
                <hr />
                <div className='flex flex-wrap'>
                  {item.message}
                </div>
              </div>
            </div>
          </Link>
          
        </div>
      ))}
    </div>
  )
}

export default chatList