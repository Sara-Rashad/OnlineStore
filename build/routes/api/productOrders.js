"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productOrder_1 = require("../../models/productOrder");
const verifyAuthToken_1 = __importDefault(require("./verifyAuthToken"));
const productRoute = express_1.default.Router();
const productOrderStore = new productOrder_1.ProductOrderStore();
// Get All Product Order
productRoute.get("/", async (req, res) => {
    try {
        const product_id = parseInt(req.body.product_id);
        const result = await productOrderStore.get(product_id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(404).send(`Failed to load product order. Error :${error}`);
    }
});
//Insert Product Order
productRoute.post("/create", verifyAuthToken_1.default, async (req, res) => {
    try {
        if (!req.body.product_id || !req.body.order_id) {
            res.status(400).send("Invalid Parameters");
        }
        else {
            const productOrder = {
                id: 0,
                product_id: req.body.product_id,
                order_id: req.body.order_id,
                quantity: req.body.quantity,
            };
            const result = await productOrderStore.add(productOrder);
            res.status(200).json(result);
        }
    }
    catch (error) {
        res.status(404).send(`Failed to insert product order. Error :${error}`);
    }
});
//Delete Product Order
productRoute.delete("/", verifyAuthToken_1.default, async (req, res) => {
    try {
        const id = req.body.id;
        if (!id) {
            res.status(400).send("Invalid Parameters");
        }
        else {
            const result = await productOrderStore.delete(id);
            res.status(200).send("Product Order successfully deleted");
        }
    }
    catch (error) {
        res.status(404).send(`Failed to delete product order. Error :${error}`);
    }
});
exports.default = productRoute;
