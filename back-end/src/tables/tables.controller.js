const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
const hasProperties = require("../errors/hasProperties");
const hasOnlyValidProperties = require('../errors/hasOnlyValidProperties');

const VALID_PROPERTIES = ["table_name", "reservation_id", "capacity"];
const tableHasOnlyValidProperties = hasOnlyValidProperties(VALID_PROPERTIES);

const tableHasRequiredProperties = hasProperties("table_name", "capacity");

async function reservationExists(req, res, next){
  const { reservation_id } = res.locals.body;

  const reservation = await service.readReservation(reservation_id);
  if(!reservation){
    return next({
      message: `Cannot find reservation with id ${reservation_id}.`,
      status: 404,
      });
  }
  res.locals.reservation = reservation;
  next();
}

async function tableExists(req, res, next){
  const { table_id } = req.params;

  const table = await service.readTable(table_id);
  if(!table){
    return next({
      message: `Cannot find table with id ${table_id}.`,
      status: 404,
      });
  }
  res.locals.table = table;
  next();
}

function validateTableFields(req, res, next){
  const { table_name, capacity } = res.locals.body;

  if(table_name.length <= 1){
    return next({
      message: "table_name must be more than 1 character long.",
      status: 400,
      });
  }

  if(!Number.isInteger(capacity) || capacity < 1){
    return next({
      message: "capacity must be an integer greater than 0.",
      status: 400,
      });
  }
  next();
}

function getRequestBody(req, res, next){
  if(req.body.data){
    res.locals.body = req.body.data;
  }
  else{
    res.locals.body = req.body;
  }
  next();
}

function reservationIdExists(req, res, next){
  const reservation_id = res.locals.body.reservation_id;
  if(!reservation_id){
    return next({
      message: "no reservation_id found.",
      status: 400,
      });
  }
  next();
}

function tableIsOccupied(req, res, next){
  const { table_id, reservation_id } = res.locals.table;
  if(!Number.isInteger(reservation_id)){
    return next({
      message: `table_id ${table_id} is not occupied.`,
      status: 400,
      });
  }
  res.locals.reservation_id = reservation_id;
  res.locals.table.reservation_id = null;
  res.locals.status = "finished";
  next();
}

function tableIsEmpty(req, res, next){
  const { table_id, reservation_id } = res.locals.table;
  if(Number.isInteger(reservation_id)){
    return next({
      message: `table_id ${table_id} is already occupied.`,
      status: 400,
      });
  }
  res.locals.reservation_id = res.locals.body.reservation_id;
  res.locals.table.reservation_id = res.locals.body.reservation_id;
  res.locals.status = "seated";
  next();
}

function reservationAlreadySeated(req, res, next){
  const { status } = res.locals.reservation;
  if(status !== "booked"){
    return next({
      message: "Reservation has already been seated.",
      status: 400,
      });
  }
  next();
}

function tableIsBigEnough(req, res, next){
  const { people } = res.locals.reservation;
  const { capacity } = res.locals.table;
  if(people > capacity){
    return next({
      message: `Table has capacity of ${capacity}, cannot seat ${people} people.`,
      status: 400,
      });
  }
  next();
}

async function list(req, res, _next) {
  res.json({ data: await service.listTables() });
}

async function create(req, res, _next) {
  const { body } = res.locals;
  service
    .createTable(body)
    .then((data) => res.status(201).json({ data }));
}

async function update(req, res, _next) {
  const { reservation_id, table, status } = res.locals;
  res.json({ data: await service.updateTableAndStatus(reservation_id, table, status) });
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: [getRequestBody, tableHasRequiredProperties, tableHasOnlyValidProperties, validateTableFields, asyncErrorBoundary(create)],
    update: [getRequestBody, reservationIdExists, asyncErrorBoundary(reservationExists), asyncErrorBoundary(tableExists), reservationAlreadySeated, tableIsBigEnough, tableIsEmpty, asyncErrorBoundary(update)],
    deleteSeatAssignment: [asyncErrorBoundary(tableExists), tableIsOccupied, asyncErrorBoundary(update)],
  };