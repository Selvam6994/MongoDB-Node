// const express = require("express");
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from "express";
import { MongoClient } from "mongodb";
const app = express();

const PORT = process.env.PORT;
console.log(process.env.PORT);
//const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL= process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");
//apply middleware globally.
app.use(express.json());

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
  
});


app.get("/movies",async function (request, response) {
  const movies = await client
  .db("mongodb")
  .collection("movies")
  .find({}).toArray();
  response.send(movies);
});

app.get("/movies/:id", async function (request, response) {
  const { id } = request.params;
  const movie = await client
    .db("mongodb")
    .collection("movies")
    .findOne({ id: id });
  // response.send(movie);
  movie ? response.send(movie) : response.status(404).send("no match found");
});

//express.json() - middleware
app.post("/movies",  async function (request, response) {
  const data = request.body;
  console.log(data);
  const result = await client
    .db("mongodb")
    .collection("movies")
    .insertMany(data);
  response.send(result);
});

app.delete("/movies/:id", async function (request, response) {
  const { id } = request.params;
  const result = await client
    .db("mongodb")
    .collection("movies")
    .deleteMany({ id: id });
  result.deletedCount>=1? response.send({message:"Deleted Successfully"}) : response.status(404).send("no match found");
});

app.put("/movies/:id", async function (request, response) {
  const { id } = request.params;
  const data = request.body;
  const update_result = await client
    .db("mongodb")
    .collection("movies")
    .updateOne({ id: id },{$set:data});
  // response.send(movie);
  update_result ? response.send(update_result) : response.status(404).send("no match found");
});


app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
