import React from 'react';
import { Card, Typography } from 'antd';
import { LinkedinOutlined, GithubOutlined } from '@ant-design/icons';
import './Team.css';
import teamImage from '../images/image2.png'; 

const { Title, Paragraph } = Typography;

const Team = () => {
  const teamMembers = [
    {
      name: 'Ali Gultan',
      title: 'Software Engineer',
      email: 'aligultanx@gmail.com',
      linkedin: 'https://www.linkedin.com/in/aligultan/',
      github: 'https://github.com/aligultan',
      photo: teamImage
    },
  ];

  return (
    <div className="team-container">
      
      {teamMembers.map((member, index) => (
        <Card key={index} className="team-card">
          <img src={member.photo} alt={member.name} className="team-photo" />
          <Title level={4} className="member-name">{member.name}</Title>
          <Paragraph className="member-title">{member.title}</Paragraph>
          <Paragraph className="member-email">Contact: {member.email}</Paragraph>
          <div className="team-links">
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedinOutlined className="icon" />
            </a>
            <a href={member.github} target="_blank" rel="noopener noreferrer">
              <GithubOutlined className="icon" />
            </a>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Team;
