import React, { useState,useEffect } from 'react'
import {  Label, TextInput, Textarea } from 'flowbite-react';
import axios from 'axios';

function Address() {

  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')
  const [province, setProvince] = useState('')
  const [postCode, setPostalCode] = useState('')
  const [detail, setDetail] = useState('')
  const [data, setData] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`http://localhost:3000/store/profile/address/${localStorage.getItem('idUser')}`)
        .then((res) => {
          setCity(res.data.data[0].city)
          setProvince(res.data.data[0].province)
          setDistrict(res.data.data[0].district)
          setPostalCode(res.data.data[0].postalCode)
          setDetail(res.data.data[0].detailAddress)
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
    fetchData()
  },[])


  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/store/profile/address/${localStorage.getItem('idUser')}`, {  
        district: district,
        city: city,
        province: province,
        postCode: postCode,
        detailAddress: detail
      }). then((res) => {
        if (res.data.status == 200) {
          alert('Address Berhasil diganti');
        } else {
          alert(res.data.message);
        }
      })
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  return (
    <div className='mt-10 sm:mx-10 flex w-full gap-10 flex-col sm:flex-row'>
        <form className="flex max-w-md flex-col gap-4 md:w-full">

   

        <div>
          <div className="mb-2 block">
            <Label htmlFor="Kecamatan" value="Your District" />
          </div>
          <TextInput id="username" type="text" value={district} required shadow onChange={(e) => setDistrict(e.target.value)} />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="kota" value="Your city" />
          </div>
          <TextInput id="kota" type="Text" value={city}  required shadow onChange={(e) => setCity(e.target.value)}/>
        </div>
        <div>

          <div className="mb-2 block">
            <Label htmlFor="Province" value=" Your Province" />
          </div>
          <TextInput id="Province" type="text" value={province} required shadow onChange={(e) => setProvince(e.target.value)}/>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="postal" value="Your Postal Code" />
          </div>
          <TextInput id="postal" type="number" value={postCode} required shadow onChange={(e) => setPostalCode(e.target.value)} />
        </div>

        <button onClick={handleSubmit} type="submit" className="bg-cyan-700 hover:bg-green-900 rounded-lg text-white px-auto py-2 hidden sm:block">
          Simpan
        </button>
    </form>
      
    <Textarea id="message" rows={4} placeholder='detail alamat/ patokan/ jalan' value={detail} required shadow onChange={(e) => setDetail(e.target.value)}></Textarea>

    <button onClick={handleSubmit} type="submit" className="bg-cyan-700 hover:bg-green-900 rounded-lg text-white px-auto py-2 sm:hidden">
        Simpan
    </button>

  </div>
  )
}

export default Address