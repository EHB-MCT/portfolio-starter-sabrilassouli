exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('answers').del();

    // Inserts seed entries
    await knex('answers').insert([{
            creator_id: 1,
            question_id: 1,
            comment: 'Programming is the process of writing instructions for a computer to follow.',
            upvotes: 3
        },
        {
            creator_id: 1,
            question_id: 2,
            comment: 'Databases are crucial for storing and managing data efficiently.',
            upvotes: 4
        },
        {
            creator_id: 1,
            question_id: 3,
            comment: 'Building a web application involves designing, developing, and deploying the application.',
            upvotes: 5
        }
    ]);
};