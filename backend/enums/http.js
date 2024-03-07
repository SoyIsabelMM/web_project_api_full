// const NOT_FOUND = 400;
// const UNAUTHORIZED = 401;
// const FORBIDDEN = 403;
// const SERVER_ERROR = 500;

// module.exports = { NOT_FOUND, SERVER_ERROR, UNAUTHORIZED, FORBIDDEN };

const HttpStatus = Object.freeze({
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
});

const HttpResponseMessage = Object.freeze({
  SUCCESS: 'Succes',
  CREATED: 'Resource created successfully',
  BAD_REQUEST: 'Bad Request',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',
  NOT_FOUND: 'Resource not found',
  SERVER_ERROR: 'Internal server error',
});

module.exports = {
  HttpStatus,
  HttpResponseMessage,
};
