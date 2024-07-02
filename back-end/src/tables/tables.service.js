//Service file for table routes, generates Knex postgreSQL queries to send to database

const knex = require("../db/connection");

function listTables(){
    return knex("tables")
        .select("*")
        .orderBy("table_name");
}

function readTable(id){
    return knex("tables")
      .select("*")
      .where({ table_id: id })
      .first();
}

function readReservation(id){
    return knex("reservations")
      .select("*")
      .where({ reservation_id: id })
      .first();
}

function createTable(table){
    return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

async function updateTableAndStatus(reservation_id, updatedTable, updatedStatus){
    try{
        await knex.transaction(async(trx) => {
            const tableUpdate = await trx("tables")
                .where({ table_id: updatedTable.table_id })
                .update(updatedTable, "*")
                .then((newTable) => newTable[0]);
        
            const statusUpdate = await trx("reservations")
                .where({ reservation_id })
                .update({status: updatedStatus}, "*")
                .then((newReservation) => newReservation[0]);
        });
    }
    catch(error){
        console.error(error);
    }
}

module.exports = {
    listTables,
    readTable,
    readReservation,
    createTable,
    updateTableAndStatus,
  };