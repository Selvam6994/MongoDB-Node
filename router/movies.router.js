import express from "express";
import {
  getMovie,
  getMovieByName,
  postMovie,
  deleteMovieByName,
  putMovieById,
} from "../service/movies.service.js";
const router = express.Router();

router.get("/", async function (request, response) {
  const movies = await getMovie();
  response.send(movies);
});
//Mock api
router.get("/:name", async function (request, response) {
  const { name } = request.params;
  const movie = await getMovieByName(name);
  // response.send(movie);
  movie ? response.send(movie) : response.status(404).send("no match found");
});

//express.json() - middleware
router.post("/", async function (request, response) {
  const data = request.body;
  console.log(data);
  const result = await postMovie(data);
  response.send(result);
});

router.delete("/:name", async function (request, response) {
  const { name } = request.params;
  const result = await deleteMovieByName(name);
  result.deletedCount >= 1
    ? response.send({ message: "Deleted Successfully" })
    : response.status(404).send("no match found");
});

router.put("/:id", async function (request, response) {
  const { id } = request.params;
  const data = request.body;
  const update_result = await putMovieById(id, data);
  // response.send(movie);
  update_result
    ? response.send(update_result)
    : response.status(404).send("no match found");
});

export default router;
