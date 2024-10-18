import express, { Express, Request } from 'express'
import {router as roomRouter} from "./routes/roomREST.js"
import {router as userRouter} from "./routes/usersREST.js"
import {router as dmRouter} from "./routes/dmREST.js"
// import {router as loginRouter} from "./routes/protectedREST.js"
const port: number = Number(process.env.PORT || 1234)
const app: Express = express()


app.use('/', express.json())

app.use('/', (req: Request, _, next) => {
	console.log(`${req.method}  ${req.url}`, req.body)
	next()
})

app.use('/', express.static('./dist'))

// app.use("/api/login", loginRouter)
app.use("/api/rooms", roomRouter)
app.use("/api/users", userRouter)
app.use("/api/dm", dmRouter)





app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})