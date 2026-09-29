import "dotenv/config";
import express from "express";
import cors from "cors";
import userRouter from "./routes/userRouter";
import messageRouter from "./routes/messageRouter";
import authRouter from "./routes/authRouter";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "./lib/prisma.js";
import passport from "passport";
import "./config/passport.js";

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);
app.use(passport.authenticate());
app.use(passport.session());

app.use("/users", userRouter);
app.use("/messages", messageRouter);

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) console.error(err);
  console.log(`Listening on port ${port}`);
});
