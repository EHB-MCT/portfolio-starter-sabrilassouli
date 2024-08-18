const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

const {
    checkCourseName,
    checkCourseDescription,
    checkCourseTeacher
} = require("../helpers/courseEndpointHelpers");

router.get('/', async (req, res) => {
    try {
        const courses = await db('courses').select('*');
        res.json(courses);
    } catch (err) {
        res.status(500).json({
            error: 'Failed to fetch courses'
        });
    }
});

router.post('/', async (req, res) => {
    const {
        name,
        description,
        teacher
    } = req.body;

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
        const [id] = await db('courses').insert(req.body).returning('id');
        res.status(201).json({
            id
        });
    } catch (err) {
        res.status(500).json({
            error: 'Failed to create course'
        });
    }
});

module.exports = router;