// const express = require("express");
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from "express";
import { MongoClient } from "mongodb";
import movieRouter from './router/movies.router.js';
import usersRouter from './router/users.router.js'
import cors from "cors";


const app = express();

const PORT = process.env.PORT;
//const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL;
export const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");
//apply middleware globally.
app.use(cors());
app.use(express.json());

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.use('/movies',movieRouter);
app.use('/users',usersRouter);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

