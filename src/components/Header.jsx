import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header-con'>
        <div className="header">
            <Link className='logotip' to="/"><p>Fox <span>tv</span></p></Link>
            <img className='my-logo rotating-img' style={{height: '90%'}} src="/logo_color_transparent.png" alt="" />

        </div>
    </div>
  )
}

export default Header