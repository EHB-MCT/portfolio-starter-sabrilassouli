const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

const {
    checkCreatorId,
    checkCourseId,
    checkTitle,
    checkDescription,
    checkViews,
    checkComments,
    checkUpvotes
} = require('../helpers/questionEndpointHelpers');

// Route to get all questions
router.get('/', async (req, res) => {
    try {
        const questions = await db('questions').select('*');
        res.json(questions);
    } catch (err) {
        res.status(500).json({
            error: 'Failed to fetch questions'
        });
    }
});

// Route to get a specific question by ID
router.get('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const question = await db('questions').where({
            id
        }).first();
        if (!question) {
            return res.status(404).json({
                error: 'Question not found'
            });
        }
        res.json(question);
    } catch (err) {
        res.status(500).json({
            error: 'Failed to fetch question'
        });
    }
});

// Route to get questions by course ID
router.get('/course/:courseId', async (req, res) => {
    const {
        courseId
    } = req.params;
    try {
        const questions = await db('questions').where('course_id', courseId);
        res.json(questions); // Should return an array of questions
    } catch (err) {
        res.status(500).json({
            error: 'Failed to fetch questions'
        });
    }
});

// Route to create a new question
router.post('/', async (req, res) => {
    const {
        creator_id,
        course_id,
        title,
        description,
        views,
        comments,
        upvotes
    } = req.body;

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
            error: 'Failed to create question'
        });
    }
});


// Increment views endpoint
router.put('/:id/increment-views', async (req, res) => {
    const {
        id
    } = req.params;

    try {
        // Check if the question exists
        const question = await db('questions').where({
            id
        }).first();
        if (!question) {
            return res.status(404).json({
                error: 'Question not found'
            });
        }

        // Increment the views count
        await db('questions')
            .where({
                id
            })
            .increment('views', 1);
       

        res.json(updatedQuestion);
    } catch (err) {
        res.status(500).json({
            error: 'Failed to update views'
        });
    }
});

module.exports = router;