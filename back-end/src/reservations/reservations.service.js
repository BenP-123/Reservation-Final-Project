const knex = require("../db/connection");

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function read(date) {
    return knex("reservations")
      .select("*")
      .where({ date });
  }

module.exports = {
  create,
  read,
};