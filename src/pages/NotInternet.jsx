import React from 'react'
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
const NotInternet = () => {
  return (
    <Result
    style={{background:'#fff'}}
    status="warning"
    title="No Internet Connection"
    extra={
      <Link to='/'>
        <Button >
        Try Again
      </Button>
      </Link>
    }
  />
  )
}

export default NotInternet