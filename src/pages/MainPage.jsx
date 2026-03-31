import React, { useRef, useState } from 'react';
import {Card, Button, Flex } from 'antd';
const { Meta } = Card;

import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
export const MainPage = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };


  return (
    <>
      
      <div className="mainswiper">
        <Swiper
        style={{height:'400px'}}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      > 
        <SwiperSlide><img style={{width:'100%', height:'100%'}} src="https://i.pinimg.com/736x/7f/4a/dc/7f4adc971b328bffbf4d31eb8e4cf83c.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img style={{width:'100%', height:'100%'}} src="https://i.pinimg.com/1200x/56/ea/ab/56eaab20df61c82b0ab37b5d78666080.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img style={{width:'100%', height:'100%'}} src="https://i.pinimg.com/736x/d6/fc/e1/d6fce118b27037475f20c95e5cc7c53a.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img style={{width:'100%', height:'100%'}} src="https://i.pinimg.com/736x/ce/59/d9/ce59d91574e3c0637a19924eade64c20.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img style={{width:'100%', height:'100%'}} src="https://i.pinimg.com/1200x/49/cc/38/49cc382afb33d4c1cc16cdc8c512b20e.jpg" alt="" /></SwiperSlide>
        
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
      
      </div >
        <div className="ads">
          <h3 style={{margin:'30px 5px 5px 5px', color: '#FF6A00'}}>Reklama</h3>
          
              <Swiper
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            
            spaceBetween={30}
            effect={'fade'}
            style={{height:'100px', margin:'0px 5px 20px 5px', borderRadius:'10px', width:'97%'}}
            
            
            modules={[Autoplay,EffectFade ]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
            </SwiperSlide>
          </Swiper>
        </div>
      
      <Flex>
        <h2 style={{color:'#FF6A00', padding:'5px', margin:'0px 0px'}}>Top animelar: </h2>
      </Flex>
      <br />
        <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        slidesPerView={3}
        spaceBetween={3}
        style={{height: '200px', padding:'5px'}}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        <SwiperSlide >
                    <Card
              hoverable
              style={{ width: '100%',  padding: '0'}}
              cover={
                <img
                  draggable={true}
                  alt="example"
                  src="https://i.pinimg.com/736x/45/6f/d1/456fd1ea63c2ebf7ca6132765f6cbe81.jpg"
                />
              }
              
            >
              <h4>Anime</h4>
              
            </Card>
        </SwiperSlide>
        <SwiperSlide >
                    <Card
              hoverable
              style={{ width: '100%',  padding: '0'}}
              cover={
                <img
                  draggable={true}
                  alt="example"
                  src="https://i.pinimg.com/736x/45/6f/d1/456fd1ea63c2ebf7ca6132765f6cbe81.jpg"
                />
              }
              
            >
              <h4>Anime</h4>
              
            </Card>
        </SwiperSlide>
        <SwiperSlide >
                    <Card
              hoverable
              style={{ width: '100%',  padding: '0'}}
              cover={
                <img
                  draggable={true}
                  alt="example"
                  src="https://i.pinimg.com/736x/45/6f/d1/456fd1ea63c2ebf7ca6132765f6cbe81.jpg"
                />
              }
              
            >
              <h4>Anime</h4>
              
            </Card>
        </SwiperSlide>
        <SwiperSlide >
                    <Card
              hoverable
              style={{ width: '100%',  padding: '0'}}
              cover={
                <img
                  draggable={true}
                  alt="example"
                  src="https://i.pinimg.com/736x/45/6f/d1/456fd1ea63c2ebf7ca6132765f6cbe81.jpg"
                />
              }
              
            >
              <h4>Anime</h4>
              
            </Card>
        </SwiperSlide>
        <SwiperSlide >
                    <Card
              hoverable
              style={{ width: '100%',  padding: '0'}}
              cover={
                <img
                  draggable={true}
                  alt="example"
                  src="https://i.pinimg.com/736x/45/6f/d1/456fd1ea63c2ebf7ca6132765f6cbe81.jpg"
                />
              }
              
            >
              <h4>Anime</h4>
              
            </Card>
        </SwiperSlide>
        
      </Swiper>

      
      <br /><br /><br /><hr /><br /><br />
    </>
  );
}

export default MainPage