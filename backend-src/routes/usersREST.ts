import express, { Request, Response, Router } from "express";
import { WithId } from "mongodb";
import { User } from "../interfaces/User.js";
import { searchUser } from "../mongoDB-src/users/searchUsers.js";
import { getAllUsers } from "../mongoDB-src/users/getAllUsers.js";


export const router: Router = express.Router();



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