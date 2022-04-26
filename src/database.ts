import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const { HOST, DB_NAME, DB_NAME_TEST, DB_USER, DB_PASSWORD, ENV } = process.env;

let client: Pool;

if (ENV === "dev") {
  client = new Pool({
    host: HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
  });
} else if (ENV === "test") {
  client = new Pool({
    host: HOST,
    database: DB_NAME_TEST,
    user: DB_USER,
    password: DB_PASSWORD,
  });
} else throw new Error("ENV variable not exist");

export default client;
