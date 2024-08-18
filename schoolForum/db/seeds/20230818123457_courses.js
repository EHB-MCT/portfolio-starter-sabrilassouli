

exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('courses').del();
    
    // Inserts seed entries
    await knex('courses').insert([
      { name: 'development V', description: 'derdejaar code vak', teacher: 'Jan Everaert' },
      { name: 'design II', description: 'Deep dive into design ', teacher: 'Beuten Maaike' },
      { name: '3D design', description: 'learn the art of 3D modeling', teacher: 'Molenberghs David' }
    ]);
  };
  