import React from 'react'
import { Button, Checkbox, Label, TextInput, FileInput , Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react'
import axios from 'axios';

function  EditProfile() {


  const [img, setImg] = useState(null)
  const [imgUrl, setImgUrl] = useState('')
  const [nama, setNama] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [noHp, setNoHp] = useState('')
  const [update, setUpdate] = useState(1)
  

  

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`http://localhost:3000/store/profile/${localStorage.getItem('idUser')}`)
        .then((res) => {
          setImgUrl(res.data.data[0].imgUrl)
          setNama(res.data.data[0].nama)
          setUsername(res.data.data[0].username)
          setEmail(res.data.data[0].email)
          setNoHp(res.data.data[0].noHp)
        }) .catch((err) => {
          console.log(err);
        })
    }
    fetchData()
  },[update])


 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nama == '' || username == '' || email == '' || noHp == '') {
      alert('harap isi semua form')
      return
    }

    if (img == null || img == ''){
      try {  
        const response = await axios.put(`http://localhost:3000/store/profile/updateNoImg/${localStorage.getItem('idUser')}`,
        {
          nama: nama,
          username: username,
          email: email,
          noHp: noHp
        });
    
  
        if (response.data.status === 200) {
          alert(response.data.message);
          setUpdate(update + 1);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      } 
    } else{
      try {  
        const response = await axios.put(`http://localhost:3000/store/profile/update/${localStorage.getItem('idUser')}`,
        {
          nama: nama,
          username: username,
          email: email,
          noHp: noHp,
          img: img
        }, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
    
  
        if (response.data.status === 200) {
          alert(response.data.message);
          setUpdate(update + 1);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      } 
    }
  };
  
  return (
    <div className='mt-10 sm:mx-10 flex w-full gap-10 flex-col sm:flex-row'>
          <form className="flex max-w-md flex-col gap-4 md:w-full">

          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your Name" />
            </div>
            <TextInput id="name" type="Text" value={nama}  required shadow onChange={(e) => setNama(e.target.value)}/>
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Your Username" />
            </div>
            <TextInput id="username" value={username} type="text" required shadow onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Your email" />
            </div>
            <TextInput id="email2" type="email" value={email} placeholder="name@flowbite.com" required shadow onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="notelp" value="Your Phone Number" />
            </div>
            <TextInput id="notelp" type="number" value={noHp} required shadow onChange={(e) => setNoHp(e.target.value)} />
          </div>
 
          <button onClick={handleSubmit} type="submit" className="bg-cyan-700 hover:bg-green-900 rounded-lg text-white px-auto py-2 hidden sm:block">
            Simpan
          </button>
      </form>
        
      <div className="flex w-full items-center justify-center ">
        <Label
          htmlFor="dropzone-file"
          className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5" >

              <img src={imgUrl} alt="" width={100} />
            <svg
              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round" 
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">klik untuk upload foto profile</span> 
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG(MAX. 800x400px)</p>
          </div>
          <FileInput
              required
            id="dropzone-file"
            className="hidden"
            onChange={(e) => {
              setImg(e.target.files[0]);
              setImgUrl(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </Label>
      </div>

      <button onClick={handleSubmit} type="submit" className="bg-cyan-700 hover:bg-green-900 rounded-lg text-white px-auto py-2 sm:hidden">
          Simpan
      </button>

    </div>
  )
}

export default EditProfile