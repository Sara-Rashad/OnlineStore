"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../../server"));
const products_1 = require("../../../models/products");
const users_1 = require("../../../models/users");
const request = (0, supertest_1.default)(server_1.default);
describe("Test Product", () => {
    let product;
    const productStore = new products_1.ProductStore();
    let token;
    let user;
    const userStore = new users_1.UserStore();
    beforeAll(async () => {
        product = await productStore.add({
            id: 0,
            name: "product1",
            price: 30,
            insert_date: new Date(),
        });
        const userObj = {
            id: 0,
            firstname: "productUser",
            lastname: "Rashad",
            password: "pass123",
        };
        user = await userStore.add(userObj);
        token = await userStore.login(userObj.firstname, userObj.password);
    });
    it("Test Get All Products", async () => {
        await request.get("/api/products").expect(200);
    });
    it("Test Add Product", async () => {
        await request
            .post("/api/products/create")
            .send({ name: "test", price: 300, token: token })
            .expect(200);
    });
    it("Test Failed To Add Product", async () => {
        await request
            .post("/api/products/create")
            .send({ fullName: "test", price: 46, token: token })
            .expect(400);
    });
    it("Test Update Product", async () => {
        await request
            .put("/api/products/")
            .send({ id: product.id, price: 55, token: token })
            .expect(200);
    });
    it("Test Delete Product", async () => {
        await request
            .delete("/api/products/")
            .send({ id: product.id, token: token })
            .expect(200);
    });
});
