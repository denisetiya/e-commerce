import React from 'react'
import { Tabs } from 'flowbite-react';
import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function dashboardAdmin() {

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(1);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get('http://localhost:3000/store/approval');
        setData(res.data.data);
        const res2 = await axios.get('http://localhost:3000/store/payment/all');
        setData2(res2.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    
    fetchdata();

    if (localStorage.getItem('role') === 'saller') {
      navigate('/saller/dashboard');
    } else if (localStorage.getItem('role') === 'user') {
      navigate('/');
    }
  
  }, [refresh]);
  
  console.log(data2)
  const handleReject= async(id) => {
      await axios.delete(`http://localhost:3000/store/approval/${id}`)
      .then((res) => {
        setRefresh(refresh + 1)
      })
      .catch((err) => {
        console.log(err)
        alert(err)
      })
  }

  const handleApprove= async(id, idSaller) => {

    try {
      await axios.post(`http://localhost:3000/store/approval/${id}`,{
        idSaller:idSaller
      }) .then ((res) => {
        if(res.data.status === 200){
          alert(res.data.message)
        } else{
          alert(res.data.message)
        }
        setRefresh(refresh + 1)
      })
    } catch (error) {
      alert(error)
      console.error("Error fetching data:", error);
    }
  }

  const handleApprovePay = async(id, idProduct) => {

    try {
      await axios.put(`http://localhost:3000/store/payment/update-status-admin/${id}/${idProduct}`,{
        status : 'Menunggu penjual mengirim barang'
      })
      .then ((res) => {
        if(res.data.status === 200){
          alert(res.data.message)
        } else{
          alert(res.data.message)
        }
        setRefresh(refresh + 1)
      })
    } catch (error) {
      alert(error)
      console.error("Error fetching data:", error);
    }
  }

  
  return (
    <div className='mt-32 mx-10'>
      <div className='flex flex-col gap-20 '>
        <div className='text-center text-2xl font-bold'>
          Welcome to Dashboard
        </div>
        <div className='flex gap-8 flex-wrap justify-center items-center'>
        <Tabs aria-label="Default tabs" style="default">
            <Tabs.Item active title="Seller Approval" icon={HiUserCircle}>
              <div className='flex flex-col gap-4 border px-4 py-2 rounded-lg w-full'>
                {data.map((item,) => (
                  <div key={item.id} className='flex justify-between border gap-2 px-4 py-2 rounded-xl'>
                    <div className='w-full'>
                      <img src={`http://localhost:3000/assets/saller/${item.imgUrl}`} alt="" width={100} className='rounded-lg'/>
                      <div className='flex gap-2'>
                        <div className='font-bold'>
                          {item.name_brand} 
                        </div>
                        <Link className='text-cyan-700'>
                          show detail
                        </Link>
                      </div>
                    </div>
                    <div className='flex gap-4 justify-center items-center'>
                      <button onClick={() => handleApprove(item.id, item.idSaller)} className='text-green-700 font-bold'>
                        approve
                      </button>
                      <button onClick={() => handleReject(item.id)} className='text-red-700 font-bold'>
                        reject
                      </button>
                    </div>
                  </div>
                 ))} 
              </div>
            </Tabs.Item>
            <Tabs.Item title="Payments" icon={MdDashboard}>
              <div className='flex flex-col gap-4 border px-4 py-2 rounded-lg w-full'>
                 {data2.map((item) => (
                  <div className='flex justify-between'>
                    <div className=''>
                      <img src="" alt="" />
                      <div>
                        {item.namaProduct}
                      </div>
                      <div>
                        {item.idUser}
                      </div>

                    </div>
                    <div className='flex gap-1 flex-col'>
                      <Link to={`http://localhost:3000/assets/payment/${item.buktiPembayaran}`}>
                        Show detail
                      </Link>
                      <button onClick={() => handleApprovePay(item.id, item.idProduct)}>
                        Approve
                      </button>
                    </div>
                  </div>
                  
                  ))}
                </div>
            </Tabs.Item>
            <Tabs.Item title="Orders" icon={HiAdjustments}>
            <div className='flex flex-col gap-4 border px-4 py-2 rounded-lg w-full'>
                <div className='flex justify-between'>
                  <div className='w-full'>
                    <img src="" alt="" />
                    <div>
                      nama
                    </div>
                    <div>
                      show detail
                    </div>
                  </div>
                  <div className='flex gap-4'>
                    <button>
                      approve
                    </button>
                    <button>
                      reject
                    </button>
                  </div>
                </div>
              </div>
            </Tabs.Item>
            <Tabs.Item title="Display " icon={HiClipboardList}>
            <div className='flex flex-col gap-4 border px-4 py-2 rounded-lg w-full'>
                <div className='flex justify-between'>
                  <div className='w-full'>
                    <img src="" alt="" />
                    <div>
                      nama
                    </div>
                    <div>
                      show detail
                    </div>
                  </div>
                  <div className='flex gap-4'>
                    <button>
                      approve
                    </button>
                    <button>
                      reject
                    </button>
                  </div>
                </div>
              </div>
            </Tabs.Item>
 
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default dashboardAdmin




