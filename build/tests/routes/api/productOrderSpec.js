"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../../server"));
const products_1 = require("../../../models/products");
const orders_1 = require("../../../models/orders");
const users_1 = require("../../../models/users");
const productOrder_1 = require("../../../models/productOrder");
const request = (0, supertest_1.default)(server_1.default);
describe("Test Product", () => {
    let product;
    let order;
    let user;
    let productOrder;
    let token;
    const productStore = new products_1.ProductStore();
    const orderStore = new orders_1.OrderStore();
    const userStore = new users_1.UserStore();
    const productOrderStore = new productOrder_1.ProductOrderStore();
    beforeAll(async () => {
        product = await productStore.add({
            id: 0,
            name: "product1",
            price: 30,
            insert_date: new Date(),
        });
        const userObj = {
            id: 0,
            firstname: "productOrderUser",
            lastname: "name2",
            password: "123",
        };
        user = await userStore.add(userObj);
        token = await userStore.login(userObj.firstname, userObj.password);
        order = await orderStore.add({
            id: 0,
            user_id: user.id,
            status: 2,
            order_date: new Date(),
        });
        productOrder = await productOrderStore.add({
            id: 0,
            product_id: product.id,
            order_id: order.id,
            quantity: 200,
        });
    });
    it("Test Get All Product Orders", async () => {
        await request
            .get("/api/productOrders")
            .send({ product_id: product.id })
            .expect(200);
    });
    it("Test Add Product", async () => {
        await request
            .post("/api/productOrders/create")
            .send({
            product_id: product.id,
            order_id: order.id,
            quantity: 50,
            token: token,
        })
            .expect(200);
    });
    it("Test Failed To Add Product Order", async () => {
        await request
            .post("/api/productOrders/create")
            .send({
            productId: product.id,
            order_id: order.id,
            quantity: 50,
            token: token,
        })
            .expect(400);
    });
    it("Test Delete Product Order", async () => {
        await request
            .delete("/api/productOrders/")
            .send({ id: productOrder.id, token: token })
            .expect(200);
    });
});
