import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./../css/questions.css"; // Import the CSS file

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [questions, setQuestions] = useState([]); // State to store questions
  const [error, setError] = useState(null);

  useEffect(() => {
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
        setQuestions(questionsResponse.data); // Ensure this is an array
      } catch (error) {
        setError("Failed to fetch course or questions");
      }
    };

    fetchCourseAndQuestions();
  }, [id]);

  if (error) {
    return <div> {error} </div>;
  }

  if (!course) {
    return <div> Loading course... </div>;
  }

  return (
    <div className="course-detail-container">
      <div className="course-header">
        <h1> {course.name} </h1> <p> {course.description} </p>{" "}
        <p> Teacher: {course.teacher} </p>{" "}
      </div>{" "}
      <h2> Questions for this Course: </h2>{" "}
      {questions.length === 0 ? (
        <p> No questions found for this course. </p>
      ) : (
        <ul className="question-list">
          {" "}
          {questions.map((question) => (
            <li key={question.id} className="question-item">
              <strong> {question.title} </strong>{" "}
              <p> {question.description} </p>{" "}
              <div className="question-details">
                <p> Views: {question.views} </p>{" "}
                <p> Comments: {question.comments} </p>{" "}
                <p> Upvotes: {question.upvotes} </p>{" "}
                <Link to={`/questions/${question.id}`}> View Details </Link>{" "}
              </div>{" "}
            </li>
          ))}{" "}
        </ul>
      )}{" "}
    </div>
  );
};

export default CourseDetail;
