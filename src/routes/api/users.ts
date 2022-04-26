import express from "express";
import { UserStore, User } from "../../models/users";
import verifyAuthToken from "./verifyAuthToken";

const userRoute = express.Router();
const userStore = new UserStore();

// Get All Users
userRoute.get(
  "/",
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const result = await userStore.index();
      res.status(200).json(result);
    } catch (error) {
      res.status(404).send("Failed to load users");
    }
  }
);

//Insert User
userRoute.post(
  "/create",
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      if (!req.body.firstname || !req.body.lastname) {
        res.status(400).send("Invalid Parameters");
      } else {
        const user: User = {
          id: 0,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          password: req.body.password,
        };
        const result = await userStore.add(user);
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(404).send("Failed to insert user");
    }
  }
);

//Delete User
userRoute.delete(
  "/",
  verifyAuthToken,
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const id = req.body.id;
      if (!id) {
        res.status(400).send("Invalid Parameters");
      } else {
        const result = await userStore.delete(id);
        res.status(200).send("User successfully deleted");
      }
    } catch (error) {
      res.status(404).send("Failed to delete user");
    }
  }
);

//Update User
userRoute.put(
  "/",
  verifyAuthToken,
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      if (!req.body.id) {
        res.status(400).send("Invalid Parameters");
      } else {
        const user: User = {
          id: req.body.id,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          password: req.body.password,
        };
        const result = await userStore.update(user);
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(404).send(`Failed to update user. Error :${error}`);
    }
  }
);

//Login User
userRoute.post(
  "/login",
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      if (!req.body.userName || !req.body.password) {
        res.status(400).send("Invalid user name or password");
      } else {
        const result = await userStore.login(
          req.body.userName,
          req.body.password
        );
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(404).send(`Failed to login. Error :${error}`);
    }
  }
);

export default userRoute;
