"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { TOKEN_SECRET: tokenSecret } = process.env;
const verifyAuthToken = (req, res, next) => {
    try {
        if (tokenSecret) {
            const token = req.body.token;
            jsonwebtoken_1.default.verify(token, tokenSecret);
            next();
        }
        else {
            res.status(401);
            res.json("Missing env. variable");
            return;
        }
    }
    catch (err) {
        res.status(401);
        res.json("Access denied, invalid token");
        return;
    }
};
exports.default = verifyAuthToken;
