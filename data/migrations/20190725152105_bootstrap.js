exports.up = function(knex) {
  return knex.schema.createTable("players", tbl => {
    tbl.increments();
    tbl.string("name", 255).notNullable();
    tbl.string("position", 128);
    tbl.string('number', 10);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("players");
};
