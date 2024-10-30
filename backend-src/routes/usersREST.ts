import express, { Request, Response, Router } from "express";
import { ObjectId, WithId } from "mongodb";
import jwt from 'jsonwebtoken'
import { User } from "../models/User.js";
import { searchUser } from "../mongoDB-src/users/searchUsers.js";
import { getAllUsers } from "../mongoDB-src/users/getAllUsers.js";
import {validateLogin} from "../validation/validateLogin.js"
import { Payload } from "./dmREST.js";
import { isValidChangeUser, isValidUser } from "../validation/validateUser.js";
import { insertUser } from "../mongoDB-src/users/insertUser.js";
import { updateUser } from "../mongoDB-src/users/updateUser.js";
import { deleteUser } from "../mongoDB-src/users/deleteUser.js";



export const router: Router = express.Router();

const { sign, verify } = jwt

interface Message {
  message: string;
}

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
  
  
  if( !process.env.SECRET ) {
    res.sendStatus(500)
    return
  }
  
  const userId = await validateLogin(req.body.username, req.body.password)
  
  
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

router.get("/search",async (req: Request , res: Response<WithId<User>[] | Message>):Promise<void> => {
  
  const searchString: string | undefined = req.query.q as string;
  
  if (!searchString) {
    res.sendStatus(400);
  }
  
  try {
    
    const results = await searchUser(searchString);
    if (results.length === 0) {
      res.status(404).send({message: "No user found"});
    }
    else {
      res.json(results);
    }
    
  } catch (error) {
    console.error("Error searching for user: ", error);
    res.status(500).send({message: "Server error"});
  }
}
);

router.get("/activeuser", async (req: Request, res: Response) => {
  
  if( !process.env.SECRET ) {
    res.sendStatus(500)
    return
  }
  let token = req.headers.authorization
  if( !token ) {
    res.sendStatus(401)
    return
  }
  let payload: Payload
  
  try {
    payload = verify(token, process.env.SECRET) as Payload
    
    
    
  } catch(error) {
    res.sendStatus(400) 
    return
  }
  
  let userName: string = payload.userId

  
  if(userName) {
    res.send(userName)
    
  }else {
    res.sendStatus(400)
  }
  
})
router.post("/new-user", async (req:Request, res:Response) => {

  const newUser: User = req.body
  const users = await getAllUsers()
  const usernameAvailability = users.find( user => user.username === newUser.username)
  
  if(isValidUser(newUser) && usernameAvailability === undefined ) {
    await insertUser(newUser)
    res.sendStatus(201)
  }
  else {
    res.sendStatus(400)
  }

})

router.put("/change-user/:id", async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id 

 if (!ObjectId.isValid(id)) {
    res.sendStatus(400)
  }
  const objectId: ObjectId = new ObjectId(id);
  const updatedFields: User = req.body;
  // console.log(req.body, "objId: ", objectId);

  if(isValidChangeUser(updatedFields)) {
    const result = await updateUser(objectId, updatedFields); 
    if(result?.matchedCount === 0) {
      res.sendStatus(404)
    }else {
      res.sendStatus(204)
    }
  } else{
    res.sendStatus(400)
  }
  
})

router.delete("/delete/:id", async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id 
  if(!ObjectId.isValid(id)) {
    res.sendStatus(400)
  }
  const objectId: ObjectId = new ObjectId(id);
  const result = await deleteUser(objectId);

  if (result?.deletedCount === 0) {
   res.sendStatus(404)
  }

  res.sendStatus(204); 

})