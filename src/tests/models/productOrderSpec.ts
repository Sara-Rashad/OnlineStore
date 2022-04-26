import { ProductOrder, ProductOrderStore } from "../../models/productOrder";
import { Product, ProductStore } from "../../models/products";
import { Order, OrderStore } from "../../models/orders";

const store = new ProductOrderStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();

describe("ProductOrder model", () => {
  let productOrder: ProductOrder;
  let product: Product;
  let order: Order;

  beforeAll(async () => {
    const todayDate = new Date();
    product = await productStore.add({
      id: 0,
      name: "new product",
      price: 50,
      insert_date: todayDate,
    });
    order = await orderStore.add({
      id: 0,
      status: 1,
      user_id: 1,
      order_date: todayDate,
    });
  });

  it("Add method should create product order", async () => {
    productOrder = await store.add({
      id: 0,
      product_id: product.id,
      order_id: order.id,
      quantity: 20,
    });
    expect(productOrder.quantity).toEqual(20);
  });

  it("Get method should show orders of specific product", async () => {
    const result = await store.get(product.id);
    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it("Delete method should delete 1 product order", async () => {
    const result = await store.delete(productOrder.id);
  });
});
