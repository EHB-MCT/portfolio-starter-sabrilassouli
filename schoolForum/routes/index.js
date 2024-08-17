
const express = require('express');
const knex = require('knex'); 
const knexConfig = require('../knexfile'); 

const db = knex(knexConfig.development);


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