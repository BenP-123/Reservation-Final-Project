function hasOnlyValidProperties(VALID_PROPERTIES) {
    return function hasOnlyValidProperties(_req, res, next) {
      const body = res.locals.body;
  
      const invalidFields = Object.keys(body).filter(
        (field) => !VALID_PROPERTIES.includes(field)
      );
      if (invalidFields.length) {
        return next({
          status: 400,
          message: `Invalid field(s): ${invalidFields.join(', ')}`,
        });
      }
      next();
    };
  }
  
  module.exports = hasOnlyValidProperties;