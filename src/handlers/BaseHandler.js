import AppError from '../errors/AppError';

class BaseHandler {
  handlerSuccess(data) {
    const response = {
      statusCode: data.statusCode || 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.body),
    };
    return response;
  }

  handlerError(data) {
    throw new AppError({
      message: data.message || 'Error Message',
      stack: data.stack || 'Error Stack',
      code: data.code || 501,
    });
  }
}

module.exports = BaseHandler;
