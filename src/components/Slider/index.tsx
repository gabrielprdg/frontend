import React, { Fragment } from "react";
import { prevSlide, nextSlide} from '../../scripts/slider'
import styles from './styles.module.scss'
  // core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from 'swiper';
  // import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

 

export default function Slider() {
   // configure Swiper to use modules
   Swiper.use([Navigation, Pagination]);

   // init Swiper:
   const swiper = new Swiper('.swiper', {
    // Optional parameters
   
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });

  return (
    <div className={styles.container}>
      <div className='swiper'>
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <img src="./s1.jpg" alt="s1" />
        </div>
        <div className="swiper-slide">
          <img src="./s2.jpg" alt="s2" />
        </div>
        <div className="swiper-slide">
          <img src="./s3.jpg" alt="s3" />
        </div>
      </div>
      
      <div className="swiper-pagination"></div>

      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
      
      <div className="swiper-scrollbar"></div>
    </div>
    </div>
  );
}


