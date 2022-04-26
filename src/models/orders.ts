import client from "../database";

export type Order = {
  id: number;
  status: number;
  user_id: number;
  order_date: Date;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get orders . Error: ${error}`);
    }
  }
  async get(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const result = await conn.query("SELECT * FROM orders WHERE id=$1", [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot find order with id : ${id} . Error: ${error}`);
    }
  }
  async add(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const result = await conn.query(
        "INSERT INTO Orders (status,user_id,order_date) VALUES ($1,$2,$3) RETURNING *",
        [order.status, order.user_id, order.order_date]
      );
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot insert order. Error: ${error}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const conn = await client.connect();
      const result = await conn.query("DELETE FROM orders WHERE id=$1", [id]);
      conn.release();
      return;
    } catch (error) {
      throw new Error(`Cannot delete this order. Error: ${error}`);
    }
  }

  async update(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const result = await conn.query(
        "UPDATE orders SET status=COALESCE($1,status), user_id=COALESCE($2,user_id) WHERE id=$3 RETURNING *",
        [order.status, order.user_id, order.id]
      );

      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot update this order. Error: ${error}`);
    }
  }
}
