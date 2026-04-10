import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



// ─── API CONFIG ────────────────────────────────────────────────
const API_BASE_URL = 'https://zakazlar688user.alwaysdata.net/api/anime'

const fetchAnime = async (query) => {
  const url = query
    ? `${API_BASE_URL}/?q=${encodeURIComponent(query)}`
    : `${API_BASE_URL}/`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`API xatosi: ${res.status}`)
  const json = await res.json()

  // API response: { id, title, description, poster_url, episodes_count }
  return json.map(a => ({
    id: a.id,
    title: a.title,
    image: a.poster_url || '',
    episodes: a.episodes_count ?? 0,
    desc: a.description || '',
  }))
}
// ──────────────────────────────────────────────────────────────

const ACCENT = 'rgb(255, 106, 0)'
const ACCENT_DIM = 'rgba(255, 106, 0, 0.15)'

export const SearchPage = () => {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [imgErrors, setImgErrors] = useState({})
  const [mounted, setMounted] = useState(false)
  const inputRef = useRef(null)

  const navigate = useNavigate()

  

  useEffect(() => {
    setTimeout(() => setMounted(true), 50)
    // Sahifa ochilganda barcha animeni yuklash
    loadAnime('')
  }, [])

  const loadAnime = async (q) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchAnime(q)
      setResults(data)
    } catch (e) {
      console.error(e)
      setError("Ma'lumot yuklanmadi. Tarmoqni tekshiring.")
      setResults([])
    }
    setLoading(false)
  }

  const handleSearch = () => loadAnime(query)

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSearch()
    if (e.key === 'Escape') {
      setQuery('')
      loadAnime('')
    }
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
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)',
    }}>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
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
        .card-img {
          width: 100%; height: 100%;
          object-fit: cover;
          border-radius: 6px;
          transition: transform 0.4s cubic-bezier(.2,.8,.3,1);
        }
        .anime-card:hover .card-img { transform: scale(1.04); }
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
          display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px',
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
              placeholder="Anime nomi yoki ID raqami..."
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
              <button onClick={() => { setQuery(''); loadAnime(''); inputRef.current?.focus() }} style={{
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

        {/* Result count */}
        {!loading && !error && (
          <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)', margin: '0 0 16px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {results.length} ta natija
          </p>
        )}

        {/* Error */}
        {error && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'rgba(255,80,80,0.7)', fontSize: '0.85rem' }}>
            ⚠️ {error}
          </div>
        )}

        {/* Grid */}
        {!loading && !error && results.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '16px',
          }}>
            {results.map((item, idx) => (
              <div
                onClick={() => navigate(`/anime/${item.id}/`)}
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
                  {item.image && !imgErrors[item.id] ? (
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
                  {/* Episode badge */}
                  {item.episodes > 0 && (
                    <div style={{
                      position: 'absolute', top: '7px', right: '7px',
                      background: 'rgba(0,0,0,0.75)',
                      border: '1px solid rgba(255,106,0,0.4)',
                      borderRadius: '4px', padding: '2px 6px',
                      fontSize: '0.72rem', fontWeight: 700, color: ACCENT,
                      zIndex: 2, backdropFilter: 'blur(4px)',
                    }}>
                      {item.episodes} ep
                    </div>
                  )}
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

                  {item.desc && (
                    <p style={{
                      fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)',
                      margin: '0', lineHeight: 1.5,
                      display: '-webkit-box', WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                      {item.desc}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && results.length === 0 && (
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