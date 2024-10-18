// import { validateLogin } from "../validation/validateLogin.js"
// import jwt from 'jsonwebtoken'
// import express, { Request, Response, Router } from "express";
// import { getOneUsers } from "../mongoDB-src/users/getAllUsers.js";
// import { ObjectId } from "mongodb";
// import { getAllRooms } from "../mongoDB-src/rooms/getAllRooms.js";

// const { sign } = jwt

// export const router: Router = express.Router();

// interface Payload {
// 	userId: ObjectId;
// 	iat: number;
// }
// type UserId = ObjectId

// router.post('/login', async (req: Request, res: Response) => {
//     console.log("entered POST");
    
// 	if( !process.env.SECRET ) {
// 		res.sendStatus(500)
// 		return
// 	}
	
// 	console.log('Body är: ', req.body)
// 	const userId = validateLogin(req.body.username, req.body.password)
// 	// const userId = await getOneUsers(req.body.username, req.body.password)
// 	console.log('user id: ', userId)

// 	if( !userId ) {
// 		res.status(401).send({
// 			"error": "Unauthorized",
// 			"message": "You are not authorized to access this resource."
// 		})
// 		return
// 	}

// 	const payload = {
// 		userId
// 	}
// 	const token: string = sign(payload, process.env.SECRET)
// 	res.send({ jwt: token })
// })

// router.get('/protected', (req: Request, res: Response) => {
// 	if( !process.env.SECRET ) {
// 		res.sendStatus(500)
// 		return
// 	}

// 	let token = req.headers.authorization
// 	console.log('Header:', token)
// 	if( !token ) {

// 		res.sendStatus(401)
// 		return
// 	}
// 	let payload: Payload
// 	try {
// 		payload = verify(token, process.env.SECRET) as Payload
// 		console.log('Payload: ', payload)
// 	} catch(error) {
// 		res.sendStatus(400) 
// 		return
// 	}
// 	let userId: UserId = payload.userId
	
// 	// const allRooms = getAllRooms()

// 	const data = getAllRooms()
// 	res.send(data)
// })