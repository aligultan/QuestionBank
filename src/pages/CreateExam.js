import React, { useState, useEffect } from 'react';
import { Form, Input, Button, List, InputNumber, message, TimePicker } from 'antd';
import moment from 'moment';
import './CreateExam.css';

const CreateExam = () => {
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [questionPoints, setQuestionPoints] = useState({});
  const [totalPoints, setTotalPoints] = useState(0);
  const [editingExam, setEditingExam] = useState(null);

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    const storedExams = JSON.parse(localStorage.getItem('exams')) || [];
    setQuestions(storedQuestions);
    setExams(storedExams);
  }, []);

  const handleQuestionSelect = (questionId, checked) => {
    let newSelectedQuestions = [...selectedQuestions];
    if (checked) {
      newSelectedQuestions.push(questionId);
    } else {
      newSelectedQuestions = newSelectedQuestions.filter(id => id !== questionId);
    }
    setSelectedQuestions(newSelectedQuestions);
    updateTotalPoints(newSelectedQuestions, questionPoints);
  };

  const handlePointsChange = (value, questionId) => {
    const newQuestionPoints = { ...questionPoints, [questionId]: value };
    setQuestionPoints(newQuestionPoints);
    updateTotalPoints(selectedQuestions, newQuestionPoints);
  };

  const updateTotalPoints = (questions, points) => {
    const total = questions.reduce((acc, curr) => acc + (points[curr] || 0), 0);
    setTotalPoints(total);
  };

  const onFinish = (values) => {
    if (totalPoints > 100) {
      message.error('Toplam puan 100\'ü geçemez!');
      return;
    }

    const newExam = {
      id: editingExam ? editingExam.id : exams.length + 1,
      examName: values.examName,
      examCode: values.examCode,
      questions: selectedQuestions.map(questionId => ({
        id: questionId,
        points: questionPoints[questionId] || 0,
      })),
      duration: values.duration.format('HH:mm:ss'),
    };

    if (editingExam) {
      const updatedExams = exams.map(exam =>
        exam.id === editingExam.id ? newExam : exam
      );
      localStorage.setItem('exams', JSON.stringify(updatedExams));
      setExams(updatedExams);
      setEditingExam(null);
    } else {
      const updatedExams = [...exams, newExam];
      localStorage.setItem('exams', JSON.stringify(updatedExams));
      setExams(updatedExams);
    }

    message.success('Sınav başarıyla kaydedildi!');
    form.resetFields();
    setSelectedQuestions([]);
    setQuestionPoints({});
    setTotalPoints(0);
  };

  const editExam = (exam) => {
    setEditingExam(exam);
    form.setFieldsValue({
      examName: exam.examName,
      examCode: exam.examCode,
      duration: moment(exam.duration, 'HH:mm:ss'),
    });
    const questionPoints = {};
    exam.questions.forEach(q => {
      questionPoints[q.id] = q.points;
    });
    setQuestionPoints(questionPoints);
    setSelectedQuestions(exam.questions.map(q => q.id));
  };

  const deleteExam = (examId) => {
    const updatedExams = exams.filter(exam => exam.id !== examId);
    localStorage.setItem('exams', JSON.stringify(updatedExams));
    setExams(updatedExams);
    message.success('Sınav başarıyla silindi!');
  };

  return (
    <div className="create-exam-container">
      <h1>Sınav Oluştur</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="examName"
          label="Sınav Adı"
          rules={[{ required: true, message: 'Lütfen sınav adını girin!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="examCode"
          label="Sınav Kodu"
          rules={[{ required: true, message: 'Lütfen sınav kodunu girin!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="duration"
          label="Sınav Süresi"
          rules={[{ required: true, message: 'Lütfen sınav süresini girin!' }]}
        >
          <TimePicker format="HH:mm" defaultValue={moment('00:30', 'HH:mm')} />
        </Form.Item>
        <Form.Item
          name="questions"
          label="Sorular"
          rules={[{ required: true, message: 'Lütfen soruları seçin!' }]}
        >
          <List
            dataSource={questions}
            renderItem={question => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <div>
                      <input
                        type="checkbox"
                        checked={selectedQuestions.includes(question.id)}
                        onChange={(e) => handleQuestionSelect(question.id, e.target.checked)}
                      />
                      {question.question}
                    </div>
                  }
                  description={
                    <InputNumber
                      min={0}
                      max={100}
                      placeholder="Puan"
                      value={questionPoints[question.id]}
                      onChange={(value) => handlePointsChange(value, question.id)}
                      style={{ marginLeft: '10px' }}
                      disabled={!selectedQuestions.includes(question.id)}
                      type="number" // Sadece sayısal girişleri kabul etmek için
                    />
                  }
                />
              </List.Item>
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editingExam ? 'Güncelle' : 'Sınav Ekle'}
          </Button>
          {editingExam && (
            <Button
              style={{ marginLeft: '8px' }}
              onClick={() => {
                form.resetFields();
                setEditingExam(null);
                setSelectedQuestions([]);
                setQuestionPoints({});
                setTotalPoints(0);
              }}
            >
              İptal
            </Button>
          )}
        </Form.Item>
      </Form>
      <List
        itemLayout="horizontal"
        dataSource={exams}
        renderItem={item => (
          <List.Item
            actions={[
              <Button onClick={() => editExam(item)}>Düzenle</Button>,
              <Button danger onClick={() => deleteExam(item.id)}>Sil</Button>
            ]}
          >
            <List.Item.Meta
              title={item.examName}
              description={`Sınav Kodu: ${item.examCode}, Süre: ${item.duration}`}
            />
          </List.Item>
        )}
      />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        Toplam Puan: {totalPoints}
      </div>
    </div>
  );
};

export default CreateExam;
