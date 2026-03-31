import { Button, Flex } from 'antd'
import React, { useEffect, useState } from 'react'

export const ProfilPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;

      // Telegramdan kelgan user
      const tgUser = tg.initDataUnsafe?.user;

      if (tgUser) {
        setUser(tgUser);
      }
    } else {
      // fallback (local test uchun)
      setUser({
        id: '123456789',
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        language_code: 'en'
      });
    }
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profil">
      <div className="profil-con">
        <img 
          src={user.photo_url || "https://web.tlgrm.app/icon-192x192.png"} 
          alt="" 
          className="profil-img" 
        />

        <h3>{user.first_name} {user.last_name}</h3>

        <div className="profil-config">
          <p className="telegram">
            @{user.username || "no_username"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfilPage