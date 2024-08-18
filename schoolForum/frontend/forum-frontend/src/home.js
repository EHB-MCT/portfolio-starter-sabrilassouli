// src/Courses.js
import React, {
    useEffect,
    useState
} from 'react';
import axios from 'axios';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:3000/courses');
                setCourses(response.data);
            } catch (error) {
                setError('Failed to fetch courses');
            }
        };

        fetchCourses();
    }, []);

    if (error) {
        return <div > {
            error
        } < /div>;
    }

    const handleCourseClick = (courseId) => {
        // Perform the action you want on course click, e.g., navigate to a detailed view
        console.log(`Course clicked: ${courseId}`);
    };

    return ( <
        div >
        <
        h1 > Courses < /h1> <
        ul > {
            courses.map(course => ( <
                li key = {
                    course.id
                } >
                <
                button onClick = {
                    () => handleCourseClick(course.id)
                } > {
                    course.name
                } <
                /button> <
                /li>
            ))
        } <
        /ul> <
        /div>
    );
};

export default Courses;