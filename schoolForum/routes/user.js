const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

const {
    checkUserName,
    checkEmail,
    checkPassword,
    checkStatus
} = require("../helpers/userEndpointHelpers");

router.get('/', async (req, res) => {
    try {
        const users = await db('users').select('*');
        res.json(users);
    } catch (err) {
        res.status(500).json({
            error: 'Failed to fetch users'
        });
    }
});

router.post('/', async (req, res) => {
    const {
        name,
        email,
        password,
        status
    } = req.body;

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
        const [id] = await db('users').insert(req.body).returning('id');
        res.status(201).json({
            id
        });
    } catch (err) {
        res.status(500).json({
            error: 'Failed to create user'
        });
    }
});

module.exports = router;