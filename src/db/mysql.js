/**
 * @module db/mysql
 * @author Bruce Grover Lee
 */
import mysql from 'mysql';

const optionsTest = {
  connectionLimit: 10,
  host: 'aprendiendo-la-testing.cpwkq72wwokq.us-east-1.rds.amazonaws.com',
  user: 'aprendiendo',
  password: '!eda92cd37659791cff859e64a9e34aa',
  database: 'aprendiendo_prod',
  port: 3306,
};

const pool  = mysql.createPool(optionsTest);

export default pool;