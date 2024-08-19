import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./../css/discussion.css";

import Cookies from "js-cookie";

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState(null);

  var creatorId = 7;

  const userId = Cookies.get("userId");
  console.log("User ID from cookie:", userId);

  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      try {
        // Fetch question details
        const questionResponse = await axios.get(
          `http://localhost:3000/questions/${id}`
        );
        setQuestion(questionResponse.data);

        // Fetch answers related to the question
        const answersResponse = await axios.get(
          `http://localhost:3000/answers/question/${id}`
        );
        setAnswers(answersResponse.data); // Ensure this is an array

        // Increment views for the question
        await incrementViews(id);
      } catch (error) {
        setError("Failed to fetch question details or answers");
      }
    };

    fetchQuestionAndAnswers();
  }, [id]);

  const incrementViews = async (questionId) => {
    try {
      await axios.put(
        `http://localhost:3000/questions/${questionId}/increment-views`
      );
    } catch (error) {
      console.error("Error incrementing views:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError("You must be logged in to ask a question.");
      return;
    }

    const posterId = parseInt(userId, 10);
    console.log("here is the poster id");
    console.log(posterId);
    creatorId = posterId;
    const questionId = parseInt(id, 10); // Convert userId to integer

    console.log("here is the creator id");
    console.log(creatorId);

    try {
      await axios.post("http://localhost:3000/answers", {
        creator_id: creatorId,
        question_id: questionId,
        comment,
        upvotes: 0,
      });

      setSuccess("Answer posted successfully!");
      setComment("");
      // Fetch updated answers list

      const thequestionId = parseInt(id, 10);
      await axios.put(
        `http://localhost:3000/questions/${thequestionId}/increment-comments`
      );

      window.location.reload();
    } catch (err) {
      setError("Failed to post answer");
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
