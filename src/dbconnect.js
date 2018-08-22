import { Pool } from 'pg';

const connectionString = 'postgresql://edu1:admin@123@localhost:5432/stackoverflow';
const pool = new Pool({
  connectionString,
});

export default pool;