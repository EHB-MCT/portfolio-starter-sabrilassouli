import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./../css/courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/courses");
        setCourses(response.data);
      } catch (error) {
        setError("Failed to fetch courses");
      }
    };

    fetchCourses();
  }, []);

  if (error) {
    return <div className="error-message"> {error} </div>;
  }

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="courses-container">
      <h1 className="courses-title"> Courses </h1>{" "}
      <ul className="courses-list">
        {" "}
        {courses.map((course) => (
          <li key={course.id} className="course-item">
            <button
              className="course-button"
              onClick={() => handleCourseClick(course.id)}
            >
              {" "}
              {course.name}{" "}
            </button>{" "}
          </li>
        ))}{" "}
      </ul>{" "}
    </div>
  );
};

export default Courses;
