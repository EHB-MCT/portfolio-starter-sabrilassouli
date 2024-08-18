const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

const {
    checkComment,
    checkQuestionId,
    checkCreatorId,
    checkUpvotes
} = require('../helpers/answerEndpointHelpers');

router.get('/', async (req, res) => {
    try {
        const answers = await db('answers').select('*');
        res.json(answers);
    } catch (err) {
        res.status(500).json({
            error: 'Failed to fetch answers'
        });
    }
});

router.post('/', async (req, res) => {
    const {
        creator_id,
        question_id,
        comment,
        upvotes
    } = req.body;

    if (!checkCreatorId(creator_id)) {
        return res.status(400).json({
            error: 'Invalid creator_id'
        });
    }
    if (!checkQuestionId(question_id)) {
        return res.status(400).json({
            error: 'Invalid question_id'
        });
    }
    if (!checkComment(comment)) {
        return res.status(400).json({
            error: 'Invalid comment'
        });
    }
    if (!checkUpvotes(upvotes)) {
        return res.status(400).json({
            error: 'Invalid upvotes'
        });
    }

    try {
        const [id] = await db('answers').insert(req.body).returning('id');
        res.status(201).json({
            id
        });
    } catch (err) {
        res.status(500).json({
            error: 'Failed to create answer'
        });
    }
});

module.exports = router;