"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../../models/users");
const verifyAuthToken_1 = __importDefault(require("./verifyAuthToken"));
const userRoute = express_1.default.Router();
const userStore = new users_1.UserStore();
// Get All Users
userRoute.get("/", async (req, res) => {
    try {
        const result = await userStore.index();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(404).send("Failed to load users");
    }
});
//Insert User
userRoute.post("/create", async (req, res) => {
    try {
        if (!req.body.firstname || !req.body.lastname) {
            res.status(400).send("Invalid Parameters");
        }
        else {
            const user = {
                id: 0,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: req.body.password,
            };
            const result = await userStore.add(user);
            res.status(200).json(result);
        }
    }
    catch (error) {
        res.status(404).send("Failed to insert user");
    }
});
//Delete User
userRoute.delete("/", verifyAuthToken_1.default, async (req, res) => {
    try {
        const id = req.body.id;
        if (!id) {
            res.status(400).send("Invalid Parameters");
        }
        else {
            const result = await userStore.delete(id);
            res.status(200).send("User successfully deleted");
        }
    }
    catch (error) {
        res.status(404).send("Failed to delete user");
    }
});
//Update User
userRoute.put("/", verifyAuthToken_1.default, async (req, res) => {
    try {
        if (!req.body.id) {
            res.status(400).send("Invalid Parameters");
        }
        else {
            const user = {
                id: req.body.id,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: req.body.password,
            };
            const result = await userStore.update(user);
            res.status(200).json(result);
        }
    }
    catch (error) {
        res.status(404).send(`Failed to update user. Error :${error}`);
    }
});
//Login User
userRoute.post("/login", async (req, res) => {
    try {
        if (!req.body.userName || !req.body.password) {
            res.status(400).send("Invalid user name or password");
        }
        else {
            const result = await userStore.login(req.body.userName, req.body.password);
            res.status(200).json(result);
        }
    }
    catch (error) {
        res.status(404).send(`Failed to login. Error :${error}`);
    }
});
exports.default = userRoute;
