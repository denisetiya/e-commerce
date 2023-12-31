import React from 'react'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

function signUp() {

  const navigate = useNavigate();
  const [nama, setNama] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault()
    if(password !== confPass) {
      alert('password tidak sama')
    }
    else {
      const response = await axios.post('http://localhost:3000/store/daftar', {
        nama,
        username,
        email,
        password
      })
      if(response.data.status == 200) {
        alert('kamu berhasil daftar, kamu dapat login sekarang')
        navigate('/')
      } else {
        alert('gagal daftar, silahkan coba lagi')
      }
    }
  }

  return (
    <div className='flex justify-center items-center mt-32 w-full'>
    <form className="flex max-w-md flex-col gap-4 md:w-full">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your Name" />
            </div>
            <TextInput id="name" type="Text"  required shadow onChange={(e) => setNama(e.target.value)}/>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Your Username" />
            </div>
            <TextInput id="username" type="text" required shadow onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Your email" />
            </div>
            <TextInput id="email2" type="email" placeholder="name@flowbite.com" required shadow onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password2" value="Your password" />
            </div>
            <TextInput id="password2" type="password" required shadow onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="repeat-password" value="Repeat password" />
            </div>
            <TextInput id="repeat-password" type="password" required shadow onChange={(e) => setConfPass(e.target.value)}/>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="agree" />
            <Label htmlFor="agree" className="flex">
              I agree with the&nbsp;
              <Link href="#" className="text-green-700 ">
                terms and conditions
              </Link>
            </Label>
          </div>
          <Button onClick={handleSubmit} type="submit">Register new account</Button>
      </form>
    </div>
  )
}

export default signUp




