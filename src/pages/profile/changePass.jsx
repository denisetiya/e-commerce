import React , { useState,useEffect } from 'react'
import {  Label, TextInput,  Textarea } from 'flowbite-react';
import axios from 'axios';



function ChangePass() {


  const [email, setEmail] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async(e) => {
    if(newPassword != confirmPassword){
      alert('Confirm password tidak sama')
      return
    } else if ( email == '' || oldPassword == '' || newPassword == '') {
      alert('harap isi semua form')
      return
    }
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/store/profile/password/${localStorage.getItem('idUser')}`, {
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword,
      }) .then((res) => {
        if (res.data.status == 200) {
          alert('Password Berhasil diganti');
        } else {
          alert(res.data.message);
        }
      })
    } catch (error) {
      console.error('An error occurred:', error);
      alert(error);
    }
  }

  return (
    <div className='mt-10 sm:mx-10 flex w-full gap-10 flex-col sm:flex-row'>
     <form className="flex max-w-md flex-col gap-4 md:w-full">

        <div>
          <div className="mb-2 block">
            <Label htmlFor="lastPass" value="Current Password" />
          </div>
          <TextInput id="lastPass" type="Text"  required shadow onChange={(e) => setOldPassword(e.target.value)}/>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput id="email" type="email" required shadow onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="newPass" value=" New Password" />
          </div>
          <TextInput id="newPass" type="text"  required shadow onChange={(e) => setNewPassword(e.target.value)}/>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="confirmPass" value="Confirm Password" />
          </div>
          <TextInput id="confirmPass" type="text" required shadow onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>

        <button onClick={handleSubmit} type="submit" className="bg-cyan-700 hover:bg-green-900 rounded-lg text-white px-auto py-2 hidden sm:block">
          Simpan
        </button>
    </form>
  

    <button onClick={handleSubmit} type="submit" className="bg-cyan-700 hover:bg-green-900 rounded-lg text-white px-auto py-2 sm:hidden">
        Simpan
    </button>

    </div>
  )
}

export default ChangePass