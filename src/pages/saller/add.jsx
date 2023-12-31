import React from 'react'

import { Button, Checkbox, Label, TextInput, FileInput , Textarea, Dropdown} from 'flowbite-react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';


function add() {

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [nama, setNama] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [deskripsiSingkat, setDeskripsiSingkat] = useState('');
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [kategori, setKategori] = useState('');
  const [rekomendasi, setRekomendasi] = useState(null);
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!isChecked); 
    if (!isChecked) {
      setRekomendasi(1);
    } else {
      setRekomendasi(0);
    } 
  };



  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/store/product/add', {
        idSaller : localStorage.getItem('idUser'),
        nama: nama,
        deskripsi: deskripsi,
        deskripsiSingkat: deskripsiSingkat,
        img: img,
        harga: price,
        stok: stock,
        kategori: kategori,
        rekomendasi: rekomendasi
      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      ) .then((res) => {
       
        if (res.data.status == 200) {
          alert('Berhsil menambahkan product');
          navigate('/saller/dashboard');
        } else {
          alert(res.data.message);
        }
      })
    } catch (error) {
      
    }


  };
  

  return (
    <div className='mt-32 flex flex-col gap-10 w-full justify-center items-center'>
      <div className='text-lg font-bold'>
        Tambahkan Product
      </div>
      <div className='flex w-full justify-center items-center'>
        <form className="flex max-w-md flex-col gap-4 w-full mx-5 md:mx-0">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="nama" value="Nama Product" />
              </div>
              <TextInput id="nama" type="text" placeholder="Input Nama Product" required shadow 
              onChange={(e) => setNama(e.target.value)} />
            </div>

            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="deskripsi" value="Deskripsi Product" />
              </div>
              <Textarea id="deskripsi" placeholder="Input Deskripsi Product" required rows={4}
              onChange={(e) => setDeskripsi(e.target.value)}
              />
            </div>

            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="deskripsi2" value="Highlight Deskripsi " />
              </div>
              <TextInput id="deskripsi2" placeholder="Input Deskripsi singkat" required shadow
              onChange={(e) => setDeskripsiSingkat(e.target.value)}
              maxLength={150}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="price" value="Harga" />
              </div>
              <TextInput id="alamat" type="number" placeholder="Input Harga" required shadow
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="stock" value="Stock" />
              </div>
              <TextInput id="stock" type="number" placeholder="Input Stock" required shadow
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            
            <div className='flex gap-2 w-full'>
              <Dropdown label="Kategori" >
                <Dropdown.Item onClick={() => setKategori('Laptop')}>Laptop</Dropdown.Item>
                <Dropdown.Item onClick={() => setKategori('Komputer')}>Komputer</Dropdown.Item>
                <Dropdown.Item onClick={() => setKategori('Handphone')}>Handphone</Dropdown.Item>
                <Dropdown.Item onClick={() => setKategori('Tablet')}>Tablet</Dropdown.Item>
                <Dropdown.Item onClick={() => setKategori('Aksesoris')}>Aksesoris</Dropdown.Item>
              </Dropdown>
              <TextInput value={kategori} readOnly className='w-full' />
            </div>


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
                    <span className="font-semibold">foto product</span> 
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

            <div className="flex items-center gap-2">
              <Checkbox id="agree"
                checked={isChecked}
                onChange={handleCheckboxChange}/>
              <Label htmlFor="agree" className="flex">
                Rekomendasikan
              </Label>
            </div>

            <Button onClick={handleSubmit}>Tambahkan </Button>
        </form>
      </div>
    </div>
  )
}

export default add