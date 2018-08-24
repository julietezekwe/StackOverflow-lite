import jwt from 'jsonwebtoken';

const secret = 'R^2$IXFRQW~88[u';

const getToken = (bearer) => {
  if (!bearer) {
    return false;
  }
  const token = bearer.split(' ')[1];
  return token;
};

const verifyToken = (token) => {
  return jwt.verify(token, secret, (error, data) => {
    if (error) {
      return {
        status: false,
        data: error.message,
      };
    }
    return {
      status: true,
      data,
    };
  });
};

export { secret, getToken, verifyToken };
