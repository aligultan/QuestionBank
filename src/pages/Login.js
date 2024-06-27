import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Form, Input, Typography, message } from "antd";
import { GoogleOutlined, AppleFilled, MailOutlined, LockOutlined } from "@ant-design/icons";
import './Login.css';

const Login = () => {
  const navigate = useNavigate(); 

  const login = (values) => {
    const users = [
      { email: 'a@gmail.com', password: '12345' },
      { email: 'user2@example.com', password: 'password2' },
      { email: 'user3@example.com', password: 'password3' },
      { email: 'user4@example.com', password: 'password4' },
      { email: 'user5@example.com', password: 'password5' },
    ];

    const user = users.find(
      user => user.email === values.myEmail && user.password === values.myPassword
    );

    if (user) {
      message.success('Giriş Başarılı');
      navigate('/home'); 
    } else {
      message.error('Geçersiz kullanıcı adı veya şifre');
    }
  };

  return (
    <div className="appBg">
      <div className="header">
        <h1 className="blur-text">QuestionBank</h1>
      </div>
      <Form className="loginForm" onFinish={login}>
        <Typography.Title level={2} className="title">Hoşgeldiniz!</Typography.Title>
        <Form.Item
          name="myEmail"
          rules={[
            {
              required: true,
              type: "email",
              message: "Lütfen geçerli e-posta adresinizi girin",
            },
          ]}
        >
          <Input 
            prefix={<MailOutlined className="site-form-item-icon" />} 
            placeholder="E-posta adresinizi girin" 
          />
        </Form.Item>
        <Form.Item
          name="myPassword"
          rules={[
            {
              required: true,
              message: "Lütfen şifrenizi girin",
            },
          ]}
        >
          <Input.Password 
            prefix={<LockOutlined className="site-form-item-icon" />} 
            placeholder="Şifrenizi girin" 
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Kullanıcı Girişi
        </Button>
        <Divider style={{ borderColor: "black" }}>or Login with</Divider>
        <div className="socialLogin">
          <GoogleOutlined className="socialIcon" onClick={login} />
          <AppleFilled className="socialIcon" onClick={login} />
        </div>
      </Form>
    </div>
  );
};

export default Login;
