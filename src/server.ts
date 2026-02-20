import express from 'express' 
import colors from 'colors'
import { connectDB } from './config/db'
// import { connectDB } from './config/db'
// import budgetRouter from './routes/budgetRouter'
connectDB()

const app = express()
app.use(express.json())

export default app