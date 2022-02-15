import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image'
import styles from './styles.module.scss'
import Ban1 from '../../../public/ban1.jpg'
import Ban2 from '../../../public/ban2.png'
import { style } from '@mui/system';

export default function Slider() {
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
        { globalThis.innerWidth < 640 ? 
          <Image 
            src={Ban1}
            width={1500}
            height={1300}
            objectFit='cover'
          /> 
          : 
          <Image 
            src={Ban1}
          /> 
        }
      </SwiperSlide>
      <SwiperSlide>
        {console.log(globalThis.innerWidth)}
        {globalThis.innerWidth < 640 ? 
          <Image 
            src={Ban2}
            objectFit='cover'
            width={1500}
            height={1300}
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