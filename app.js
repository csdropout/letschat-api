import "dotenv/config";
import express from "express";
import cors from "cors";
import userRouter from "./routes/userRouter";
import messageRouter from "./routes/messageRouter";

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", userRouter);
app.use("/messages", messageRouter);

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) console.error(err);
  console.log(`Listening on port ${port}`);
});
