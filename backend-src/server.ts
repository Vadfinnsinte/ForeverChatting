import express, { Express, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import {router as roomRouter} from "./routes/roomREST.js"
import {router as userRouter} from "./routes/usersREST.js"
import {router as dmRouter} from "./routes/dmREST.js"
import { validateLogin } from './validation/validateLogin.js'
const port: number = Number(process.env.PORT || 1234)
const app: Express = express()

const { sign, verify } = jwt
app.use('/', express.json())

app.use('/', (req: Request, _, next) => {
	console.log(`${req.method}  ${req.url}`, req.body)
	next()
})

app.use('/', express.static('./src'))

app.use("/rooms", roomRouter)
app.use("/users", userRouter)
app.use("/dm", dmRouter)



app.post('/login', (req: Request, res: Response) => {
	if( !process.env.SECRET ) {
		res.sendStatus(500)
		return
	}
	
	console.log('Body är: ', req.body)
	const userId = validateLogin(req.body.username, req.body.password)
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



app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})