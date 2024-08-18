const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);
const {
    checkUserName,
    checkEmail,
    checkPassword,
    checkStatus
} = require("./../helpers/userEndpointHelpers")

const {
    checkCourseName,
    checkCourseDescription,
    checkCourseTeacher,
} = require("./../helpers/courseEndpointHelpers.js")

const {
    checkCreatorId,
    checkCourseId,
    checkTitle,
    checkDescription,
    checkViews,
    checkComments,
    checkUpvotes
} = require('../helpers/questionEndpointHelpers.js');


const app = express();


app.use(express.json());

// Define a route to handle GET requests for retrieving all users
app.get('/users', async (req, res) => {
    try {
        // Query the database to select all users
        const users = await db('users').select('*');
        // Respond with the list of users in JSON format
        res.json(users);
    } catch (err) {
        // Respond with an error message and a 500 status code if the query fails
        res.status(500).json({
            error: 'Failed to fetch users'
        });
    }
});

// Define a route to handle POST requests for creating a new user
app.post('/users', async (req, res) => {
    const {
        name,
        email,
        password,
        status
    } = req.body;

    // Validate user data
    if (!checkUserName(name)) {
        return res.status(400).json({
            error: 'Invalid username'
        });
    }

    if (!checkEmail(email)) {
        return res.status(400).json({
            error: 'Invalid email address'
        });
    }

    if (!checkPassword(password)) {
        return res.status(400).json({
            error: 'Invalid password'
        });
    }

    if (!checkStatus(status)) {
        return res.status(400).json({
            error: 'Invalid status'
        });
    }
    try {
        // Insert the new user into the database and return the newly created user's ID
        const [id] = await db('users').insert(req.body).returning('id');
        // Respond with the ID of the newly created user and a 201 status code
        res.status(201).json({
            id
        });
    } catch (err) {
        // Respond with an error message and a 500 status code if the insertion fails
        res.status(500).json({
            error: 'Failed to create user'
        });
    }
});

// Define the port to listen on, defaulting to 3000 if not specified in environment variables
const port = process.env.PORT || 3000;

// Start the Express server and listen for incoming requests on the specified port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


app.get('/courses', async (req, res) => {
    try {
        const courses = await db('courses').select('*');
        res.json(courses);
    } catch (err) {
        res.status(500).json({
            error: 'Failed to fetch courses'
        });
    }
});

app.post('/courses', async (req, res) => {
    const {
        name,
        description,
        teacher
    } = req.body;

    // Validate course data
    if (!checkCourseName(name)) {
        return res.status(400).json({
            error: 'Invalid course name'
        });
    }

    if (!checkCourseDescription(description)) {
        return res.status(400).json({
            error: 'Invalid course description'
        });
    }

    if (!checkCourseTeacher(teacher)) {
        return res.status(400).json({
            error: 'Invalid course teacher'
        });
    }

    try {
        // Insert the new course into the database and return the newly created course's ID
        const [id] = await db('courses').insert(req.body).returning('id');
        // Respond with the ID of the newly created course and a 201 status code
        res.status(201).json({
            id
        });
    } catch (err) {
        // Respond with an error message and a 500 status code if the insertion fails
        res.status(500).json({
            error: 'Failed to create course'
        });
    }
});

app.get('/questions', async (req, res) => {
    try {
        const questions = await db('questions').select('*');
        res.json(questions);
    } catch (err) {
        res.status(500).json({
            error: 'Failed to fetch questions'
        });
    }
});

app.post('/questions', async (req, res) => {
    const {
        creator_id,
        course_id,
        title,
        description,
        views,
        comments,
        upvotes
    } = req.body;

    // Validate course data
    if (!checkCreatorId(creator_id)) {
        return res.status(400).json({
            error: 'Invalid creator_id'
        });
    }
    if (!checkCourseId(course_id)) {
        return res.status(400).json({
            error: 'Invalid course_id'
        });
    }
    if (!checkTitle(title)) {
        return res.status(400).json({
            error: 'Invalid title'
        });
    }
    if (!checkDescription(description)) {
        return res.status(400).json({
            error: 'Invalid description'
        });
    }
    if (!checkViews(views)) {
        return res.status(400).json({
            error: 'Invalid views'
        });
    }
    if (!checkComments(comments)) {
        return res.status(400).json({
            error: 'Invalid comments'
        });
    }
    if (!checkUpvotes(upvotes)) {
        return res.status(400).json({
            error: 'Invalid upvotes'
        });
    }


    try {
        const [id] = await db('questions').insert(req.body).returning('id');
        res.status(201).json({
            id
        });
    } catch (err) {
        res.status(500).json({
            error: 'Failed to create questions'
        });
    }
});

app.get('/answers', async (req, res) => {
    try {
        const answers = await db('answers').select('*');
        res.json(answers);
    } catch (err) {
        res.status(500).json({
            error: 'Failed to fetch answers'
        });
    }
});

app.post('/answers', async (req, res) => {
    try {
        const [id] = await db('answers').insert(req.body).returning('id');
        res.status(201).json({
            id
        });
    } catch (err) {
        res.status(500).json({
            error: 'Failed to create answers'
        });
    }
});