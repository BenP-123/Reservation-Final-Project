const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");
const hasProperties = require("../errors/hasProperties");
const hasOnlyValidProperties = require('../errors/hasOnlyValidProperties');

const hasRequiredProperties = hasProperties("first_name", "last_name", "mobile_number", 
  "reservation_date", "reservation_time", "people");

  const VALID_PROPERTIES = [
    "reservation_id",
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
    "status",
    "created_at",
    "updated_at",
  ];

  const reservationHasOnlyValidProperties = hasOnlyValidProperties(VALID_PROPERTIES);

  function getRequestBody(req, res, next){
    if(req.body.data){
      res.locals.body = req.body.data;
    }
    else{
      res.locals.body = req.body;
    }
    next();
  }

  async function validateStatus(req, res, next){
    const { status } = res.locals.body;
    const { reservation_id } = req.params;
    const currentReservation = await service.read(reservation_id);

    if(status != "booked" && status != "seated" && status != "finished" && status != "cancelled"){
      return next({
        message: "Status unknown, must be booked, seated, finished, or cancelled.",
        status: 400,
        });
    }

    if(currentReservation.status === "finished"){
      return next({
        message: "a finished reservation may not be edited.",
        status: 400,
        });
    }

    next();
  }

  function bookedStatus(req, res, next){
    const { status } = res.locals.body;

    if(status !== "booked"){
      return next({
        message: "Only reservations that are currently booked may be edited.",
        status: 400,
        });
    }

    next();
  }

  async function reservationExists(req, res, next){
    const { reservation_id } = req.params;

    const reservation = await service.read(reservation_id);
    if(!reservation){
      return next({
        message: `Cannot find reservation with id ${reservation_id}.`,
        status: 404,
        });
    }
    res.locals.reservation = reservation;
    next();
  }

  function validateReservationFields(req, res, next){
    const {reservation_time, reservation_date, people, status} = res.locals.body;
    const timeFormatString = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/;
    const dateFormatString = /^\d{4}-\d{2}-\d{2}$/;
    const date = new Date(reservation_date);
    const currentTime = new Date();
    const fullReservationTime = new Date(`${reservation_date}T${reservation_time}`);


    if(!reservation_time.match(timeFormatString)?.[0]){
      return next({
        message: "reservation_time must be in the HH:MM:SS format.",
        status: 400,
        });
    }

    if(reservation_time < "10:30" || reservation_time > "21:30"){
      return next({
        message: "Reservation time must be after 10:30 AM and before 9:30 PM (EST).",
        status: 400,
        });
    }
    
    if(!reservation_date.match(dateFormatString)){
      return next({
        message: "reservation_date must be in the YYYY-MM-DD format.",
        status: 400,
        });
    }
    
    if(date.getUTCDay() === 2){
      return next({
        message: "Reservations cannot be on Tuesday, the restaurant is closed.",
        status: 400,
        });
    }
    
    if(fullReservationTime <= currentTime){
      return next({
        message: "Reservation times must be in the future.",
        status: 400,
        });
    }
    
    if(!Number.isInteger(people) || people <= 0){
      return next({
        message: "The number of people must be at least 1.",
        status: 400,
        });
    }

    if(status === "finished" || status === "seated"){
      return next({
        message: `Reservation cannot be made with seated or finished status.`,
        status: 400,
        });
    }
    next();
  } 

async function list(req, res, next){
  const { mobile_number, date } = req.query;

  if(mobile_number){
    res.json({ data: await service.listByNumber(mobile_number) });
  }
  else if(date){
    res.json({ data: await service.listByDate(date) });
  }
  else{
    return next({
      message: `Query string not found. Use reservations?mobile_number=(number) 
                or reservations?date=YYYY-MM-DD`,
                status: 400,
    });
  }
}

async function read(req, res) {
  const { reservation_id } = req.params;
  res.json({ data: await service.read(reservation_id) });
}

async function create(req, res) {
  service
    .create(req.body.data)
    .then((data) => res.status(201).json({ data }));
}

async function changeStatus(req, res) {
  const { status } = res.locals.body;
  const { reservation_id } = req.params;

  res.json({ data: await service.changeStatus(reservation_id, status) });
}

async function update(req, res) {
  const { reservation_id } = res.locals.reservation;
  const oldReservation = res.locals.reservation;
  const newReservation = res.locals.body;
  const updatedReservation = {
    ...oldReservation,
    ...newReservation,
  };

  res.json({ data: await service.update(reservation_id, updatedReservation) });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  create: [getRequestBody, hasRequiredProperties, reservationHasOnlyValidProperties, validateReservationFields, asyncErrorBoundary(create)],
  changeStatus: [getRequestBody, asyncErrorBoundary(reservationExists), validateStatus, asyncErrorBoundary(changeStatus)],
  update: [
    getRequestBody, asyncErrorBoundary(reservationExists), hasRequiredProperties, 
    reservationHasOnlyValidProperties, validateReservationFields, bookedStatus, asyncErrorBoundary(update)
  ],
};
