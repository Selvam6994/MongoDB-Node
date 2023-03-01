import { client } from "../index.js";

export async function postUser(data) {
  return await client
    .db("mongodb")
    .collection("users")
    .insertOne(data);
}