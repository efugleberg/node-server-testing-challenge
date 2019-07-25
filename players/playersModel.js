const db = require("../data/dbConfig.js");

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById
};

async function insert(player) {
  return db("players").insert(player, "id");
}

async function update(id, changes) {
  return null;
}

function remove(id) {
  return db("players")
    .where("id", id)
    .del();
}

function getAll() {
  return db("players");
}

function findById(id) {
  return null;
}
