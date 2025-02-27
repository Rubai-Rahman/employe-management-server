import express, { Application, Request, Response } from "express";
import cors from "cors";
import { EmployeeRoutes } from "./app/modules/employee/employee.route";

const app: Application = express();
//parser
app.use(express.json({ limit: "20mb" }));
app.use(cors());

//application routes
app.use("/api/employees", EmployeeRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
