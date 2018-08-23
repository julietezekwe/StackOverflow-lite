import express from 'express';
import ErrorHandler from './controller/error';
import LoginController from './controller/login';
import RegisterController from './controller/register';

const router = express.Router();

router.post('/login', (request, response, next) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return next(new ErrorHandler('Invalid Request', 400));
  }
  const authenticate = new LoginController();
  return authenticate.login(email, password, response, next);
});

router.post('/signup', (request, response, next) => {
  const { name, email, password } = request.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler('Invalid Request', 400));
  }
  const authenticate = new RegisterController();
  return authenticate.register(name, email, password, response, next);
});

export default router;
