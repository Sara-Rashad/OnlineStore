"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_1 = require("../../models/orders");
const verifyAuthToken_1 = __importDefault(require("./verifyAuthToken"));
const orderRoute = express_1.default.Router();
const orderStore = new orders_1.OrderStore();
// Get All Orders
orderRoute.get("/", async (req, res) => {
    try {
        const result = await orderStore.index();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(404).send(`Failed to load orders. Error :${error}`);
    }
});
//Insert Order
orderRoute.post("/create", verifyAuthToken_1.default, async (req, res) => {
    try {
        if (!req.body.status || !req.body.userId) {
            res.status(400).send("Invalid Parameters");
        }
        else {
            const order = {
                id: 0,
                status: req.body.status,
                user_id: req.body.userId,
                order_date: new Date(),
            };
            const result = await orderStore.add(order);
            res.status(200).json(result);
        }
    }
    catch (error) {
        res.status(404).send(`Failed to insert order. Error :${error}`);
    }
});
//Delete Order
orderRoute.delete("/", verifyAuthToken_1.default, async (req, res) => {
    try {
        const id = req.body.id;
        if (!id) {
            res.status(400).send("Invalid Parameters");
        }
        else {
            const result = await orderStore.delete(id);
            res.status(200).send("Order successfully deleted");
        }
    }
    catch (error) {
        res.status(404).send(`Failed to delete order. Error :${error}`);
    }
});
//Update Order
orderRoute.put("/", verifyAuthToken_1.default, async (req, res) => {
    try {
        if (!req.body.id) {
            res.status(400).send("Invalid Parameters");
        }
        else {
            const order = {
                id: req.body.id,
                status: req.body.status,
                user_id: req.body.userId,
                order_date: new Date(),
            };
            const result = await orderStore.update(order);
            res.status(200).json(result);
        }
    }
    catch (error) {
        res.status(404).send(`Failed to update order. Error :${error}`);
    }
});
exports.default = orderRoute;
