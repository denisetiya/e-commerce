import React from 'react'

import { Button, Checkbox, Label, TextInput, FileInput , Textarea} from 'flowbite-react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

function register() {

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [namaToko, setNamaToko] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [alamat, setAlamat] = useState('');

  const [img2, setImg2] = useState(null);
  const [imgUrl2, setImgUrl2] = useState('');


  const handleRegister = async (e) => {

    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/store/saller/register', {
        idSaller: localStorage.getItem('idUser'),
        nama_brand: namaToko,
        deskripsi_toko: deskripsi,
        alamat: alamat,
        img: img2
      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
  
  
      if (res.data.status == 200) {
        alert('Terima kasih, Silahkan tunggu konfirmasi dari admin');
        navigate('/');
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert('Masukan data dengan benar');
    }
  };
  

  return (
    <div className='mt-14 flex flex-col gap-10 w-full justify-center items-center'>
      <div className='text-lg font-bold'>
        Daftar sebagai Seller
      </div>
      <div className='flex w-full justify-center items-center'>
        <form className="flex max-w-md flex-col gap-4 w-full">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="namaBrand" value="Nama Toko" />
              </div>
              <TextInput id="namaBrand" type="text" placeholder="Input Nama Toko" required shadow 
              onChange={(e) => setNamaToko(e.target.value)} />
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="deskripsi" value="Deskripsi Toko" />
              </div>
              <Textarea id="deskripsi" placeholder="Input Deskripsi" required rows={4}
              onChange={(e) => setDeskripsi(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="alamat" value="Alamat Toko" />
              </div>
              <TextInput id="alamat" type="text" placeholder="Input Alamat toko" required shadow
                onChange={(e) => setAlamat(e.target.value)}
              />
            </div>

            <div className="flex w-full items-center justify-center ">
              <Label
                htmlFor="img2"
                className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5" >
                  <img src={imgUrl2} alt="" width={100} />
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
                    <span className="font-semibold">klik untuk upload foto toko</span> 
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG(MAX. 800x400px)</p>
                </div>
                <FileInput
                   required
                  id="img2"
                  className="hidden"
                  onChange={(e) => {
                    setImg2(e.target.files[0]);
                    setImgUrl2(URL.createObjectURL(e.target.files[0]));
                  }}
                />
              </Label>
            </div>
   
            <div className="flex items-center gap-2">
              <Checkbox id="agree" />
              <Label htmlFor="agree" className="flex">
                I agree with the&nbsp;
                <Link to="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                  terms and conditions
                </Link>
              </Label>
            </div>
            <Button onClick={handleRegister}>Daftar </Button>
        </form>
      </div>
    </div>
  )
}

export default register



