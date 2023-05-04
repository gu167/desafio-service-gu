export class AppError {
  constructor({ message, stack, code = 403 }) {
    this.message = message;
    this.stack = stack;
    this.code = code;
  }
}
