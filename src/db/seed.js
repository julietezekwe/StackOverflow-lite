import pool from './dbconnect';

const text = 'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *';
const values = ['brianc', 'brian.m.carlson@gmail.com', 'secret'];
pool.connect((err, client, done) => {
  if (err) throw err;
  client.query(text, values, (error, res) => {
    done();
    if (error) {
      console.log(err.stack);
    } else {
      console.log(res.rows[0]);
    }
  });
});
