import React, { useState, useEffect } from 'react';
import { Form, Radio, Button, message } from 'antd';
import './SolveExam.css';

const SolveExam = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    const storedExams = JSON.parse(localStorage.getItem('exams')) || [];
    setExams(storedExams);
  }, []);

  const startExam = (examId) => {
    const exam = exams.find(e => e.id === examId);
    setSelectedExam(exam);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setScore(null);
  };

  const handleAnswerChange = (e) => {
    setAnswers({ ...answers, [currentQuestionIndex]: e.target.value });
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const prevQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const submitExam = () => {
    let totalScore = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;

    selectedExam.questions.forEach((q, index) => {
      const question = JSON.parse(localStorage.getItem('questions')).find(qu => qu.id === q.id);
      if (question.correctAnswer === answers[index]) {
        totalScore += q.points;
        correctAnswers += 1;
      } else {
        wrongAnswers += 1;
      }
    });

    setScore(totalScore);
    message.success(`Sınav tamamlandı! Toplam puanınız: ${totalScore}`);

    // Sınav sonuçlarını kaydetme
    const solvedExams = JSON.parse(localStorage.getItem('solvedExams')) || [];
    solvedExams.push({
      examId: selectedExam.id,
      examCode: selectedExam.examCode,
      score: totalScore,
      correctAnswers,
      wrongAnswers,
      date: new Date().toISOString()
    });
    localStorage.setItem('solvedExams', JSON.stringify(solvedExams));
  };

  if (!selectedExam) {
    return (
      <div className="solve-exam-container">
        <h1 className="solve-exam-title">Sınav Çöz</h1>
        {exams.length === 0 ? (
          <p>Hiç sınav bulunmamaktadır.</p>
        ) : (
          <div className="exam-cards">
            {exams.map(exam => (
              <div key={exam.id} className="exam-card" onClick={() => startExam(exam.id)}>
                <h4>{exam.examName}</h4>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const currentQuestion = JSON.parse(localStorage.getItem('questions')).find(q => q.id === selectedExam.questions[currentQuestionIndex].id);

  return (
    <div className="solve-exam-container">
      <h1 className="solve-exam-title">{selectedExam.examName}</h1>
      {score === null ? (
        <div className="question-card">
          <h4>{currentQuestion.question}</h4>
          <Form>
            <Form.Item className="question-options">
              <Radio.Group onChange={handleAnswerChange} value={answers[currentQuestionIndex]}>
                <Radio className="question-option" value="A">A) {currentQuestion.options.A}</Radio>
                <Radio className="question-option" value="B">B) {currentQuestion.options.B}</Radio>
                <Radio className="question-option" value="C">C) {currentQuestion.options.C}</Radio>
                <Radio className="question-option" value="D">D) {currentQuestion.options.D}</Radio>
              </Radio.Group>
            </Form.Item>
            <div className="navigation-buttons">
              {currentQuestionIndex > 0 && <Button onClick={prevQuestion}>Önceki</Button>}
              {currentQuestionIndex < selectedExam.questions.length - 1 && (
                <Button type="primary" onClick={nextQuestion}>
                  Sonraki
                </Button>
              )}
              {currentQuestionIndex === selectedExam.questions.length - 1 && (
                <Button type="primary" onClick={submitExam}>
                  Sınavı Bitir
                </Button>
              )}
            </div>
          </Form>
        </div>
      ) : (
        <h2>Toplam Puan: {score}</h2>
      )}
    </div>
  );
};

export default SolveExam;
