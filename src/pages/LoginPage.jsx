import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Form, Input } from 'antd';




export const LoginPage = () => {
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };
  return (
    <Form 

      className='login-form'
      name="login"
      initialValues={{ remember: true }}
      style={{ marginTop: '200px', background: '#000000', padding: '20px', borderRadius: '10px' }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
     

      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Log in
        </Button>

        
      </Form.Item>
    </Form>
  );
}

export default LoginPage
