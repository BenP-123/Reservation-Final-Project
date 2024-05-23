const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");
const hasProperties = require("../errors/hasProperties");

const hasRequiredProperties = hasProperties("supplier_name", "supplier_email");

function validDate(req, res, next){
  const { date } = req.query.date;
  if (date) {
    res.locals.date = date;       //implement date check
    return next();
  }
  return next({ status: 404, message: `Invalid date.` });
}

async function read(req, res) {
  res.json({ data: await service.read(res.locals.date) });
}

async function create(req, res) {
  service
  .create(req.body.data)
  .then((data) => res.status(201).json({ data }))
}

module.exports = {
  read: [asyncErrorBoundary(validDate), read],
  create: [asyncErrorBoundary(hasRequiredProperties), create],
};
