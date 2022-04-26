"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Cannot get orders . Error: ${error}`);
        }
    }
    async get(id) {
        try {
            const conn = await database_1.default.connect();
            const result = await conn.query("SELECT * FROM orders WHERE id=$1", [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Cannot find order with id : ${id} . Error: ${error}`);
        }
    }
    async add(order) {
        try {
            const conn = await database_1.default.connect();
            const result = await conn.query("INSERT INTO Orders (status,user_id,order_date) VALUES ($1,$2,$3) RETURNING *", [order.status, order.user_id, order.order_date]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Cannot insert order. Error: ${error}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const result = await conn.query("DELETE FROM orders WHERE id=$1", [id]);
            conn.release();
            return;
        }
        catch (error) {
            throw new Error(`Cannot delete this order. Error: ${error}`);
        }
    }
}
exports.OrderStore = OrderStore;
