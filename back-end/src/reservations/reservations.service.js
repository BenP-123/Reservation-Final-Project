const knex = require("../db/connection");

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function read(id) {
    return knex("reservations")
      .select("*")
      .where({ reservation_id: id })
      .first();
  }

function changeStatus(id, status){
  return knex("reservations")
    .where({ reservation_id: id})
    .update({ status }, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

function update(id, updatedReservation) {
  return knex("reservations")
    .where({ reservation_id: id})
    .update(updatedReservation, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

function listByNumber(mobile_number) {
  return knex("reservations")
  .whereRaw(
    "translate(mobile_number, '() -', '') like ?",
    `%${mobile_number.replace(/\D/g, "")}%`
  )
  .orderBy("reservation_date");
}

function listByDate(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date})
    .whereNot({ status: "cancelled"})
    .whereNot({ status: "finished"})
    .orderBy("reservation_time");
}

module.exports = {
  create,
  read,
  changeStatus,
  update,
  listByNumber,
  listByDate,
};