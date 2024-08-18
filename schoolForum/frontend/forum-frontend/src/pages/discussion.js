import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './../css/discussion.css'; // Import CSS for styling

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]); // State to store answers
  const [error, setError] = useState(null);
  const [comment, setComment] = useState(''); // State for new answer comment
  const [success, setSuccess] = useState(null); // State for success message

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert id to integer before sending
    const questionIdInt = parseInt(id, 10);

    try {
      await axios.post('http://localhost:3000/answers', {
        creator_id: 4,
        question_id: questionIdInt, // Ensure question_id is an integer
        comment,
        upvotes: 0,
      });

      setSuccess('Answer posted successfully!');
      setComment('');

      // Fetch updated answers
      const answersResponse = await axios.get(`http://localhost:3000/answers/question/${questionIdInt}`);
      setAnswers(answersResponse.data);
    } catch (err) {
      setError('Failed to post answer');
    }
  };

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
        <p>Views: {question.views}</p>
        <p>Comments: {question.comments}</p>
        <p>Upvotes: {question.upvotes}</p>
      </div>
      <h2>Answers:</h2>
      {answers.length === 0 ? (
        <p>No answers found for this question.</p>
      ) : (
        <ul className="answer-list">
          {answers.map((answer) => (
            <li key={answer.id} className="answer-item">
              <p className="answer-creator-name">{answer.creator_name}</p>
              <p>{answer.comment}</p>
              <p>Upvotes: {answer.upvotes}</p>
            </li>
          ))}
        </ul>
      )}
      <div className="post-answer-container">
        <h2>Post a New Answer</h2>
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          <button type="submit">Post Answer</button>
        </form>
      </div>
    </div>
  );
};

export default QuestionDetail;
