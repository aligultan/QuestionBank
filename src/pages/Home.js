import React, { useState } from 'react';
import { Layout, Menu, Switch, Card, Typography } from 'antd';
import { 
  UserOutlined, 
  LogoutOutlined, 
  SettingOutlined, 
  FileAddOutlined, 
  MenuOutlined, 
  BarChartOutlined, 
  InfoCircleOutlined, 
  ContactsOutlined, 
  TeamOutlined, 
  EditOutlined, 
  CheckCircleOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');

  const handleLogout = () => {
    navigate('/login');
  };

  const toggleTheme = (checked) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <Layout style={{ minHeight: '100vh' }} theme={theme}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
        onMouseEnter={() => {
          document.getElementById('sider-menu').style.width = '200px';
        }}
        onMouseLeave={() => {
          document.getElementById('sider-menu').style.width = '80px';
        }}
        style={{ width: '80px' }}
        id="sider-menu"
        theme={theme}
      >
        <div className="logo">QuestionBank</div>
        <Menu theme={theme} mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />} onClick={() => navigate('/profile')}>
            Profil
          </Menu.Item>
          <Menu.Item key="2" icon={<MenuOutlined />} >
            Menü
          </Menu.Item>
          <Menu.Item key="3" icon={<EditOutlined />} onClick={() => navigate('/add-question')}>
            Soru Oluştur
          </Menu.Item>
          <Menu.Item key="4" icon={<FileAddOutlined />} onClick={() => navigate('/create-exam')}>
            Sınav Oluştur
          </Menu.Item>
          <Menu.Item key="5" icon={<CheckCircleOutlined />} onClick={() => navigate('/solve-exam')}>
            Sınav Çöz
          </Menu.Item>
          <Menu.Item key="6" icon={<BarChartOutlined />} onClick={() => navigate('/results')}>
            Sonuçlar
          </Menu.Item>
          <Menu.Item key="7" icon={<InfoCircleOutlined />} onClick={() => navigate('/about')}>
            Hakkımızda
          </Menu.Item>
          <Menu.Item key="8" icon={<ContactsOutlined />} onClick={() => navigate('/contact')}>
            İletişim
          </Menu.Item>
          <Menu.Item key="9" icon={<TeamOutlined />} onClick={() => navigate('/team')}>
            Ekibimiz
          </Menu.Item>
          <Menu.Item key="10" icon={<SettingOutlined />} onClick={() => navigate('/settings')}>
            Ayarlar
          </Menu.Item>
          <Menu.Item key="11" disabled>
            Tema
            <Switch 
              checkedChildren="Dark" 
              unCheckedChildren="Light" 
              onChange={toggleTheme} 
              style={{ marginLeft: '10px' }} 
              checked={theme === 'dark'}
            />
          </Menu.Item>
        </Menu>
        <Menu theme={theme} mode="inline" style={{ marginTop: 'auto' }}>
          <Menu.Item key="12" icon={<LogoutOutlined />} onClick={handleLogout}>
            Çıkış Yap
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
          <Menu mode="horizontal" theme={theme} style={{ justifyContent: 'flex-end' }}>
            <Menu.Item key="1" onClick={() => navigate('/about')}>
              Hakkımızda
            </Menu.Item>
            <Menu.Item key="2" onClick={() => navigate('/contact')}>
              İletişim
            </Menu.Item>
            <Menu.Item key="3" onClick={() => navigate('/team')}>
              Ekibimiz
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <div className="home-title">
              <Title level={2} className="slogan" style={{ color: '#FFFFFF' }}>Welcome to QuestionBank!</Title>
            </div>
            <div className="card-container">
              <Card
                className="home-card"
                onClick={() => navigate('/add-question')}
              >
                <Title level={3} className="card-title">Soru Oluştur</Title>
                <Text className="card-text">Soru eklemek için tıklayın</Text>
              </Card>
              <Card
                className="home-card"
                onClick={() => navigate('/create-exam')}
              >
                <Title level={3} className="card-title">Sınav Oluştur</Title>
                <Text className="card-text">Sınav eklemek için tıklayın</Text>
              </Card>
              <Card
                className="home-card"
                onClick={() => navigate('/solve-exam')}
              >
                <Title level={3} className="card-title">Sınav Çöz</Title>
                <Text className="card-text">Sınavları çözmek için tıklayın</Text>
              </Card>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
