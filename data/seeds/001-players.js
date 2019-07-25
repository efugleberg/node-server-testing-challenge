exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("players")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("players").insert([
        { name: "sergei", position: "Center", number: "91" },
        { name: "steve", position: "Center", number: "19" },
        { name: "niklas", position: "Left Defense", number: "5" }
      ]);
    });
};
