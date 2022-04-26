"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM products";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Cannot get products . Error: ${error}`);
        }
    }
    async get(id) {
        try {
            const conn = await database_1.default.connect();
            const result = await conn.query("SELECT * FROM products WHERE id=$1", [
                id,
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Cannot find product with id : ${id} . Error: ${error}`);
        }
    }
    async add(product) {
        try {
            const conn = await database_1.default.connect();
            const result = await conn.query("INSERT INTO Products (name,price,insert_date) VALUES ($1,$2,$3) RETURNING *", [product.name, product.price, product.insert_date]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Cannot insert product. Error: ${error}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const result = await conn.query("DELETE FROM products WHERE id=$1", [id]);
            conn.release();
            return;
        }
        catch (error) {
            throw new Error(`Cannot delete this product. Error: ${error}`);
        }
    }
    async update(product) {
        try {
            const conn = await database_1.default.connect();
            const result = await conn.query("UPDATE products SET name=COALESCE($1,name), price=COALESCE($2,price) WHERE id=$3 RETURNING *", [product.name, product.price, product.id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Cannot update this product. Error: ${error}`);
        }
    }
}
exports.ProductStore = ProductStore;
