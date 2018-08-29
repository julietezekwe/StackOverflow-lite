import express from 'express';
import router from './route';
import auth from './auth';

const app = express();
const baseUrl = '/api/v1/questions';
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type');
  next();
});

app.use('/api/v1/auth', auth);
app.use(baseUrl, router);

app.use((req, res, next) => {
  const err = new Error('No Route Match Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500)
    .json({
      status: false,
      error: {
        message: err.message,
      },
    });
});
const port = process.env.PORT || 3000;
const address = app.listen(port, () => console.log(`Listening on port ${port}...`));
export default address;
