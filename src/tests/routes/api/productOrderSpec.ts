import supertest from "supertest";
import app from "../../../server";
import { Product, ProductStore } from "../../../models/products";
import { Order, OrderStore } from "../../../models/orders";
import { User, UserStore } from "../../../models/users";
import { ProductOrder, ProductOrderStore } from "../../../models/productOrder";

const request = supertest(app);

describe("Test Product", () => {
  let product: Product;
  let order: Order;
  let user: User;
  let productOrder: ProductOrder;
  let token: string | null;

  const productStore = new ProductStore();
  const orderStore = new OrderStore();
  const userStore = new UserStore();
  const productOrderStore = new ProductOrderStore();

  beforeAll(async () => {
    product = await productStore.add({
      id: 0,
      name: "product1",
      price: 30,
      insert_date: new Date(),
    });
    const userObj = {
      id: 0,
      firstname: "productOrderUser",
      lastname: "name2",
      password: "123",
    };
    user = await userStore.add(userObj);
    token = await userStore.login(userObj.firstname, userObj.password);
    order = await orderStore.add({
      id: 0,
      user_id: user.id,
      status: 2,
      order_date: new Date(),
    });
    productOrder = await productOrderStore.add({
      id: 0,
      product_id: product.id,
      order_id: order.id,
      quantity: 200,
    });
  });

  it("Test Get All Product Orders", async () => {
    await request
      .get("/api/productOrders")
      .send({ product_id: product.id })
      .expect(200);
  });

  it("Test Add Product", async () => {
    await request
      .post("/api/productOrders/create")
      .send({
        product_id: product.id,
        order_id: order.id,
        quantity: 50,
        token: token,
      })
      .expect(200);
  });

  it("Test Failed To Add Product Order", async () => {
    await request
      .post("/api/productOrders/create")
      .send({
        productId: product.id,
        order_id: order.id,
        quantity: 50,
        token: token,
      })
      .expect(400);
  });

  it("Test Delete Product Order", async () => {
    await request
      .delete("/api/productOrders/")
      .send({ id: productOrder.id, token: token })
      .expect(200);
  });
});
