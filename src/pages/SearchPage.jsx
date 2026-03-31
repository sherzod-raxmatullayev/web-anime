import React, { useState, useRef, useEffect } from 'react'

// ─── API CONFIG ────────────────────────────────────────────────
// O'z API endpoint'ingizni shu yerga qo'ying
const API_BASE_URL = 'https://api.example.com'  // ← shu ni o'zgartiring

// Misol uchun: 'https://api.jikan.moe/v4' (anime uchun bepul API)
// yoki o'z backendingizni yozing

const fetchAnime = async (query) => {
  // Haqiqiy API'ga ulanganda shu blokni faollashtiring:
  // const res = await fetch(`${API_BASE_URL}/anime?q=${encodeURIComponent(query)}&limit=20`)
  // const json = await res.json()
  // return json.data.map(a => ({
  //   id: a.mal_id,
  //   title: a.title,
  //   image: a.images.jpg.image_url,
  //   score: a.score,
  //   episodes: a.episodes,
  //   genres: a.genres.map(g => g.name),
  //   desc: a.synopsis?.slice(0, 120) + '...',
  //   year: a.year,
  //   status: a.status,
  // }))

  // Vaqtinchalik demo data (API ulanguncha)
  return DEMO_DATA.filter(a =>
    !query || a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.genres.some(g => g.toLowerCase().includes(query.toLowerCase()))
  )
}
// ──────────────────────────────────────────────────────────────

const DEMO_DATA = [
  {
    id: 1,
    title: 'Fullmetal Alchemist: Brotherhood',
    image: 'https://cdn.myanimelist.net/images/anime/1223/96541.jpg',
    score: 9.1,
    episodes: 64,
    genres: ['Action', 'Adventure', 'Drama'],
    desc: "Ikki aka-uka o'z onalarini tiriltirishga urinib, katta xato qiladilar. Endi ular yo'qotganlarini qaytarish uchun yo'lga tushadilar.",
    year: 2009,
    status: 'Tugagan',
  },
  {
    id: 2,
    title: 'Attack on Titan',
    image: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
    score: 9.0,
    episodes: 87,
    genres: ['Action', 'Drama', 'Fantasy'],
    desc: "Gigant maxluqlar insoniyatni yo'q qilish arafasida. Eren va do'stlari ulardan himoya qiluvchi askarlarga aylanishadi.",
    year: 2013,
    status: 'Tugagan',
  },
  {
    id: 3,
    title: 'Demon Slayer',
    image: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg',
    score: 8.7,
    episodes: 26,
    genres: ['Action', 'Fantasy', 'Supernatural'],
    desc: "Tanjiro singlisini iblisga aylantirgan kuchga qarshi kurashadi. Ajoyib animatsiya va emotsional hikoya.",
    year: 2019,
    status: 'Davom etmoqda',
  },
  {
    id: 4,
    title: 'Steins;Gate',
    image: 'https://cdn.myanimelist.net/images/anime/5/73199.jpg',
    score: 9.1,
    episodes: 24,
    genres: ['Sci-Fi', 'Thriller', 'Drama'],
    desc: "Vaqt sayohati kashf etilganda, kichik bir laboratoriya dunyoning taqdirini o'zgartiruvchi sirli voqealarga tortiladi.",
    year: 2011,
    status: 'Tugagan',
  },
  {
    id: 5,
    title: 'Hunter x Hunter',
    image: 'https://cdn.myanimelist.net/images/anime/11/33657.jpg',
    score: 9.0,
    episodes: 148,
    genres: ['Action', 'Adventure', 'Fantasy'],
    desc: "Gon otasini topish uchun ovchi imtihoniga kiradi. Yo'lda ajoyib do'stlar va xavfli dushmanlar kutmoqda.",
    year: 2011,
    status: 'Tugagan',
  },
  {
    id: 6,
    title: 'Violet Evergarden',
    image: 'https://cdn.myanimelist.net/images/anime/1795/95088.jpg',
    score: 8.7,
    episodes: 13,
    genres: ['Drama', 'Fantasy', 'Slice of Life'],
    desc: "Urushdan keyin Violet his-tuyg'ularni tushunishga harakat qiladi. KyoAni studiyasining eng go'zal asarlaridan biri.",
    year: 2018,
    status: 'Tugagan',
  },
]

