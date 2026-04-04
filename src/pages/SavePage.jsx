import React, { useEffect, useState } from 'react'

export const SavePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // window.Telegram.WebApp mavjudligini tekshirish
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;

      // initDataUnsafe - xavfsiz emas, faqat ko‘rsatish uchun
      setUser(tg.initDataUnsafe?.user);
    }
    else {
      setUser(
        {
          id: '123456789',
          first_name: 'John',
          last_name: 'Doe',
          username: 'johndoe',
          language_code: 'en'
        }
      )
    }
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{color:'white', padding:'20px', marginTop:'400px'}}>
      <p>ID: {user?.id}</p>
      <p>Name: {user?.first_name} {user?.last_name}</p>
      <p>Username: {user?.username}</p>
      <p>Language: {user?.language_code}</p>
    </div>
  );
}

export default SavePage