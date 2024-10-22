import express, { Request, Response, Router } from "express";
import jwt from 'jsonwebtoken'
import { DM } from "../models/DM.js"
import { isValidDM } from "../validation/validateDM.js";
import { insertDM } from "../mongoDB-src/DMs/insertDM.js";
import { getMatchingDmNames } from "../mongoDB-src/DMs/getMatchingDm.js";

const { verify } = jwt

export const router: Router = express.Router();

interface Payload {
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