const CATEGORIES = ['Barchasi', 'Action', 'Drama', 'Sci-Fi', 'Fantasy', 'Thriller']

const ACCENT = 'rgb(255, 106, 0)'
const ACCENT_DIM = 'rgba(255, 106, 0, 0.15)'

const StarRating = ({ score }) => {
  const stars = Math.round((score / 10) * 5)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M6 1L7.35 4.27L11 4.64L8.5 6.86L9.28 10.5L6 8.65L2.72 10.5L3.5 6.86L1 4.64L4.65 4.27L6 1Z"
            fill={i <= stars ? ACCENT : 'rgba(255,255,255,0.12)'}
            stroke={i <= stars ? ACCENT : 'rgba(255,255,255,0.1)'}
            strokeWidth="0.5"
          />
        </svg>
      ))}
      <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', marginLeft: '4px' }}>
        {score.toFixed(1)}
      </span>
    </div>
  )
}

export const SearchPage = () => {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Barchasi')
  const [results, setResults] = useState(DEMO_DATA)
  const [loading, setLoading] = useState(false)
  const [imgErrors, setImgErrors] = useState({})
  const inputRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTimeout(() => setMounted(true), 50)
  }, [])

  const filtered = results.filter(item =>
    activeCategory === 'Barchasi' || item.genres.includes(activeCategory)
  )

  const handleSearch = async () => {
    setLoading(true)
    try {
      const data = await fetchAnime(query)
      setResults(data)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSearch()
    if (e.key === 'Escape') setQuery('')
  }

  const highlight = (text) => {
    if (!query) return text
    const idx = text.toLowerCase().indexOf(query.toLowerCase())
    if (idx === -1) return text
    return (
      <>
        {text.slice(0, idx)}
        <span style={{ color: ACCENT, fontWeight: 600 }}>{text.slice(idx, idx + query.length)}</span>
        {text.slice(idx + query.length)}
      </>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#fff',
      fontFamily: "'Segoe UI', 'Hiragino Sans', sans-serif",
      paddingTop: '100px',
      boxSizing: 'border-box',
      // subtle scanline texture
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)',
    }}>

      {/* CSS animations */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .anime-card {
          animation: fadeSlideIn 0.35s cubic-bezier(.2,.8,.3,1) both;
        }
        .img-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%);
          border-radius: 6px;
        }
        .score-badge {
          position: absolute;
          top: 7px; right: 7px;
          background: rgba(0,0,0,0.75);
          border: 1px solid rgba(255,106,0,0.4);
          border-radius: 4px;
          padding: 2px 6px;
          font-size: 0.72rem;
          font-weight: 700;
          color: ${ACCENT};
          z-index: 2;
          backdrop-filter: blur(4px);
        }
        .card-img {
          width: 100%; height: 100%;
          object-fit: cover;
          border-radius: 6px;
          transition: transform 0.4s cubic-bezier(.2,.8,.3,1);
        }
        .anime-card:hover .card-img { transform: scale(1.04); }
        .genre-tag {
          font-size: 0.65rem;
          padding: 2px 7px;
          border-radius: 3px;
          border: 1px solid rgba(255,106,0,0.2);
          color: rgba(255,106,0,0.7);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .cat-btn {
          background: none;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px;
          padding: 5px 14px;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.4);
          cursor: pointer;
          letter-spacing: 0.03em;
          transition: all 0.15s;
        }
        .cat-btn.active {
          border-color: ${ACCENT};
          color: ${ACCENT};
          background: ${ACCENT_DIM};
        }
        .search-input::placeholder { color: rgba(255,255,255,0.2); }
        .search-btn {
          background: ${ACCENT};
          color: #000;
          border: none;
          border-radius: 6px;
          padding: 10px 20px;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.05em;
          flex-shrink: 0;
          transition: opacity 0.15s, transform 0.1s;
        }
        .search-btn:active { transform: scale(0.96); }
        .search-btn:hover { opacity: 0.85; }
      `}</style>

      <div style={{ width: '95%', margin: '0 auto', padding: '28px 0 80px' }}>

        {/* Header */}
        <div style={{
          marginBottom: '28px',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'none' : 'translateY(-10px)',
          transition: 'opacity 0.4s, transform 0.4s',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '2px' }}>
            <span style={{
              fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase',
              color: ACCENT, fontWeight: 600,
            }}>アニメ</span>
            <span style={{ width: '32px', height: '1px', background: ACCENT, display: 'inline-block', verticalAlign: 'middle', opacity: 0.5 }} />
          </div>
          <h1 style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 800,
            letterSpacing: '-0.025em', lineHeight: 1.15,
            color: '#fff', margin: 0,
          }}>
            Anime <span style={{ color: ACCENT }}>qidirish</span>
          </h1>
        </div>

        {/* Search bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.4s 0.1s',
        }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              ref={inputRef}
              className="search-input"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={handleKey}
              placeholder="Anime nomi yoki janr..."
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.04)',
                border: 'none',
                borderBottom: `1.5px solid ${focused ? ACCENT : 'rgba(255,255,255,0.1)'}`,
                padding: '11px 36px 11px 0',
                fontSize: '0.95rem', color: '#fff',
                outline: 'none', caretColor: ACCENT,
                transition: 'border-color 0.2s',
              }}
            />
            {query && (
              <button onClick={() => { setQuery(''); inputRef.current?.focus() }} style={{
                position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', color: 'rgba(255,255,255,0.25)',
                cursor: 'pointer', fontSize: '0.75rem', padding: '0 4px', lineHeight: 1,
              }}>✕</button>
            )}
          </div>
          <button className="search-btn" onClick={handleSearch}>
            {loading
              ? <span style={{ display: 'inline-block', width: '14px', height: '14px', border: '2px solid #000', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
              : 'Qidirish'}
          </button>
        </div>

        {/* Category filters */}
        <div style={{
          display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '28px',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.4s 0.15s',
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`cat-btn${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >{cat}</button>
          ))}
        </div>

        {/* Result count */}
        {(query || activeCategory !== 'Barchasi') && !loading && (
          <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)', margin: '0 0 16px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {filtered.length} ta natija
          </p>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '16px',
          }}>
            {filtered.map((item, idx) => (
              <div
                key={item.id}
                className="anime-card"
                style={{
                  animationDelay: `${idx * 0.05}s`,
                  cursor: 'pointer',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,106,0,0.35)'
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(255,106,0,0.08)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Image */}
                <div className="img-wrap" style={{ position: 'relative', height: '220px', overflow: 'hidden', borderRadius: '6px 6px 0 0' }}>
                  {!imgErrors[item.id] ? (
                    <img
                      className="card-img"
                      src={item.image}
                      alt={item.title}
                      onError={() => setImgErrors(p => ({ ...p, [item.id]: true }))}
                    />
                  ) : (
                    <div style={{
                      width: '100%', height: '100%',
                      background: 'rgba(255,106,0,0.06)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '2rem',
                    }}>🎌</div>
                  )}
                  <div className="score-badge">{item.score.toFixed(1)}</div>
                </div>

                {/* Info */}
                <div style={{ padding: '10px 10px 12px' }}>
                  <p style={{
                    fontSize: '0.82rem', fontWeight: 600,
                    color: '#fff', margin: '0 0 6px', lineHeight: 1.3,
                    display: '-webkit-box', WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {highlight(item.title)}
                  </p>

                  <StarRating score={item.score} />

                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '7px' }}>
                    {item.genres.slice(0, 2).map(g => (
                      <span key={g} className="genre-tag">{g}</span>
                    ))}
                  </div>

                  <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.25)' }}>
                      {item.episodes} ep · {item.year}
                    </span>
                    <span style={{
                      fontSize: '0.62rem', padding: '1px 6px',
                      borderRadius: '3px',
                      background: item.status === 'Tugagan' ? 'rgba(255,255,255,0.07)' : ACCENT_DIM,
                      color: item.status === 'Tugagan' ? 'rgba(255,255,255,0.3)' : ACCENT,
                      border: `1px solid ${item.status === 'Tugagan' ? 'rgba(255,255,255,0.08)' : 'rgba(255,106,0,0.3)'}`,
                    }}>
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.15)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>(╥_╥)</div>
            <p style={{ fontSize: '0.85rem' }}>Hech narsa topilmadi</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default SearchPage