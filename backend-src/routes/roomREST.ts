import express, { Response, Router } from "express";
import { WithId } from "mongodb";
import { Room } from "../models/Room.js";
import { getAllRooms } from "../mongoDB-src/rooms/getAllRooms.js";

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