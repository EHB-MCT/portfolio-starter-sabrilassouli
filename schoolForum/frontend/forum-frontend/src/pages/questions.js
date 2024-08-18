
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/courses/${id}`);
                setCourse(response.data);
            } catch (error) {
                setError('Failed to fetch course details');
            }
        };

        fetchCourse();
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{course.name}</h1>
            <p>{course.description}</p>
            <p>Teacher: {course.teacher}</p>
        </div>
    );
};

export default CourseDetail;
