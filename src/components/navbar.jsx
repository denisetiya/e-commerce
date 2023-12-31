
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import {House, SquaresFour, ShoppingCart,DeviceMobile,Laptop,Desktop,DeviceTablet,GameController } from "@phosphor-icons/react";
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import axios from 'axios';
import {motion} from "framer-motion"
import avatar from '../assets/avatar.webp';
export default function NavbarCom() {

  const [openModal, setOpenModal] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  function onCloseModal() {
    setOpenModal(false);
    setEmail('');
  }

  const navigate = useNavigate();

  const handleLogin = async() => {
    const response = await axios.post('http://localhost:3000/store/login', {
      email,
      password,
    }) 
    if(response.data.status == 200) {
      localStorage.setItem('login', 'berhasil');
      setOpenModal(false);
      setData(response.data.profile[0]);
      localStorage.setItem('idUser', response.data.profile[0].id);
      localStorage.setItem('nama', response.data.profile[0].nama);
      localStorage.setItem('email', response.data.profile[0].email);
      localStorage.setItem('role', response.data.profile[0].role);
      localStorage.setItem('imgUrl', response.data.profile[0].imgUrl);
      navigate('/');
    } else {
      alert('password atau email salah');
    }
  }



  const handleLogout = () => {
    localStorage.removeItem('login');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('imgUrl');
    localStorage.removeItem('id');
    localStorage.removeItem('nama');
    localStorage.removeItem('idUser');
    navigate('/');
  }



  return (
    <Navbar fluid rounded className='bg-[#F9F7F7]'>
      <div className='w-full flex justify-between xl:mx-44 2xl:mx-72 rounded-lg border  px-5 py-2 shadow-md -mt-2 flex-wrap '>
        <Navbar.Brand >
          <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="" />
          <span className="self-center whitespace-nowrap text-xl font-semibold ">Tech Store</span>
        </Navbar.Brand>
        <div className="flex md:order-2">

          {localStorage.getItem('login') !==  'berhasil' ? (
            <div>

              <Button onClick={() => setOpenModal(true)} >Login</Button>

               <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                >
                  <Modal.Header />
                  <Modal.Body>
                    <div className="space-y-6">
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="email" value="Your email" />
                        </div>
                        <TextInput
                          id="email"
                          placeholder="name@gmail.com"
                          type='email'
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="password" value="Your password" />
                        </div>
                        <TextInput 
                          id="password"
                          type="password" 
                          placeholder='adawlkdj'
                          required 
                          onChange={(e) => setPassword(e.target.value)} />
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <Checkbox id="remember" />
                          <Label htmlFor="remember">Remember me</Label>
                        </div>
                        <a href="#" className="text-sm text-cyan-700">
                          Lost Password?
                        </a>
                      </div>
                      <div className="w-full">
                        <Button onClick={handleLogin} >Log in to your account</Button>
                      </div>
                      <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered?&nbsp;
                        <Link to="/signup" onClick={(e) => setOpenModal(false)} className="text-cyan-700">
                          Create account
                        </Link>
                      </div>
                    </div>
                  </Modal.Body>
                </motion.div>
              </Modal>
            </div>
          ):(

          <Dropdown
            arrowIcon={false} 
            inline
            label={
              <Avatar alt="User settings" img={data.imgUrl == null ? 
                (avatar) :
                ('http://localhost:3000/assets/user/' + localStorage.getItem('imgUrl'))
              } rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{localStorage.getItem('nama')}</span>
              <span className="block truncate text-sm font-medium">{localStorage.getItem('email')}</span>
            </Dropdown.Header>
            
            <Link to={"/profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>

            <Link to={"/chat-list"}>
              <Dropdown.Item>Chats</Dropdown.Item>
            </Link>

            {localStorage.getItem('role') == 'admin' || localStorage.getItem('role') == 'saller' ? (
              <Link to ="/dashboard">
                <Dropdown.Item>Dashboard</Dropdown.Item>
              </Link> 
            ):(
              null
            )}

            <Link to="/about">
              <Dropdown.Item>About</Dropdown.Item>
            </Link>

            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout} className='cursor-pointer text-red-700 font-bold'>Sign out</Dropdown.Item>
          </Dropdown>
          )}

          <Navbar.Toggle className='ml-2'/>
        
        </div>

        <Navbar.Collapse>


          <Link to ="/" className='flex gap-1 items-center'>
             <div className='flex gap-1 items-center w-full transition-all duration-500 hover:bg-slate-200 rounded-md px-3 py-1'>
                <House size={32} />
                <p>
                  Home
                </p>
              </div>
          </Link>

            <div className='flex gap-1 items-center'>
              <div className='flex gap-1 items-center w-full transition-all duration-500 hover:bg-slate-200 rounded-md px-3 py-1'>
                  <SquaresFour size={32} />
                  <Dropdown label="Kategori" arrow inline>
                    <Dropdown.Item>
                       <Link to={"/category/Komputer"} className='flex gap-1 items-center'>
                        <Desktop size={32} />
                        Komputer
                       </Link>
                      </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to={"/category/Laptop"} className='flex gap-1 items-center'>
                        <Laptop size={32} />
                        Laptop
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to={"/category/Handphone"} className='flex gap-1 items-center'>
                       <DeviceMobile size={32} />
                        Handphone
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to={"/category/Tablet"} className='flex gap-1 items-center'>
                        <DeviceTablet size={32} />
                        Tablet
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to={"/category/Aksesoris"} className='flex gap-1 items-center'>
                        <GameController size={32} />
                        Aksesoris
                      </Link>
                    </Dropdown.Item>
                  </Dropdown>
                </div>
            </div>

            <Link to={"/cart"} className='flex gap-1 items-center'>
              <div className='flex gap-1 items-center w-full transition-all duration-500 hover:bg-slate-200 rounded-md px-3 py-1'>
                  <ShoppingCart size={32} />
                  <p>
                    Keranjang
                  </p>
                </div>
            </Link>
    
        
            <TextInput onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                navigate(`/search/${search}`)
              }
            }}
            type="text" placeholder="Search ..." shadow />
       

        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
