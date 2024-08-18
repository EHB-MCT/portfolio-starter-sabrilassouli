/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('answers', table => {
        table.increments('id').primary();
        table.integer('creator_id');
        table.integer('question_id');
        table.string('comment');
        table.integer('upvotes');
        table.timestamps(true, true);
    });

};



exports.down = function (knex) {
    return knex.schema.dropTable('answers');
};