import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, EffectCards } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-cards';

const HEADER_H = 50;
const FOOTER_H = 0;
const API_URL = 'https://zakazlar688user.alwaysdata.net/api/homepage/';

/* ─── Inline styles ─────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@400;600;700&display=swap');

  .mp-root {
    height: calc(100vh - ${HEADER_H + FOOTER_H}px);
    overflow-y: auto;
    overflow-x: hidden;
    background: #0a0a0f;
    font-family: 'Nunito', sans-serif;
    color: #fff;
    scrollbar-width: none;
  }
  .mp-root::-webkit-scrollbar { display: none; }

  /* ── Hero slider ── */
  .hero-swiper {
    width: 100%;
    height: 400px;
    position: relative;
  }
  .hero-swiper .swiper { height: 100%; }
  .hero-slide-img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }
  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 40%, #0a0a0f 100%);
    z-index: 2;
    pointer-events: none;
  }
  .hero-title {
    position: absolute;
    bottom: 14px;
    left: 14px;
    z-index: 3;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 26px;
    letter-spacing: 1px;
    color: #fff;
    text-shadow: 0 2px 8px rgba(0,0,0,0.7);
  }
  .swiper-pagination-bullet {
    background: rgba(255,255,255,0.4) !important;
    opacity: 1 !important;
    width: 6px !important;
    height: 6px !important;
  }
  .swiper-pagination-bullet-active {
    background: #FF6A00 !important;
    width: 18px !important;
    border-radius: 3px !important;
  }

  /* ── Section header ── */
  .sec-head {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 14px 8px;
  }
  .sec-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    letter-spacing: 1px;
    color: #FF6A00;
  }
  .sec-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, #FF6A0040, transparent);
  }

  /* ── Ads ── */
  .ads-swiper {
    margin: 0 14px 6px;
    border-radius: 12px;
    overflow: hidden;
    height: 80px;
    border: 1px solid #FF6A0030;
  }
  .ads-swiper .swiper { height: 100%; }
  .ads-img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }

  /* ── Top anime cards ── */
  .top-swiper {
    padding: 0 14px 14px !important;
  }
  .anime-card {
    border-radius: 10px;
    overflow: hidden;
    background: #14141e;
    border: 1px solid #FF6A0020;
    cursor: pointer;
    transition: border-color 0.2s, transform 0.15s;
    position: relative;
  }
  .anime-card:active { transform: scale(0.97); }
  .anime-card-img {
    width: 100%;
    height: 148px;
    object-fit: cover;
    display: block;
  }
  .anime-card-gradient {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 60px;
    background: linear-gradient(to bottom, transparent, #14141e);
  }
  .anime-card-title {
    font-size: 11px;
    font-weight: 700;
    padding: 5px 7px 6px;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .anime-card-ep {
    position: absolute;
    top: 6px; right: 6px;
    background: #FF6A00;
    color: #fff;
    font-size: 9px;
    font-weight: 700;
    padding: 2px 5px;
    border-radius: 4px;
    letter-spacing: 0.5px;
  }

  /* ── Loading / Error ── */
  .mp-center {
    height: calc(100vh - ${HEADER_H + FOOTER_H}px);
    display: flex; align-items: center; justify-content: center;
    flex-direction: column; gap: 12px;
    background: #0a0a0f;
  }
  .mp-loader {
    width: 36px; height: 36px;
    border: 3px solid #FF6A0030;
    border-top-color: #FF6A00;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .mp-load-text {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px;
    letter-spacing: 2px;
    color: #FF6A00;
  }

  /* ── Decorative top bar ── */
  .top-accent {
    height: 3px;
    background: linear-gradient(to right, #FF6A00, #ff9240, #FF6A00);
    background-size: 200% 100%;
    animation: shimmer 2s linear infinite;
  }
  @keyframes shimmer { to { background-position: 200% 0; } }
`;

export const MainPage = () => {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const navigate              = useNavigate();

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    fetch(API_URL)
      .then(r => { if (!r.ok) throw new Error('Status: ' + r.status); return r.json(); })
      .then(j => { setData(j); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });

    if (tg?.initData) {
      fetch('https://zakazlar688user.alwaysdata.net/users/auth/telegram/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ initData: tg.initData }),
      })
        .then(r => r.json())
        .then(d => console.log('Telegram user:', d));
    }
  }, []);

  if (loading) return (
    <>
      <style>{css}</style>
      <div className="mp-center">
        <div className="mp-loader" />
        <span className="mp-load-text">Yuklanmoqda</span>
      </div>
    </>
  );

  if (error) return (
    <>
      <style>{css}</style>
      <div className="mp-center">
        <span style={{ color: '#ff4444', fontSize: 14 }}>Xato: {error}</span>
      </div>
    </>
  );

  return (
    <>
      <style>{css}</style>
      <div className="mp-root">

        {/* Accent bar */}
        <div className="top-accent" />

        {/* ── Hero Slider ── */}
        <div className="hero-swiper">
          <Swiper
            spaceBetween={0}
            centeredSlides
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            effect="fade"
            modules={[Autoplay, Pagination, EffectFade]}
            style={{ height: '100%' }}
          >
            {data?.slider?.map(item => (
              <SwiperSlide key={item.id} style={{ position: 'relative' }}>
                <img className="hero-slide-img" src={item.poster_url} alt={item.title} />
                <div className="hero-overlay" />
                <div className="hero-title">{item.title}</div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ── Reklama ── */}
        <div className="sec-head">
          <span className="sec-title">Reklama</span>
          <div className="sec-line" />
        </div>
        <div className="ads-swiper">
          <Swiper
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            effect="fade"
            modules={[Autoplay, EffectFade]}
            style={{ height: '100%' }}
          >
            {data?.ads?.map((item, i) => (
              <SwiperSlide key={i}>
                <a href={item.link_url} target="_blank" rel="noopener noreferrer">
                  <img className="ads-img" src={item.image_url} alt="reklama" />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ── Top Animelar ── */}
        <div className="sec-head">
          <span className="sec-title">Top Animelar</span>
          <div className="sec-line" />
        </div>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          slidesPerView={3.2}
          spaceBetween={10}
          className="top-swiper"
          style={{ height: 195 }}
        >
          {data?.top_animes?.map(item => (
            <SwiperSlide key={item.id}>
              <div className="anime-card" onClick={() => navigate(`/anime/${item.id}/`)}>
                <img className="anime-card-img" src={item.poster_url} alt={item.title} />
                <div className="anime-card-gradient" />
                {item.episodes_count && (
                  <div className="anime-card-ep">{item.episodes_count} EP</div>
                )}
                <div className="anime-card-title">{item.title}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </>
  );
};

export default MainPage;