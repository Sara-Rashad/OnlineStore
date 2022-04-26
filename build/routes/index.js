"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = __importDefault(require("./api/products"));
const orders_1 = __importDefault(require("./api/orders"));
const users_1 = __importDefault(require("./api/users"));
const productOrders_1 = __importDefault(require("./api/productOrders"));
const mainRoute = (app) => {
    app.use("/api/products", products_1.default);
    app.use("/api/orders", orders_1.default);
    app.use("/api/users", users_1.default);
    app.use("/api/productOrders", productOrders_1.default);
};
exports.default = mainRoute;
