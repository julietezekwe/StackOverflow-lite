export default class ErrorHandler {
  constructor(message, code) {
    const err = new Error(message);
    err.status = code;
    return err;
  }
}
