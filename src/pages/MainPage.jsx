import React, { useEffect, useRef, useState } from 'react';
import {Card, Button, Flex } from 'antd';
const { Meta } = Card;

import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { Navigate } from 'react-router';
export const MainPage = () => {

  const API_UR = "https://zakazlar688user.alwaysdata.net/api/homepage/";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  useEffect(() => {
      const tg = window.Telegram.WebApp;
      fetch(API_UR)
      .then((res) => {
        if (!res.ok) throw new Error("Xatolik: " + res.status);
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

      if (tg.initData) {
        fetch("https://zakazlar688user.alwaysdata.net/api/auth/telegram/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            initData: tg.initData
          })
        })
        .then(res => res.json())
        .then(data => {
          console.log('ishladi');
          });
        }
      }, []);

    if (loading) return <p>Yuklanmoqda...</p>;
    if (error) return <p>Xato: {error}</p>;


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
        {data?.slider?.map((item) => (
          <SwiperSlide key={item.id}>
            <img style={{width:'100%', height:'100%'}} src={item.poster_url} alt={item.title} />
          </SwiperSlide>
        ))}
        
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>k
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
            {data?.ads?.map((item, index) => (
              <SwiperSlide key={index}>
                <a href={item.link_url} target="_blank" rel="noopener noreferrer">
                  <img src={item.image_url} />
                </a>
              </SwiperSlide>
            ))}

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
        {data?.top_animes?.map((item) => (
          <SwiperSlide key={item.id}>
            <Card
              hoverable
              style={{ width: '100%', padding: '0' }}
              cover={
                <img
                  draggable={true}
                  alt={item.title}
                  src={item.poster_url}
                />
              }
              onClick={() => Navigate(`/anime/${item.id}/`)}
            >
              <h4>{item.title}</h4>
            </Card>
          </SwiperSlide>
        ))}
        
      </Swiper>

      
      <br /><br /><br /><hr /><br /><br />
    </>
  );
}

export default MainPage