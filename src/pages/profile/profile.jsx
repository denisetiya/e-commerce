import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'
import { Tabs, Button,Modal,Label,TextInput,FileInput} from 'flowbite-react';
import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import {UserCircle} from '@phosphor-icons/react'
import Address from './address'
import ChangePass from './changePass'
import EditProfile from './editProfile'
import SallerReg from '../saller/register'
import {motion} from 'framer-motion'

function profile() {

  const [user, setUser] = useState([])
  const [menu,setMenu] = useState(1)
  const [pesanan,sePesanan] = useState([])
  const [openModal, setOpenModal] = useState(false);
  const [img, setImg] = useState(null);
  const [load, setLoad] = useState(1)

  function onCloseModal() {
    setOpenModal(false);
  }


  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`http://localhost:3000/store/profile/${localStorage.getItem('idUser')}`)
        .then((res) => {
          setUser(res.data.data[0])
        }) .catch((err) => {
          console.log(err);
        })

      await axios.get(`http://localhost:3000/store/payment/all/${localStorage.getItem('idUser')}`)
        .then((res) => {
          sePesanan(res.data.data)
        })
    }
    fetchData()
  },[load])

  function CurrencyFormat({ number }) {
    const formattedNumber = new Intl.NumberFormat('id-ID').format(number);
    return formattedNumber;
  }
 
  const handlepay = async (id) => {
    
    await axios.put(`http://localhost:3000/store/payment/update-status/${id}`,{
      status: 'menunggu konfirmasi pembayaran',
      img : img
    },{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }) .then((res) => {
      if (res.data.status == 200) {
        setLoad(load + 1)
      } else{
        alert(res.data.message)
      }
    }) .catch((err) => {
      alert(err)
    })

  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/store/payment/delete/${id}`)
    .then((res) => {
      if (res.data.status == 200) {
        setLoad(load + 1)
      }
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -200 }}
      transition={{ duration: 0.5 }}
    className='mt-32 justify-center items-center mx-10'>
      <Tabs aria-label="Default tabs" style="default">
        <Tabs.Item title="Akun saya" icon={HiUserCircle}>
          <div className='flex items-center gap-5 flex-col sm:flex-row sm:justify-between'>

            <div
  
            className='flex gap-4 items-center flex-col sm:flex-row '>
              {user.imgUrl === null ? (
                <UserCircle size={232} />
              ):(
                <img src={`http://localhost:3000/assets/user/${user.imgUrl}`} width={232} alt="" className='rounded-full'/>
              )}
              <div className='flex flex-col justify-center items-center sm:justify-start sm:items-start'>
                <p className='text-3xl font-bold '>
                  {user.nama}
                </p>
                <p className='text-xl font-medium text-gray-600'>
                  {user.email}
                </p>
                <p className='font-medium text-gray-600'>
                  Status : <span className='text-cyan-700'>{user.role}</span> 
                </p>
              </div>
            </div>

            <div className='flex gap-2 flex-col sm:mr-10 justify-center items-center '>
              <Button onClick={() => setMenu(1)} >
                  Edit Profile
              </Button>

              <Button onClick={() => setMenu(0)}>
                  Address
              </Button>

               <Button onClick={() => setMenu(2)}>
                  Change Password
               </Button>
            </div>

          </div>
          <hr />
          <div>
           {menu === 0 ? <Address /> : menu === 1 ? <EditProfile /> : <ChangePass/>}  
          </div>
        </Tabs.Item>

        <Tabs.Item title="Pesanan" active icon={MdDashboard}>
            <div className='flex flex-col gap-3'>
              {pesanan.length == 0 ? (
                <div>
                  <p>
                    Tidak ada pesanan
                  </p>
                </div>
              ): (
                pesanan.map((item, index) => (
                  <motion.div
                  initial={{ opacity: 0, y: -200 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -200 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  layout
                  key={item.id}>
                    <div >
                      <div className='flex border p-3 gap-3 rounded-xl shadow-md flex-col sm:flex-row justify-center items-center sm:justify-start sm:items-start'>
                         <img src={`http://localhost:3000/assets/product/${item.imgUrl}`}  alt=""  className=' w-48'/>
                         <div className='flex flex-col items-center gap-2 sm:justify-start sm:items-start'>
                            <p className='font-medium'> 
                              {item.namaProduct}
                            </p>
                            <p>
                              Rp {CurrencyFormat({number: item.hargaProduct})}
                            </p>
                            <p>
                             Jumlah : {item.qty} unit
                            </p>
                            <p>
                              Metode Pembayaran : {item.payWith}
                            </p>
                            <p>
                              Status : {item.status}
                            </p>
                            {item.paymentStatus ? (
                              null
                            ):(
                              
                              <div>
                                <div className=' flex gap-5 mt-3'>
                                  <Button onClick={() => setOpenModal(true)} className='w-36'>
                                    Bayar
                                  </Button>
                                  <Button onClick={() => handleDelete(item.id)} className='w-36'>
                                    Batalkan
                                  </Button>
                                </div>
                                <Modal show={openModal} onClose={onCloseModal} size="md"  popup>
                                  <Modal.Header />
                                  <Modal.Body>
                                    <div className="space-y-6">
                                      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Tambahkan bukti bayar</h3>
                                      <div>
                                        <div className="mb-2 block">
                                          <Label htmlFor="tujuan" value="tujuan" />
                                        </div>
                                        <TextInput
                                          id="tujuan"
                                          value={
                                            item.payWith === 'Transfer Bank' ? '0919131' :
                                            item.payWith === 'E-Wallet' ? '311333' :
                                            item.payWith === 'Kartu Kredit' ? '0919131' :
                                            'Metode pembayaran tidak diketahui'
                                          }
                                          readOnly
                                          required
                                        />

                                      </div>
                                      <div>
                                        <input type="file" required onChange={(e) => setImg(e.target.files[0])}/>
                                      </div>

                                      <div className="w-full">
                                        <Button onClick={() => {handlepay(item.id); onCloseModal()}}  >Kirim</Button>
                                      </div>
              
                                    </div>
                                  </Modal.Body>
                                </Modal>
                              </div>
                            )}
                         </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
             
            </div>
        </Tabs.Item>

        <Tabs.Item title="Daftar saller" icon={MdDashboard}>
          {localStorage.getItem('role') == 'saller'  ? (
            <div className='text-xl text-center mt-10 text-cyan-700'>Kamu telah terdaftar Sebagai saller</div>
          ) : (
            localStorage.getItem('role') == 'admin' ? (
              <div className='text-xl text-center mt-10 text-cyan-700'>Kamu telah terdaftar Sebagai admin</div>
            ) : (
              <SallerReg />
            )
          )}
        </Tabs.Item>

      </Tabs>
    </motion.div>
  );
}

export default profile



