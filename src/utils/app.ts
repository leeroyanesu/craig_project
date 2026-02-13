import express from 'express'
import cors from 'cors'

// initialize app
const app = express()

// middlewares
app.use(cors({ origin: '*' }))
app.use(express.json()) // body parser
app.use(express.urlencoded({ extended: false })) // url parser

export default app
