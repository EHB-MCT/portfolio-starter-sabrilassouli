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

router.get('/:course_id', async (req, res) => {
    const {
        course_id
    } = req.params;
    try {
        const questions = await db('questions').where({
            course_id
        }).select('*');
        res.json(questions);
    } catch (err) {
        res.status(500).json({
            error: 'Failed to fetch questions'
        });
    }
});

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

module.exports = router;