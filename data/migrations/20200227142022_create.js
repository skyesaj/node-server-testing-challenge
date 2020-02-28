exports.up = function(knex) {
  return knex.schema.createTable("user", user => {
    user.increments();

    user
      .text("name")
      .notNullable()
      .unique()
      .index();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("user");
};
