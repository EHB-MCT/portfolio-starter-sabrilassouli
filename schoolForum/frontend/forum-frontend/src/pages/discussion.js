import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./../css/discussion.css";

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/questions/${id}`
        );
        setQuestion(response.data);
      } catch (error) {
        setError("Failed to fetch question details");
      }
    };

    fetchQuestion();
  }, [id]);

  if (error) {
    return <div className="error"> {error} </div>;
  }

  if (!question) {
    return <div className="loading"> Loading question... </div>;
  }

  return (
    <div className="container">
      <div className="header">
        <h1> {question.title} </h1>{" "}
      </div>{" "}
      <div className="content">
        <p> {question.description} </p>{" "}
        <div className="stats">
          <p>
            {" "}
            <strong> Views: </strong> {question.views}
          </p>
          <p>
            {" "}
            <strong> Comments: </strong> {question.comments}
          </p>
          <p>
            {" "}
            <strong> Upvotes: </strong> {question.upvotes}
          </p>
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default QuestionDetail;
