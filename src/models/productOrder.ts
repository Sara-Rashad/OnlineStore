import client from "../database";

export type ProductOrder = {
  id: number;
  product_id: number;
  order_id: number;
  quantity: number;
};

export class ProductOrderStore {
  async get(productId: number): Promise<ProductOrder[]> {
    try {
      const conn = await client.connect();
      const result = await conn.query(
        "SELECT * FROM product_orders WHERE product_id=$1",
        [productId]
      );
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot find product orders. Error: ${error}`);
    }
  }
  async add(product_order: ProductOrder): Promise<ProductOrder> {
    try {
      const conn = await client.connect();
      const result = await conn.query(
        "INSERT INTO product_orders (product_id,order_id,quantity) VALUES ($1,$2,$3) RETURNING *",
        [
          product_order.product_id,
          product_order.order_id,
          product_order.quantity,
        ]
      );
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot insert product order. Error: ${error}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const conn = await client.connect();
      const result = await conn.query(
        "DELETE FROM product_orders WHERE id=$1",
        [id]
      );
      conn.release();
      return;
    } catch (error) {
      throw new Error(`Cannot delete this product order. Error: ${error}`);
    }
  }
}
