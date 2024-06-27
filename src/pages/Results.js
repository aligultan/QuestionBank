

import React, { useState, useEffect } from 'react';
import { Table, Typography, Card, message, Popconfirm } from 'antd';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './Results.css';

const { Title } = Typography;

const Results = () => {
  const [solvedExams, setSolvedExams] = useState([]);

  useEffect(() => {
    const storedSolvedExams = JSON.parse(localStorage.getItem('solvedExams')) || [];
    setSolvedExams(storedSolvedExams);
  }, []);

  const handleDelete = (examId) => {
    const updatedExams = solvedExams.filter(exam => exam.examId !== examId);
    setSolvedExams(updatedExams);
    localStorage.setItem('solvedExams', JSON.stringify(updatedExams));
    message.success('Sınav sonucu başarıyla silindi!');
  };

  const columns = [
    {
      title: 'Sınav Kodu',
      dataIndex: 'examCode',
      key: 'examCode',
    },
    {
      title: 'Puan',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'Doğru Cevaplar',
      dataIndex: 'correctAnswers',
      key: 'correctAnswers',
    },
    {
      title: 'Yanlış Cevaplar',
      dataIndex: 'wrongAnswers',
      key: 'wrongAnswers',
    },
    {
      title: 'Tarih',
      dataIndex: 'date',
      key: 'date',
      render: date => new Date(date).toLocaleString(),
    },
    {
      title: 'İşlemler',
      key: 'actions',
      render: (_, record) => (
        <Popconfirm
          title="Bu sınav sonucunu silmek istediğinizden emin misiniz?"
          onConfirm={() => handleDelete(record.examId)}
          okText="Evet"
          cancelText="Hayır"
        >
          <a>Sil</a>
        </Popconfirm>
      ),
    },
  ];

  const examCodes = [...new Set(solvedExams.map(exam => exam.examCode))];

  const chartData = {
    labels: examCodes,
    datasets: [
      {
        label: 'Ortalama Puan',
        data: examCodes.map(code => {
          const exams = solvedExams.filter(exam => exam.examCode === code);
          const totalScore = exams.reduce((acc, curr) => acc + curr.score, 0);
          return totalScore / exams.length;
        }),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="results-container">
      <Title level={2} className="results-title">Çözülen Sınavlar</Title>
      <Table dataSource={solvedExams} columns={columns} rowKey="examId" className="results-table" />
      <Card className="results-chart-card">
        <Title level={3} className="chart-title">Ortalama Puan Grafiği</Title>
        <div className="chart-container">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </Card>
    </div>
  );
};

export default Results;
