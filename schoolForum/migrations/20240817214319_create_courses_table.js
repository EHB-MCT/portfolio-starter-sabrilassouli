/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('courses', table => {
      table.increments('id').primary();
      table.string('name').unique();
      table.string('description');
      table.string('teacher');
      table.timestamps(true, true);
    });
  
  };
  
  
  
  exports.down = function (knex) {
    return knex.schema.dropTable('courses');
  };