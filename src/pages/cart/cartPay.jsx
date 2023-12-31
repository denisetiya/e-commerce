import React from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { useEffect,useState } from 'react';
import { Label, TextInput, Textarea,Accordion, Button,Dropdown } from 'flowbite-react';

function cartPay() {

  const navigate = useNavigate();
  const {id} = useParams();

  const [data, setData] = useState([]);
 

  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')
  const [province, setProvince] = useState('')
  const [postCode, setPostalCode] = useState('')
  const [detail, setDetail] = useState('')
  const [pay, setPay] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get(`http://localhost:3000/store/cart/get/${id}`);
        setData(res1.data.data[0]);
      
        const res2 = await axios.get(`http://localhost:3000/store/profile/address/${localStorage.getItem('idUser')}`);
        setCity(res2.data.data[0].city);
        setProvince(res2.data.data[0].province);
        setDistrict(res2.data.data[0].district);
        setPostalCode(res2.data.data[0].postalCode);
        setDetail(res2.data.data[0].detailAddress);

      } catch (err) {
        console.log(err);
      }
      
    }

    fetchData();

  },[])


  function CurrencyFormat({ number }) {
    const formattedNumber = new Intl.NumberFormat('id-ID').format(number);
    return formattedNumber;
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    if (pay == '') {
      alert('pilih metode pembayaran')
      return
    } 
    await axios.post(`http://localhost:3000/store/payment/add`,{
      id : data.id,
      namaProduct : data.namaProduct,
      hargaProduct : data.hargaProduct,
      imgUrl : data.imgUrl,
      idSaller : data.idSaller,
      idUser : data.idUser,
      idProduct : data.idProduct,
      qty : data.qty,
      fixedPrice : data.fixedPrice,
      payWith : pay,
      paymentStatus : false,
      status : 'Menunggu Pembayaran',
    })
    .then((res) => {
      if (res.data.status == 200) {
        alert('Terima kasih, Silahkan melakukan pembayaran di menu pesanan');
        navigate('/profile')
      } else {
        alert(res.data.message)
      }
    }) .catch((err) => {
      console.log(err);
    })
  }

  

  return (
    <div className='flex flex-col gap-5'>

    <div className='flex gap-16 mt-24 items-center justify-center flex-col sm:flex-row mx-5 sm:mx-0'>
        <div className='flex flex-col gap-4 '>
          <img src={`http://localhost:3000/assets/product/${data.imgUrl}`} alt="" width={350} height={350} />
          <div className='flex flex-row items-center'>
            <span className='text-lg font-medium text-gray-700'>Nama Product :</span>
            <span className='text-cyan-700 ml-auto'>{data.namaProduct}</span>
          </div>
          <hr />
          <div className='flex flex-row items-center'>
            <span className='text-lg font-medium text-gray-700'>Harga Product :</span>
            <span className='text-cyan-700 ml-auto'>Rp <CurrencyFormat number={data.fixedPrice} /></span>
          </div>
          <hr />
          <div className='flex flex-row items-center'>
            <span className='text-lg font-medium text-gray-700'>Quantity :</span>
            <span className='text-cyan-700 ml-auto'>{data.qty} Unit</span>
          </div>
          <hr />
          <div className='flex flex-row items-center'>
            <span className='text-lg font-medium text-gray-700'>Biaya Pengiriman :</span>
            <span className='text-cyan-700 ml-auto'>Rp 30.000</span>
          </div>
          <hr />
          <div className='flex flex-row items-center'>
            <span className='text-lg font-medium text-gray-700'>Total Payment :</span>
            <span className='text-cyan-700 ml-auto'>Rp <CurrencyFormat number={Number(data.hargaProduct) + 30000} /></span>
          </div>
        </div>

      <div>
      <form className="flex max-w-md flex-col gap-4 md:w-full w-screen px-4 sm:px-0 ">
          <div className='w-full'>
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
          <label htmlFor="message"> Detail Alamat</label>
          <Textarea id="message" rows={4} placeholder='detail alamat/ patokan/ jalan' value={detail} required shadow onChange={(e) => setDetail(e.target.value)}></Textarea>

          <Dropdown label="Metode Pembayaran" inline>
            <Dropdown.Item onClick={() => setPay('Transfer Bank') }>Transfer bank</Dropdown.Item>
            <Dropdown.Item onClick={() => setPay('E-Wallet')}>E-Wallet</Dropdown.Item>
            <Dropdown.Item onClick={() => setPay('Kartu Kredit')}>Kartu Kredit</Dropdown.Item>
          </Dropdown>

          <TextInput type="text" readOnly value={pay}/>
          </form>
      </div>
    </div>

    <div className='mt-3 flex justify-center '>
      <Button className='w-[60%]' onClick={handleSubmit}>Checkout</Button>
    </div>
    </div>
  )
}

export default cartPay