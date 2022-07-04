import * as mysql from 'mysql2/promise';
import path = require('path');
import * as fs from 'fs';

const connection = mysql.createPool({
  host: '172.17.0.1',
  user: 'root',
  password: 'root',
  port: 3306,
  database: 'list',
});

const seedSqlFile = path.join(__dirname, '..', '..', 'migration.sql');

const seedSql = fs.readFileSync(seedSqlFile, 'utf8');

const runSeed = async (): Promise<void> => {
  await connection.query(seedSql);
};

export default connection;

export { runSeed };
