import React from 'react';
import { Card, Typography } from 'antd';
import './About.css';

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div className="about-container">
      <Card className="about-card">
        <Title level={2}>Hakkımızda</Title>
        <Paragraph>
          Soru Bankası, öğrencilere çeşitli konularda pratik yapma imkanı sunan modern bir online eğitim platformudur.
          Amacımız, öğrencilere sınavlara hazırlık sürecinde destek olmak ve onların başarılarını artırmaktır.
        </Paragraph>
      </Card>
    </div>
  );
};

export default About;
