"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = require("../../models/products");
const verifyAuthToken_1 = __importDefault(require("./verifyAuthToken"));
const productRoute = express_1.default.Router();
const productStore = new products_1.ProductStore();
// Get All Products
productRoute.get("/", async (req, res) => {
    try {
        const result = await productStore.index();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(404).send(`Failed to load products. Error :${error}`);
    }
});
//Insert Product
productRoute.post("/create", verifyAuthToken_1.default, async (req, res) => {
    try {
        if (!req.body.name || !req.body.price) {
            res.status(400).send("Invalid Parameters");
        }
        else {
            const product = {
                id: 0,
                name: req.body.name,
                price: req.body.price,
                insert_date: new Date(),
            };
            const result = await productStore.add(product);
            res.status(200).json(result);
        }
    }
    catch (error) {
        res.status(404).send(`Failed to insert product. Error :${error}`);
    }
});
//Delete Product
productRoute.delete("/", verifyAuthToken_1.default, async (req, res) => {
    try {
        const id = req.body.id;
        if (!id) {
            res.status(400).send("Invalid Parameters");
        }
        else {
            const result = await productStore.delete(id);
            res.status(200).send("Product successfully deleted");
        }
    }
    catch (error) {
        res.status(404).send(`Failed to delete product. Error :${error}`);
    }
});
//Update Product
productRoute.put("/", verifyAuthToken_1.default, async (req, res) => {
    try {
        if (!req.body.id) {
            res.status(400).send("Invalid Parameters");
        }
        else {
            const product = {
                id: req.body.id,
                name: req.body.name,
                price: req.body.price,
                insert_date: new Date(),
            };
            const result = await productStore.update(product);
            res.status(200).json(result);
        }
    }
    catch (error) {
        res.status(404).send(`Failed to update product. Error :${error}`);
    }
});
exports.default = productRoute;
