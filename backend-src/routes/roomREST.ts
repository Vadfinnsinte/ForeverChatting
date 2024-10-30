import express, { Request, Response, Router } from "express";
import { WithId } from "mongodb";
import { Room } from "../models/Room.js";
import { getAllRooms } from "../mongoDB-src/rooms/getAllRooms.js";
import { isValidRoom } from "../validation/validateRoom.js";
import { insertRoom } from "../mongoDB-src/rooms/insertRoom.js";

export const router: Router = express.Router();


router.get("/", async(_, res: Response<WithId<Room>[]>) => {
    try{
        const allRooms: WithId<Room>[] = await getAllRooms();
        if ( !allRooms || allRooms.length === 0) {
            res.sendStatus(404)
        }
        res.send(allRooms)
    }catch (error) {
        res.sendStatus(500)
    }

})

router.post("/new-room", async (req:Request, res:Response) => {

    const newRoom: Room = req.body
    const rooms = await getAllRooms()
    const roomAvailability = rooms.find( room => room.name === newRoom.name)
    
    if(isValidRoom(newRoom) && roomAvailability === undefined ) {
      await insertRoom(newRoom)
      res.sendStatus(201)
    }
    else {
      res.sendStatus(400)
    }
  
  })