"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
class UserStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Cannot get users . Error: ${error}`);
        }
    }
    async get(id) {
        try {
            const conn = await database_1.default.connect();
            const result = await conn.query("SELECT * FROM users WHERE id=$1", [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Cannot find user with id : ${id} . Error: ${error}`);
        }
    }
    async add(user) {
        try {
            const conn = await database_1.default.connect();
            const result = await conn.query("INSERT INTO Users (firstName,lastName,password) VALUES ($1,$2,$3) RETURNING *", [user.firstName, user.lastName, user.password]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Cannot insert user. Error: ${error}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const result = await conn.query("DELETE FROM users WHERE id=$1", [id]);
            conn.release();
            return;
        }
        catch (error) {
            throw new Error(`Cannot delete this user. Error: ${error}`);
        }
    }
}
exports.UserStore = UserStore;
