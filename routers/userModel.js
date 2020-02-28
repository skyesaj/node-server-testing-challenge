const db = require("../data/db-config");

function insert(user) {
  return db("user")
    .insert(user, "id")
    .then(log => {
      const [id] = log;
      return db("user")
        .where({ id })
        .first();
    });
}

function remove(id) {
  return db("user")
    .where("id", id)
    .del();
}

module.exports = {
  insert,
  remove
};
