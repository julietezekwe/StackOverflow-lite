import express from 'express';
import router from './route';

const app = express();
const baseUrl = '/api/v1/questions';
app.use(express.json());

app.use(baseUrl, router);

app.use((req, res, next) => {
  const err = new Error('No Route Match Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500)
    .json({
      error: {
        message: err.message,
      },
    });
});
const port = process.env.PORT || 3000;
const address = app.listen(port, () => console.log(`Listening on port ${port}...`));
export default address;
