import { Button, Flex } from 'antd'
import React from 'react'

export const ProfilPage = () => {
  return (
    <div className="profil">
      <div className="profil-con">
        <img src="https://web.tlgrm.app/icon-192x192.png" alt="" className="profil-img" />
        <h3>Your name</h3>
        <div className="profil-config">
          <p className="telegram">Your Telegram username</p>
        </div>
      </div>
      <Button color="danger" variant="dashed"  style={{marginTop:'20px', background:'black'}}>
        Log out
          </Button>
    </div>
  )
}

export default ProfilPage