import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Courses from './pages/home';
import CourseDetail from './pages/questions';
import QuestionDetail from "./pages/discussion";
import Header from './pages/header';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/questions/:id" element={<QuestionDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
