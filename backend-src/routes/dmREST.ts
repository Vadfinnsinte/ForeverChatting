import express, { Request, Response, Router } from "express";

import { DM } from "../interfaces/DM.js"
import { isValidDM } from "../validation/validateDM.js";
import { insertDM } from "../mongoDB-src/DMs/insertDM.js";


export const router: Router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const newDM: DM = req.body
    // const isadminstring = String(newUser.isAdmin)
    if(isValidDM(newDM)){
      await insertDM(newDM)
      res.sendStatus(201)
    }
    else{
      res.sendStatus(400)
    }
  })