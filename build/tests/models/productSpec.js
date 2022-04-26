"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../../models/products");
const store = new products_1.ProductStore();
describe("Product model", () => {
    let product;
    it("Add method should create product", async () => {
        const todayDate = new Date();
        product = await store.add({
            id: 0,
            name: "new product",
            price: 50,
            insert_date: todayDate,
        });
        expect(product.name).toEqual("new product");
    });
    it("Index method should show products", async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThanOrEqual(1);
    });
    it("Get method should show 1 product", async () => {
        const result = await store.get(product.id);
        expect(result.name).toBe("new product");
    });
    it("Delete method should delete 1 product", async () => {
        const result = await store.delete(product.id);
    });
});
