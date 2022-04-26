"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../../models/orders");
const users_1 = require("../../models/users");
const store = new orders_1.OrderStore();
const userStore = new users_1.UserStore();
describe("Order model", () => {
    let order;
    let user;
    beforeAll(async () => {
        user = await userStore.add({
            id: 0,
            firstname: "Sara",
            lastname: "Rashad",
            password: "123",
        });
    });
    it("Add method should create order", async () => {
        const todayDate = new Date();
        order = await store.add({
            id: 0,
            status: 1,
            user_id: user.id,
            order_date: todayDate,
        });
        expect(order.status).toEqual(1);
    });
    it("Index method should show orders", async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThanOrEqual(1);
    });
    it("Get method should show 1 order", async () => {
        const result = await store.get(order.id);
        expect(result.status).toBe(1);
    });
    it("Delete method should delete 1 order", async () => {
        const result = await store.delete(order.id);
    });
});
