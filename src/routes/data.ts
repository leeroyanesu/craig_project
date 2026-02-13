import express from 'express'
import errorHandler from '../middlewares/error-handler'
import chatWithHealthBot from '../controllers/data/chat'

// initialize router
const router = express.Router()

// POST at path: http://localhost:8080/data/chat (no authentication required)
router.post('/chat', chatWithHealthBot, errorHandler)


export default router
