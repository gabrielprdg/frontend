import Image from 'next/image';
import { useEffect, useState } from 'react';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import Ban1 from '../../../public/ban1.jpg';
import Ban2 from '../../../public/ban2.png';
import styles from './styles.module.scss';

export default function Slider() {
  const [ screenSize, setScreenSize] = useState(0)

  useEffect(() => {
    setScreenSize(window.screen.width)
  },[])

  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      className={styles.config}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide>
        {screenSize < 640 ? 
          <Image 
            src={Ban1}
            className={styles.firstBanner}
            width={600}
            height={400}
            objectFit='cover'
          />
          :
          <Image
            src={Ban2}
          /> 
        }
       
        
        
      </SwiperSlide>
      <SwiperSlide>
        
        {console.log('fb', screenSize)}
        {screenSize < 640 ? 
          <Image 
            src={Ban2}
            width={600}
            height={400}
            objectFit='cover'
          /> 
          : 
          <Image
            src={Ban2}
          /> 
        }
      </SwiperSlide>
      ...
    </Swiper>
  )
}