import express from 'express'
import colors from 'colors'
import { OrdenController } from './controllers/OrdenController'
import OrdenRouter from './routes/OrdenRouter'
import { globalErrorHandler } from './middleware/errorHandler'

const app = express()
app.use(express.json())

app.use('/api/orden', OrdenRouter)
app.use(globalErrorHandler);

export default app