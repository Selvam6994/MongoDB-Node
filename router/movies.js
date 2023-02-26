import express from "express";
import {client} from "../index.js"
const  router = express.Router();

  
  router.get("/", async function (request, response) {

const movies = await client
      .db("mongodb")
      .collection("movies")
      .find({})
      .toArray();
    response.send(movies);
  });
  //Mock api
  router.get("/:id", async function (request, response) {
    const { id } = request.params;
    const movie = await client
      .db("mongodb")
      .collection("movies")
      .findOne({ id: id });
    // response.send(movie);
    movie ? response.send(movie) : response.status(404).send("no match found");
  });
  
  //express.json() - middleware
  router.post("/", async function (request, response) {
    const data = request.body;
    console.log(data);
    const result = await client
      .db("mongodb")
      .collection("movies")
      .insertOne(data);
    response.send(result);
  });
  
  router.delete("/:_id", async function (request, response) {
    const { id } = request.params;
    const result = await client
      .db("mongodb")
      .collection("movies")
      .deleteMany({ _id: id });
    result.deletedCount >= 1
      ? response.send({ message: "Deleted Successfully" })
      : response.status(404).send("no match found");
  });
  
  router.put("/:id", async function (request, response) {
    const { id } = request.params;
    const data = request.body;
    const update_result = await client
      .db("mongodb")
      .collection("movies")
      .updateOne({ id: id }, { $set: data });
    // response.send(movie);
    update_result
      ? response.send(update_result)
      : response.status(404).send("no match found");
  });

  export default router;