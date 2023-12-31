
'use client';

import { Button, Card } from 'flowbite-react';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Stack } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

export default function listBrandProduct() {

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`http://localhost:3000/store/product/brand/` + localStorage.getItem('idUser'))
        .then((res) => {
          setData(res.data.data);
        }) .catch((err) => {
          console.log(err);
        })
    }
    fetchData();
  },[])

  function CurrencyFormat({ number }) {
    const formattedNumber = new Intl.NumberFormat('id-ID').format(number);
    return formattedNumber;
  }


  // const TruncateText = ({ text, maxLength }) => {
  //   const truncatedText = text.slice(0, maxLength);
  //   const displayText = text.length > maxLength ? truncatedText + '...' : truncatedText;
  //   return (
  //     <div>
  //       <p>{displayText}</p>
  //     </div>
  //   );
  // };

  const handleEdit = (id) => {

    navigate('/saller/edit/' + id);
  }

  return (
    <div className='flex gap-3 mx-1 flex-wrap'>
      {data.map((data,index) => (
        <motion.div
        initial={{ opacity: 0 , scale: 0.5 }}
        animate={{ opacity: 1 , scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 * index }}
        key={data.id}>
          <Card 
            className="max-w-[180px] relative h-[370px]"

            imgSrc={`http://localhost:3000/assets/product/` + data.imgUrl}
          >
            <Link to="#" className='pb-24'>
              <h5 className="text-sm font-semibold tracking-tight text-cyan-700 dark:text-white">
              {/* <TruncateText text={data.nama} maxLength={16} /> */}
              {data.nama}
              </h5>
            </Link>
            {/* <div className='text-sm text-gray-600 mb-24'>
              <TruncateText text={data.deskripsiSingkat} maxLength={33} />
            </div> */}

            <div className="flex flex-col gap-2 absolute bottom-3 w-full left-3">
              <span className="font-bold text-gray-900 dark:text-white text-sm">
                <div className='flex gap-1 items-center text-sm text-gray-500'>
                  <Stack size={15} />Stok : {data.stok}
                </div>
                Rp {CurrencyFormat({ number: data.harga })}
              </span>
              <Button
                onClick={() => handleEdit(data.id)}
                className="w-[87%]"
              >
                Edit
              </Button>
            </div>
          </Card>
        </motion.div>
        
         ))}
    </div>
  );
}
