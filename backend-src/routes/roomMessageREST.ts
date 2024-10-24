import express, { Request, Response, Router } from "express";
import { RoomMessage } from "../models/RoomMessage";
import { WithId } from "mongodb";
import { getAllMessages } from "../mongoDB-src/rommMessages/getAllMessages.js";
import { isValidRoomMessage } from "../validation/validateRoomMessage.js";
import { insertRoomMessage } from "../mongoDB-src/rommMessages/insertRoomMessage.js";

export const router: Router = express.Router();


router.get("/", async(_, res: Response<WithId<RoomMessage>[]>) => {
    try{
        const allMessages: WithId<RoomMessage>[] = await getAllMessages();
        if ( !allMessages || allMessages.length === 0) {
            res.sendStatus(404)
        }
        res.send(allMessages)
    }catch (error) {
        res.sendStatus(500)
    }

})

router.post('/room', async (req: Request, res: Response) => {
    console.log("inne i room");
    
    const newMessage: RoomMessage = req.body
    
    if(isValidRoomMessage(newMessage)){
        console.log("validation sucess");
        
      await insertRoomMessage(newMessage)
      res.sendStatus(201)
    }
    else{
      res.sendStatus(400)
    }
  })
  