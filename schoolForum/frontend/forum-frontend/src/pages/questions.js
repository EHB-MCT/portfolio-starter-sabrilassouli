import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./../css/questions.css";
import Cookies from "js-cookie";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNewQuestionForm, setShowNewQuestionForm] = useState(false);

  const userId = Cookies.get("userId");
  console.log("User ID from cookie:", userId);

  useEffect(() => {
    const checkUserLoginStatus = () => {
      if (userId) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    const fetchCourseAndQuestions = async () => {
      try {
        // Fetch course details
        const courseResponse = await axios.get(
          `http://localhost:3000/courses/${id}`
        );
        setCourse(courseResponse.data);

        // Fetch questions related to the course
        const questionsResponse = await axios.get(
          `http://localhost:3000/questions/course/${id}`
        );
        setQuestions(questionsResponse.data);
      } catch (error) {
        setError("Failed to fetch course or questions");
      }
    };

    checkUserLoginStatus();
    fetchCourseAndQuestions();
  }, [id, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError("You must be logged in to ask a question.");
      return;
    }

    const creatorId = parseInt(userId, 10); // Convert userId to integer
    const courseId = parseInt(id, 10); // Convert userId to integer

    if (isNaN(creatorId) || creatorId <= 0) {
      setError("Invalid creator_id.");
      return;
    }
    console.log("Payload creator_id type:", typeof creatorId); // Log type

    try {
      const response = await axios.post("http://localhost:3000/questions", {
        creator_id: creatorId, // Ensure this is an integer
        course_id: courseId,
        title,
        description,
        views: 0,
        comments: 0,
        upvotes: 0,
      });

      console.log("Question posted successfully:", response.data);
      setSuccess("Question posted successfully!");
      setTitle("");
      setDescription("");
      setShowNewQuestionForm(false);
    } catch (err) {
      console.error(
        "Failed to post question:",
        err.response?.data || err.message
      );
      setError(err.response?.data?.error || "Failed to post question.");
    }
  };

  const handleNewQuestionClick = () => {
    setShowNewQuestionForm(true);
  };
  const handleNoNewQuestionClick = () => {
    setShowNewQuestionForm(false);
  };

  return (
    <div className="course-detail-container">
      <div className="course-header">
        {course ? (
          <>
            <h1>{course.name}</h1>
            <p>{course.description}</p>
            <p>Teacher: {course.teacher}</p>
          </>
        ) : (
          <p>Loading course details...</p>
        )}
      </div>

      <h2>Questions for this Course:</h2>
      {isLoggedIn ? (
        <button
          className="ask-question-button"
          onClick={handleNewQuestionClick}
        >
          Ask a Question
        </button>
      ) : (
        <p>Log in to ask a question</p>
      )}

      {questions.length === 0 ? (
        <p>No questions found for this course.</p>
      ) : (
        <ul className="question-list">
          {questions.map((question) => (
            <li key={question.id} className="question-item">
              <strong>{question.title}</strong>
              <p>{question.description}</p>
              <div className="question-details">
                <p>Views: {question.views}</p>
                <p>Comments: {question.comments}</p>
                <p>Upvotes: {question.upvotes}</p>
                <Link to={`/questions/${question.id}`}>View Details</Link>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showNewQuestionForm && (
        <div className="post-question-container">
          <h2>Ask a Question</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <button type="submit">Submit</button>
            <button onClick={handleNoNewQuestionClick}>Cancel</button>
            {success && <div className="success">{success}</div>}
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
