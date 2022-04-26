"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { HOST, DB_NAME, DB_NAME_TEST, DB_USER, DB_PASSWORD, ENV } = process.env;
let client;
if (ENV === "dev") {
    client = new pg_1.Pool({
        host: HOST,
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASSWORD,
    });
}
else if (ENV === "test") {
    client = new pg_1.Pool({
        host: HOST,
        database: DB_NAME_TEST,
        user: DB_USER,
        password: DB_PASSWORD,
    });
}
else
    throw new Error("ENV variable not exist");
exports.default = client;
