import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './../css/discussion.css'; // Import CSS for styling

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]); // State to store answers
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      try {
        // Fetch question details
        const questionResponse = await axios.get(`http://localhost:3000/questions/${id}`);
        setQuestion(questionResponse.data);

        // Fetch answers related to the question
        const answersResponse = await axios.get(`http://localhost:3000/answers/question/${id}`);
        setAnswers(answersResponse.data); // Ensure this is an array
      } catch (error) {
        setError("Failed to fetch question details or answers");
      }
    };

    fetchQuestionAndAnswers();
  }, [id]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!question) {
    return <div>Loading question...</div>;
  }

  return (
    <div className="question-detail-container">
    <div className="question-header">
      <h1>{question.title}</h1>
      <p>{question.description}</p>
    </div>
    <div className="question-details">
                <p> Views: {question.views} </p>{" "}
                <p> Comments: {question.comments} </p>{" "}
                <p> Upvotes: {question.upvotes} </p>{" "}
              </div>{" "}
    <h2>Answers:</h2>
    {answers.length === 0 ? (
      <p>No answers found for this question.</p>
    ) : (
      <ul className="answer-list">
        {answers.map((answer) => (
          <li key={answer.id} className="answer-item">
            <p>{answer.creator_name}</p>
            <p>{answer.comment}</p>
            <p>Upvotes: {answer.upvotes}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
  
  );
};

export default QuestionDetail;
