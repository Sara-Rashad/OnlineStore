import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import mainRoute from "./routes/index";

const app: express.Application = express();
const address = "0.0.0.0:3000";

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

mainRoute(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
