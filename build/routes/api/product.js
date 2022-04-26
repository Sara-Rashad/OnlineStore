"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../../models/product");
const productRoute = express_1.default.Router();
const productStore = new product_1.ProductStore();
productRoute.get("/", async (req, res) => {
    const result = productStore.index();
    res.json(result);
});
exports.default = productRoute;
