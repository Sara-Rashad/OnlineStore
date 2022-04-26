import express from "express";
import { OrderStore, Order } from "../../models/orders";
import verifyAuthToken from "./verifyAuthToken";

const orderRoute = express.Router();
const orderStore = new OrderStore();

// Get All Orders
orderRoute.get(
  "/",
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const result = await orderStore.index();
      res.status(200).json(result);
    } catch (error) {
      res.status(404).send(`Failed to load orders. Error :${error}`);
    }
  }
);

//Insert Order
orderRoute.post(
  "/create",
  verifyAuthToken,
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      if (!req.body.status || !req.body.userId) {
        res.status(400).send("Invalid Parameters");
      } else {
        const order: Order = {
          id: 0,
          status: req.body.status,
          user_id: req.body.userId,
          order_date: new Date(),
        };
        const result = await orderStore.add(order);
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(404).send(`Failed to insert order. Error :${error}`);
    }
  }
);

//Delete Order
orderRoute.delete(
  "/",
  verifyAuthToken,
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const id = req.body.id;
      if (!id) {
        res.status(400).send("Invalid Parameters");
      } else {
        const result = await orderStore.delete(id);
        res.status(200).send("Order successfully deleted");
      }
    } catch (error) {
      res.status(404).send(`Failed to delete order. Error :${error}`);
    }
  }
);

//Update Order
orderRoute.put(
  "/",
  verifyAuthToken,
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      if (!req.body.id) {
        res.status(400).send("Invalid Parameters");
      } else {
        const order: Order = {
          id: req.body.id,
          status: req.body.status,
          user_id: req.body.userId,
          order_date: new Date(),
        };
        const result = await orderStore.update(order);
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(404).send(`Failed to update order. Error :${error}`);
    }
  }
);

export default orderRoute;
