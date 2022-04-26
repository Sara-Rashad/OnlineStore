"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { TOKEN_SECRET: tokenSecret } = process.env;
const { BCRYPT_PASSWORD: pepper, SALT_ROUNDS: saltRounds } = process.env;
class UserStore {
    //Login
    async login(userName, password) {
        if (!tokenSecret) {
            throw new Error("missing env. variable");
        }
        else {
            const conn = await database_1.default.connect();
            const result = await database_1.default.query("SELECT * FROM users WHERE firstname=$1", [userName]);
            if (result.rowCount > 0) {
                const userObj = result.rows[0];
                const isMatched = bcrypt_1.default.compareSync(password + pepper, userObj.password);
                if (isMatched) {
                    const token = jsonwebtoken_1.default.sign({ user: userObj }, tokenSecret);
                    return token;
                }
            }
            return null;
        }
    }
    //Get All Users
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM users";
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
            const hash = bcrypt_1.default.hashSync(user.password + pepper, Number(saltRounds));
            const result = await conn.query("INSERT INTO Users (firstname,lastname,password) VALUES ($1,$2,$3) RETURNING *", [user.firstname, user.lastname, hash]);
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
    async update(user) {
        try {
            const conn = await database_1.default.connect();
            const result = await conn.query("UPDATE users SET firstname=COALESCE($1,firstname), lastname=COALESCE($2,lastname),password=COALESCE($3,password) WHERE id=$4 RETURNING *", [user.firstname, user.lastname, user.password, user.id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Cannot update this user. Error: ${error}`);
        }
    }
}
exports.UserStore = UserStore;
