import express from "express";
import { ProductStore, Product } from "../../models/products";
import verifyAuthToken from "./verifyAuthToken";

const productRoute = express.Router();
const productStore = new ProductStore();

// Get All Products
productRoute.get(
  "/",
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const result = await productStore.index();
      res.status(200).json(result);
    } catch (error) {
      res.status(404).send(`Failed to load products. Error :${error}`);
    }
  }
);

//Insert Product
productRoute.post(
  "/create",
  verifyAuthToken,
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      if (!req.body.name || !req.body.price) {
        res.status(400).send("Invalid Parameters");
      } else {
        const product: Product = {
          id: 0,
          name: req.body.name,
          price: req.body.price,
          insert_date: new Date(),
        };
        const result = await productStore.add(product);
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(404).send(`Failed to insert product. Error :${error}`);
    }
  }
);

//Delete Product
productRoute.delete(
  "/",
  verifyAuthToken,
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const id = req.body.id;
      if (!id) {
        res.status(400).send("Invalid Parameters");
      } else {
        const result = await productStore.delete(id);
        res.status(200).send("Product successfully deleted");
      }
    } catch (error) {
      res.status(404).send(`Failed to delete product. Error :${error}`);
    }
  }
);

//Update Product
productRoute.put(
  "/",
  verifyAuthToken,
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      if (!req.body.id) {
        res.status(400).send("Invalid Parameters");
      } else {
        const product: Product = {
          id: req.body.id,
          name: req.body.name,
          price: req.body.price,
          insert_date: new Date(),
        };
        const result = await productStore.update(product);
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(404).send(`Failed to update product. Error :${error}`);
    }
  }
);

export default productRoute;
