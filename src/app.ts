import "dotenv/config";

import express, { Express } from "express";
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req: any, res: any) => {
//   res.send("Rest API with Prisma ORM");
// });

//import routes
import { router as userRouter } from "./routes/user.route.js";

// //routes declaration
app.use("/api/v1/user", userRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
