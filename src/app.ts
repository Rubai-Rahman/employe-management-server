import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/employee/employee.route";

const app: Application = express();
//parser
app.use(express.json());
app.use(cors());

//application routes
app.use("/api/employee", UserRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
