import supertest from "supertest";
import app from "../../../server";
import { User, UserStore } from "../../../models/users";
import { Order, OrderStore } from "../../../models/orders";

const request = supertest(app);

describe("Test Order", () => {
  let user: User;
  const userStore = new UserStore();
  let token: string | null;
  let order: Order;
  const orderStore = new OrderStore();

  beforeAll(async () => {
    const userObj = {
      id: 0,
      firstname: "orderUser",
      lastname: "Rashad",
      password: "123",
    };
    user = await userStore.add(userObj);
    token = await userStore.login(userObj.firstname, userObj.password);
    order = await orderStore.add({
      id: 0,
      user_id: user.id,
      status: 3,
      order_date: new Date(),
    });
  });

  it("Test Get All Orders", async () => {
    await request.get("/api/orders").expect(200);
  });

  it("Test Add Order", async () => {
    await request
      .post("/api/orders/create")
      .send({ userId: user.id, status: 3, token: token })
      .expect(200);
  });

  it("Test Failed To Add Order", async () => {
    await request
      .post("/api/orders/create")
      .send({ userId: user.id, status_number: 3, token: token })
      .expect(400);
  });

  it("Test Update Order", async () => {
    await request
      .put("/api/orders/")
      .send({ id: order.id, status: 5, token: token })
      .expect(200);
  });

  it("Test Delete Order", async () => {
    await request
      .delete("/api/orders/")
      .send({ id: order.id, token: token })
      .expect(200);
  });
});
