
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('users').del();
    
    // Inserts seed entries
    await knex('users').insert([
      { name: 'anonymous', email: 'anonymous@example.com', password: 'password123', status: 0 },
      { name: 'sabri lassouli', email: 'sabri.lassouli@student.ehb.be', password: 'password123', status: 1 },
      { name: 'Jan Everaert', email: 'Jan.Everaert@student.ehb.be', password: 'password123', status: 2 }
    ]);
  };
  