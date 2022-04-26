"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../../server"));
const users_1 = require("../../../models/users");
const orders_1 = require("../../../models/orders");
const request = (0, supertest_1.default)(server_1.default);
describe("Test Order", () => {
    let user;
    const userStore = new users_1.UserStore();
    let token;
    let order;
    const orderStore = new orders_1.OrderStore();
    beforeAll(async () => {
        const userObj = {
            id: 0,
            firstname: "orderUser",
            lastname: "Rashad",
            password: "123",
        };
        user = await userStore.add(userObj);
        token = await userStore.login(userObj.firstname, userObj.password);
        order = await orderStore.add({
            id: 0,
            user_id: user.id,
            status: 3,
            order_date: new Date(),
        });
    });
    it("Test Get All Orders", async () => {
        await request.get("/api/orders").expect(200);
    });
    it("Test Add Order", async () => {
        await request
            .post("/api/orders/create")
            .send({ userId: user.id, status: 3, token: token })
            .expect(200);
    });
    it("Test Failed To Add Order", async () => {
        await request
            .post("/api/orders/create")
            .send({ userId: user.id, status_number: 3, token: token })
            .expect(400);
    });
    it("Test Update Order", async () => {
        await request
            .put("/api/orders/")
            .send({ id: order.id, status: 5, token: token })
            .expect(200);
    });
    it("Test Delete Order", async () => {
        await request
            .delete("/api/orders/")
            .send({ id: order.id, token: token })
            .expect(200);
    });
});
