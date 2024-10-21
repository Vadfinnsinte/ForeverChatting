import express, { Request, Response, Router } from "express";
import { WithId } from "mongodb";
import jwt from 'jsonwebtoken'
import { User } from "../models/User.js";
import { searchUser } from "../mongoDB-src/users/searchUsers.js";
import { getAllUsers } from "../mongoDB-src/users/getAllUsers.js";
import {validateLogin} from "../validation/validateLogin.js"


export const router: Router = express.Router();

const { sign } = jwt

router.get("/", async(_, res: Response<WithId<User>[]>) => {
    try{
        const allUsers: WithId<User>[] = await getAllUsers();
        if ( !allUsers || allUsers.length === 0) {
            res.sendStatus(404)
        }
        res.send(allUsers)
    }catch (error) {
        res.sendStatus(500)
    }

})
router.post('/login', async (req: Request, res: Response) => {
  console.log("entered POST");
  
if( !process.env.SECRET ) {
  res.sendStatus(500)
  return
}

console.log('Body är: ', req.body)
const userId = validateLogin(req.body.username, req.body.password)
// const userId = await getOneUsers(req.body.username, req.body.password)
console.log('user id: ', userId)

if( !userId ) {
  res.status(401).send({
    "error": "Unauthorized",
    "message": "You are not authorized to access this resource."
  })
  return
}

const payload = {
  userId
}
const token: string = sign(payload, process.env.SECRET)
res.send({ jwt: token })
})

router.get("/search",async (req: Request , res: Response<WithId<User>[] | string>):Promise<void> => {

    //   console.log(req.query);
      const searchString: string | undefined = req.query.q as string;
      console.log(searchString);
      
      if (!searchString) {
        res.sendStatus(400);
      }
      
      try {
        
        const results = await searchUser(searchString);
            if (results.length === 0) {
             res.status(404).send("No user found");
            }
            else {
            res.json(results);
            }
  
      } catch (error) {
        console.error("Error searching for user: ", error);
        res.status(500).send("Server error");
      }
    }
  );