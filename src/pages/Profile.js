import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './Profile.css';

const { Title } = Typography;

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    surname: '',
    phone: '',
    address: '',
    email: '',
    photo: null
  });
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('profile')) || {};
    setProfile(storedProfile);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleSubmit = () => {
    localStorage.setItem('profile', JSON.stringify(profile));
    message.success('Profil bilgileri güncellendi!');
  };

  const handleUploadChange = ({ fileList }) => {
    if (fileList.length > 0) {
      const file = fileList[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile({
          ...profile,
          photo: e.target.result
        });
      };
      reader.readAsDataURL(file.originFileObj);
    }
    setFileList(fileList);
  };

  return (
    <div className="profile-container">
      <Card className="profile-card" bordered={false}>
        <Title level={2} className="profile-title">Profil Bilgileri</Title>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Ad" required>
            <Input name="name" value={profile.name} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Soyad" required>
            <Input name="surname" value={profile.surname} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Telefon" required>
            <Input name="phone" value={profile.phone} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Adres" required>
            <Input name="address" value={profile.address} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Email" required>
            <Input name="email" value={profile.email} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Resim Yükle" required>
            <Upload
              listType="picture"
              fileList={fileList}
              onChange={handleUploadChange}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Dosya Seç</Button>
            </Upload>
            {profile.photo && (
              <img src={profile.photo} alt="Profile" style={{ width: '100px', marginTop: '10px' }} />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Bilgileri Güncelle
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;
