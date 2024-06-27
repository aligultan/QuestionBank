import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CreateExam from './pages/CreateExam';
import AddQuestion from './pages/AddQuestion';
import SolveExam from './pages/SolveExam';
import Results from './pages/Results';
import About from './pages/About';
import Contact from './pages/Contact';
import Team from './pages/Team';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-exam" element={<CreateExam />} />
        <Route path="/add-question" element={<AddQuestion />} />
        <Route path="/solve-exam" element={<SolveExam />} />
        <Route path="/results" element={<Results />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<Team />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
