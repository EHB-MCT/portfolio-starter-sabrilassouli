

exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('questions').del();
    
    // Inserts seed entries
    await knex('questions').insert([
        { creator_id: 2, course_id: 1, title: 'What is docker?', description: 'can someone help me understand docker please? i dont understand it..', views: 0, comments: 0, upvotes: 0 },
        { creator_id: 2, course_id: 2, title: 'how do i make a font?', description: 'can someone help me understand how to make fonts please? i dont understand it..', views: 0, comments: 0, upvotes: 0 },
        { creator_id: 2, course_id: 3, title: 'What is a shader?', description: 'can someone help me understand what a shader is please? i dont understand it..', views: 0, comments: 0, upvotes: 0 },
    ]);
  };
  