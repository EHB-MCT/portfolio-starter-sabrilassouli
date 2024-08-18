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

router.get('/question/:questionId', async (req, res) => {
    const {
        questionId
    } = req.params;
    try {
        const answers = await db('answers')
            .join('users', 'answers.creator_id', 'users.id')
            .where('answers.question_id', questionId)
            .select('answers.*', 'users.name as creator_name');
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
        upvotes = 0
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
        const [id] = await db('answers').insert({
            creator_id,
            question_id,
            comment,
            upvotes
        }).returning('id');
        res.status(201).json({
            id
        });
    } catch (err) {
        console.error('Database insert error:', err);
        res.status(500).json({
            error: 'Failed to create answer'
        });
    }
});

module.exports = router;