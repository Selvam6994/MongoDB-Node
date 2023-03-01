import { client } from "../index.js";

export async function putMovieById(id, data) {
  return await client
    .db("mongodb")
    .collection("movies")
    .updateOne({ id: id }, { $set: data });
}
export async function deleteMovieByName(name) {
  return await client
    .db("mongodb")
    .collection("movies")
    .deleteMany({ name: name });
}
export async function postMovie(data) {
  return await client
    .db("mongodb")
    .collection("movies")
    .insertOne(data);
}
export async function getMovieByName(name) {
  return await client
    .db("mongodb")
    .collection("movies")
    .findOne({ name: name });
}
export async function getMovie() {
  return await client
    .db("mongodb")
    .collection("movies")
    .find({})
    .toArray();
}
