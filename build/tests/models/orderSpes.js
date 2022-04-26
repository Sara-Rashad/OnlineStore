"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const store = new order_1.OrderStore();
describe("Order model", () => {
    let order;
    it("Add method should create order", async () => {
        const todayDate = new Date();
        order = await store.add({ id: 0, status: 1, user_id: 1, order_date: todayDate });
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
