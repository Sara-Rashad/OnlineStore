import express from "express";
import { ProductOrderStore, ProductOrder } from "../../models/productOrder";
import verifyAuthToken from "./verifyAuthToken";

const productRoute = express.Router();
const productOrderStore = new ProductOrderStore();

// Get All Product Order
productRoute.get(
  "/",
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const product_id = parseInt(req.body.product_id);
      const result = await productOrderStore.get(product_id);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).send(`Failed to load product order. Error :${error}`);
    }
  }
);

//Insert Product Order
productRoute.post(
  "/create",
  verifyAuthToken,
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      if (!req.body.product_id || !req.body.order_id) {
        res.status(400).send("Invalid Parameters");
      } else {
        const productOrder: ProductOrder = {
          id: 0,
          product_id: req.body.product_id,
          order_id: req.body.order_id,
          quantity: req.body.quantity,
        };
        const result = await productOrderStore.add(productOrder);
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(404).send(`Failed to insert product order. Error :${error}`);
    }
  }
);

//Delete Product Order
productRoute.delete(
  "/",
  verifyAuthToken,
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const id = req.body.id;
      if (!id) {
        res.status(400).send("Invalid Parameters");
      } else {
        const result = await productOrderStore.delete(id);
        res.status(200).send("Product Order successfully deleted");
      }
    } catch (error) {
      res.status(404).send(`Failed to delete product order. Error :${error}`);
    }
  }
);

export default productRoute;
