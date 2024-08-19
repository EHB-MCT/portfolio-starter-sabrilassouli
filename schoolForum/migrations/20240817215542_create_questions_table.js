/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('questions', table => {
        table.increments('id').primary();
        table.integer('creator_id');
        table.integer('course_id');
        table.string('title').unique();
        table.string('description');
        table.integer('views');
        table.integer('comments');
        table.integer('upvotes');
        table.timestamps(true, true);
    });

};



exports.down = function (knex) {
    return knex.schema.dropTable('questions');
};