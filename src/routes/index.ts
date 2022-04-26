import express from "express";
import productRoute from "./api/products";
import orderRoute from "./api/orders";
import userRoute from "./api/users";
import productOrderRoute from "./api/productOrders";

const mainRoute = (app: express.Application) => {
  app.use("/api/products", productRoute);
  app.use("/api/orders", orderRoute);
  app.use("/api/users", userRoute);
  app.use("/api/productOrders", productOrderRoute);
};

export default mainRoute;
