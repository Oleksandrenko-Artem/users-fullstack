const createHttpError = require('http-errors');
const { ValidationError, BaseError } = require('sequelize');

module.exports.dbErrorHandler = (err, req, res, next) => {
  // Відловлюємо помилки Sequelize (https://sequelize.org/api/v6/identifiers.html#errors)

  // Помилки валідації (невалідне ім'я, рік народження з майбутнього, ...)
  if (err instanceof ValidationError) {
    const errors = err.errors.map(e => ({ status: 422, title: e.message }));
    // згідно з json:api запаковуємо одразу корисну інфу з об'єкту помилки
    // одразу в масив об'єктів з полями status, message
    return res.status(422).send(errors);
  }

  // Аналогічно можна прописати обробку інших типів помилок Sequelize
  // ...

  // Всі інші окремо не оброблені помилки Sequelize:
  if (err instanceof BaseError) {
    next(createHttpError(500, 'Database Error'));
  }
  next(err);
};

module.exports.errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return;
  }

  const status = err.status || 500;
  const message = err.message || 'Server Error';

  res.status(status).send([{ status, message }]);
};

// [
//   { status: 200, title: '' },
//   { status: 200, title: '' },
// ];
