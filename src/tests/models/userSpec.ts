import { User, UserStore } from "../../models/users";

const store = new UserStore();
let user: User;
describe("User model", () => {
  it("Add method should create user", async () => {
    user = await store.add({
      id: 0,
      firstname: "new user",
      lastname: "user2",
      password: "1234",
    });
    expect(user.firstname).toEqual("new user");
  });

  it("Index method should show users", async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it("Get method should show 1 user", async () => {
    const result = await store.get(user.id);
    expect(result.firstname).toBe("new user");
  });

  it("Delete method should delete 1 user", async () => {
    const result = await store.delete(user.id);
  });
});
