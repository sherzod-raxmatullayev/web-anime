import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const API_BASE = 'https://zakazlar688user.alwaysdata.net/api/anime'
const ACCENT = 'rgb(255, 106, 0)'
const ACCENT_DIM = 'rgba(255, 106, 0, 0.13)'
const ACCENT_BORDER = 'rgba(255, 106, 0, 0.28)'

const Spinner = ({ size = 22 }) => (
  <span style={{
    width: size, height: size,
    border: '2px solid rgba(255,255,255,0.08)',
    borderTopColor: ACCENT,
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'spin 0.7s linear infinite',
  }} />
)

const PlayerPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const videoRef = useRef(null)

  const [episodes, setEpisodes] = useState([])
  const [activeEp, setActiveEp] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTimeout(() => setMounted(true), 60)
    fetchEpisodes()
  }, [id])

  const fetchEpisodes = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/${id}/episodes/`)
      if (!res.ok) throw new Error(`${res.status}`)
      const data = await res.json()
      setEpisodes(data)
      if (data.length > 0) setActiveEp(data[0])
    } catch (e) {
      setError("Epizodlar yuklanmadi")
    }
    setLoading(false)
  }

  const selectEp = (ep) => {
    setActiveEp(ep)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.play().catch(() => {})
    }
  }

  const activeIndex = episodes.findIndex(e => e.id === activeEp?.id)

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080808',
      color: '#fff',
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      overflowX: 'hidden',
    }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        * { box-sizing: border-box; }
        .player-wrap { animation: scaleIn 0.4s cubic-bezier(.2,.8,.3,1) both; }
        .ep-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 13px 16px;
          border-radius: 12px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: background 0.15s, border-color 0.15s, transform 0.12s;
          animation: fadeUp 0.3s both;
          -webkit-tap-highlight-color: transparent;
          user-select: none;
        }
        .ep-card:active { transform: scale(0.97); }
        .ep-card:hover  { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.07); }
        .ep-card.active { background: ${ACCENT_DIM}; border-color: ${ACCENT_BORDER}; }
        .ep-badge {
          width: 40px; height: 40px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem; font-weight: 800;
          flex-shrink: 0;
          transition: background 0.15s, color 0.15s;
        }
        .ep-card.active  .ep-badge { background: ${ACCENT}; color: #000; }
        .ep-card:not(.active) .ep-badge { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.35); }
        .nav-btn {
          flex: 1;
          padding: 12px 0;
          border-radius: 12px;
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid;
          transition: opacity 0.15s, transform 0.1s;
          letter-spacing: 0.02em;
          -webkit-tap-highlight-color: transparent;
        }
        .nav-btn:active { transform: scale(0.96); }
        .back-btn {
          background: none; border: none;
          color: rgba(255,255,255,0.45);
          cursor: pointer;
          display: flex; align-items: center; gap: 6px;
          font-size: 0.84rem;
          padding: 8px 0;
          -webkit-tap-highlight-color: transparent;
          transition: color 0.15s;
        }
        .back-btn:active { color: ${ACCENT}; }
        .section-label {
          font-size: 0.65rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.22);
          font-weight: 700;
        }
        .live-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: ${ACCENT};
          display: inline-block;
          box-shadow: 0 0 6px ${ACCENT};
          animation: pulse 1.6s ease-in-out infinite;
        }
        .skeleton {
          background: linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 100%);
          background-size: 400px 100%;
          animation: shimmer 1.4s linear infinite;
          border-radius: 12px;
        }
        @keyframes shimmer {
          from { background-position: -400px 0; }
          to   { background-position: 400px 0; }
        }
      `}</style>

      {/* ── STICKY TOP NAV ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(8,8,8,0.90)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '0 20px',
        height: '54px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.3s',
      }}>
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Orqaga
        </button>

        <span style={{ fontSize: '0.75rem', letterSpacing: '0.18em', color: ACCENT, fontWeight: 700 }}>
          アニメ
        </span>

        <div style={{ minWidth: 60, textAlign: 'right' }}>
          {loading
            ? <Spinner size={15} />
            : activeEp && (
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.22)' }}>
                {activeIndex + 1} / {episodes.length}
              </span>
            )
          }
        </div>
      </div>

      {/* ── VIDEO PLAYER ── */}
      <div className="player-wrap" style={{
        position: 'relative',
        background: '#000',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.4s 0.1s',
      }}>
        {/* Orange glow behind video */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 100%, rgba(255,106,0,0.10) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        <div style={{
          position: 'relative', zIndex: 1,
          aspectRatio: '16/9',
        }}>
          {activeEp?.video_url ? (
            <video
              ref={videoRef}
              key={activeEp.id}
              controls
              autoPlay
              playsInline
              style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }}
            >
              <source src={activeEp.video_url} type="video/mp4" />
            </video>
          ) : (
            <div style={{
              width: '100%', height: '100%', minHeight: '56vw',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '14px', color: 'rgba(255,255,255,0.15)',
            }}>
              {loading
                ? <Spinner size={32} />
                : <><span style={{ fontSize: '2.4rem' }}>🎌</span><span style={{ fontSize: '0.82rem' }}>Video topilmadi</span></>
              }
            </div>
          )}
        </div>
      </div>

      {/* ── ACTIVE EP INFO + NAV BUTTONS ── */}
      {activeEp && !loading && (
        <div style={{
          padding: '18px 20px 0',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.4s 0.18s',
        }}>
          {/* EP chip + progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span style={{
              background: ACCENT, color: '#000',
              fontSize: '0.65rem', fontWeight: 900,
              padding: '4px 10px', borderRadius: '6px',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              flexShrink: 0,
            }}>
              EP {activeEp.title}
            </span>
            {/* mini progress bar */}
            <div style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,0.07)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${((activeIndex + 1) / episodes.length) * 100}%`,
                background: ACCENT,
                borderRadius: '2px',
                transition: 'width 0.4s ease',
              }} />
            </div>
            <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', flexShrink: 0 }}>
              {activeIndex + 1}/{episodes.length}
            </span>
          </div>

          {/* Prev / Next */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              className="nav-btn"
              disabled={activeIndex <= 0}
              onClick={() => activeIndex > 0 && selectEp(episodes[activeIndex - 1])}
              style={{
                background: activeIndex > 0 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
                borderColor: activeIndex > 0 ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
                color: activeIndex > 0 ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.15)',
                textAlign: 'center',
              }}
            >← Oldingi</button>

            <button
              className="nav-btn"
              disabled={activeIndex >= episodes.length - 1}
              onClick={() => activeIndex < episodes.length - 1 && selectEp(episodes[activeIndex + 1])}
              style={{
                background: activeIndex < episodes.length - 1 ? ACCENT_DIM : 'rgba(255,255,255,0.02)',
                borderColor: activeIndex < episodes.length - 1 ? ACCENT_BORDER : 'rgba(255,255,255,0.04)',
                color: activeIndex < episodes.length - 1 ? ACCENT : 'rgba(255,255,255,0.15)',
                textAlign: 'center',
              }}
            >Keyingi →</button>
          </div>
        </div>
      )}

      {/* ── ERROR ── */}
      {error && (
        <div style={{
          margin: '16px 20px 0', padding: '14px 16px', borderRadius: '12px',
          background: 'rgba(255,50,50,0.07)', border: '1px solid rgba(255,50,50,0.18)',
          color: 'rgba(255,110,110,0.85)', fontSize: '0.82rem',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* ── EPISODES LIST ── */}
      <div style={{
        padding: '28px 20px 100px',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.4s 0.22s',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '12px',
        }}>
          <span className="section-label">Barcha epizodlar</span>
          {!loading && episodes.length > 0 && (
            <span style={{
              fontSize: '0.65rem', padding: '3px 10px',
              background: ACCENT_DIM, color: ACCENT,
              border: `1px solid ${ACCENT_BORDER}`,
              borderRadius: '20px', fontWeight: 700,
            }}>
              {episodes.length} ta
            </span>
          )}
        </div>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '12px' }} />

        {/* Skeletons */}
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[1,2,3,4].map(i => (
              <div key={i} className="skeleton" style={{
                height: '66px',
                animationDelay: `${i * 0.1}s`,
              }} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && episodes.length === 0 && !error && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.12)' }}>
            <div style={{ fontSize: '2.6rem', marginBottom: '12px' }}>📭</div>
            <p style={{ fontSize: '0.82rem', margin: 0 }}>Epizod mavjud emas</p>
          </div>
        )}

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {episodes.map((ep, idx) => {
            const isActive = activeEp?.id === ep.id
            return (
              <div
                key={ep.id}
                className={`ep-card${isActive ? ' active' : ''}`}
                style={{ animationDelay: `${idx * 0.04}s` }}
                onClick={() => selectEp(ep)}
              >
                {/* Number badge */}
                <div className="ep-badge">{ep.title}</div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: '0.88rem',
                    fontWeight: isActive ? 700 : 400,
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                    marginBottom: isActive ? '4px' : 0,
                  }}>
                    {idx + 1}-epizod
                  </div>
                  {isActive && (
                    <div style={{
                      fontSize: '0.68rem', color: ACCENT,
                      display: 'flex', alignItems: 'center', gap: '5px',
                    }}>
                      <span className="live-dot" />
                      Hozir ijro etilmoqda
                    </div>
                  )}
                </div>

                {/* Right icon */}
                {isActive ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9.5" stroke={ACCENT} strokeOpacity="0.35"/>
                    <path d="M8 7L14 10L8 13V7Z" fill={ACCENT}/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 5L11 8L6 11V5Z" fill="rgba(255,255,255,0.18)"/>
                  </svg>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PlayerPage