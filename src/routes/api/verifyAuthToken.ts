import jwt from "jsonwebtoken";
import express from "express";

const { TOKEN_SECRET: tokenSecret } = process.env;

const verifyAuthToken = (
  req: express.Request,
  res: express.Response,
  next: () => void
) => {
  try {
    if (tokenSecret) {
      const token = req.body.token;
      jwt.verify(token, tokenSecret);
      next();
    } else {
      res.status(401);
      res.json("Missing env. variable");
      return;
    }
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
};

export default verifyAuthToken;
