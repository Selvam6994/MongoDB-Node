import express from "express";
import { postUser } from "../service/users.service.js";
const router = express.Router();
import bcrypt from "bcrypt";


async function generateHashPassword(password){
    const NO_OF_ROUNDS = 10;
    const salt = await bcrypt.genSalt(NO_OF_ROUNDS)
    const hashPassword = await bcrypt.hash(password,salt);
    console.log(salt);
    console.log(hashPassword);
    return hashPassword
  }
  


router.post("/signup", async function (request, response) {
  const {username,password} = request.body;
  const hashedPassword = await generateHashPassword(password);
  const result = await postUser({
    username:username,
    password:hashedPassword
  });
  response.send(result);
});

export default router;
