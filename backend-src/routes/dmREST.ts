import express, { Request, Response, Router } from "express";
import jwt from 'jsonwebtoken'
import { DM } from "../models/DM.js"
import { isValidDM } from "../validation/validateDM.js";
import { insertDM } from "../mongoDB-src/DMs/insertDM.js";
import { getMatchingDmNames } from "../mongoDB-src/DMs/getMatchingDm.js";
import { updateDM } from "../mongoDB-src/DMs/updateDm.js";
import { ObjectId } from "mongodb";

const { verify } = jwt

export const router: Router = express.Router();

export interface Payload {
	userId: string;
	iat: number;
}

router.post('/', async (req: Request, res: Response) => {
  const newDM: DM = req.body
  
  if(isValidDM(newDM)){
    await insertDM(newDM)
    res.sendStatus(201)
  }
  else{
    res.sendStatus(400)
  }
})

router.get("/matching", async (req: Request, res: Response) => {

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
    let users = await getMatchingDmNames(userName)
    if(users) {
      res.send(users)

    }else {
      res.sendStatus(400)
    }
    
   
})

router.put("/change-senders/:id", async (req: Request , res:Response)=> {
 console.log("PUT: changeSender");
 
  const id = req.params.id
  const objectId = new ObjectId(id)
  
  if(!ObjectId.isValid(id)){
    res.sendStatus(404)
  }
  const {username} = req.body
  console.log(username);
  const result = await updateDM(username, objectId)
 
  if(!result) {
     res.sendStatus(500)
  }else {
    const { resultSender, resultReceiver } = result;
   
    if (resultSender.matchedCount === 0 && resultReceiver.matchedCount === 0) {
        res.sendStatus(204); // No content
    } else {
        res.sendStatus(200); // Success, change was made
    }

  }
})
