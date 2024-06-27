import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Radio, List } from 'antd';
import './AddQuestion.css';

const AddQuestion = () => {
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    setQuestions(storedQuestions);
  }, []);

  const onFinish = (values) => {
    const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    const newQuestion = {
      id: editingQuestion ? editingQuestion.id : storedQuestions.length + 1,
      question: values.question,
      options: {
        A: values.optionA,
        B: values.optionB,
        C: values.optionC,
        D: values.optionD,
      },
      correctAnswer: values.correctAnswer,
    };

    if (editingQuestion) {
      const updatedQuestions = storedQuestions.map(q =>
        q.id === editingQuestion.id ? newQuestion : q
      );
      localStorage.setItem('questions', JSON.stringify(updatedQuestions));
      setQuestions(updatedQuestions);
      setEditingQuestion(null);
    } else {
      storedQuestions.push(newQuestion);
      localStorage.setItem('questions', JSON.stringify(storedQuestions));
      setQuestions(storedQuestions);
    }

    message.success('Soru başarıyla kaydedildi!');
    form.resetFields();
  };

  const editQuestion = (question) => {
    setEditingQuestion(question);
    form.setFieldsValue({
      question: question.question,
      optionA: question.options.A,
      optionB: question.options.B,
      optionC: question.options.C,
      optionD: question.options.D,
      correctAnswer: question.correctAnswer,
    });
  };

  const deleteQuestion = (questionId) => {
    const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    const updatedQuestions = storedQuestions.filter(q => q.id !== questionId);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
    setQuestions(updatedQuestions);
    message.success('Soru başarıyla silindi!');
  };

  return (
    <div className="add-question-container">
      <h1>Soru Oluştur</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="question"
          label="Soru"
          rules={[{ required: true, message: 'Lütfen soruyu girin!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="optionA"
          label="A Seçeneği"
          rules={[{ required: true, message: 'Lütfen A seçeneğini girin!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="optionB"
          label="B Seçeneği"
          rules={[{ required: true, message: 'Lütfen B seçeneğini girin!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="optionC"
          label="C Seçeneği"
          rules={[{ required: true, message: 'Lütfen C seçeneğini girin!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="optionD"
          label="D Seçeneği"
          rules={[{ required: true, message: 'Lütfen D seçeneğini girin!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="correctAnswer"
          label="Doğru Cevap"
          rules={[{ required: true, message: 'Lütfen doğru cevabı seçin!' }]}
        >
          <Radio.Group>
            <Radio value="A">A</Radio>
            <Radio value="B">B</Radio>
            <Radio value="C">C</Radio>
            <Radio value="D">D</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editingQuestion ? 'Güncelle' : 'Soru Ekle'}
          </Button>
          {editingQuestion && (
            <Button
              style={{ marginLeft: '8px' }}
              onClick={() => {
                form.resetFields();
                setEditingQuestion(null);
              }}
            >
              İptal
            </Button>
          )}
        </Form.Item>
      </Form>
      <List
        itemLayout="horizontal"
        dataSource={questions}
        renderItem={item => (
          <List.Item
            actions={[
              <Button onClick={() => editQuestion(item)}>Düzenle</Button>,
              <Button danger onClick={() => deleteQuestion(item.id)}>Sil</Button>
            ]}
          >
            <List.Item.Meta
              title={item.question}
              description={`A: ${item.options.A}, B: ${item.options.B}, C: ${item.options.C}, D: ${item.options.D}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default AddQuestion;
