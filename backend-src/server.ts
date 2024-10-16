import express, { Express, Request, Response } from 'express'

const port: number = Number(process.env.PORT || 1234)
const app: Express = express()

app.use('/', express.json())

app.use('/', (req, res, next) => {
	console.log(`${req.method}  ${req.url}`, req.body)
	next()
})

app.use('/', express.static('./src'))





app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})