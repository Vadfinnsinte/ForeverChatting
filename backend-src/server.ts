import express, { Express, Request } from 'express'
import {router as roomRouter} from "./routes/roomREST.js"

const port: number = Number(process.env.PORT || 1234)
const app: Express = express()

app.use('/', express.json())

app.use('/', (req: Request, _, next) => {
	console.log(`${req.method}  ${req.url}`, req.body)
	next()
})

app.use('/', express.static('./src'))

app.use("/rooms", roomRouter)



app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})