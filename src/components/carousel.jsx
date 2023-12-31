import { useState } from 'react';
import { Carousel } from 'flowbite-react';
import Handphone from '../assets/Handphone.webm';
import { useRef } from 'react';
import laptop from '../assets/laptop.webp';
import tablet from '../assets/tablet.webp';
export default function CarouselCom() {
  // const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (index) => {
    // setCurrentSlide(index);

  
    if (index === videoSlideIndex) {
      playVideo();
    } else {
      pauseVideo();
    }
  };

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const videoRef = useRef(null);
  const videoSlideIndex = 0; 

  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 ">
      <Carousel slideInterval={3900} onChange={handleSlideChange}>
        <video ref={videoRef} autoPlay loop muted>
          <source src={Handphone} type="video/webm" />
        </video>
        <img src={laptop} alt="..." className='object-cover' />
        <img src={tablet} alt="..." />
      </Carousel>
    </div>
  );
}
