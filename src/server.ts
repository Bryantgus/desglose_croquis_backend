import express from 'express'
import colors from 'colors'
import { OrdenController } from './controllers/OrdenController'
import OrdenRouter from './routes/OrdenRouter'
import { globalErrorHandler } from './middleware/errorHandler'
import cors from 'cors'
const app = express()

app.use(cors({
  origin: 'http://localhost:5173', // La URL de tu frontend (Vite por defecto)
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true // Por si luego usas cookies o sesiones
}));

app.use(express.json())

app.use('/api/orden', OrdenRouter)
app.use(globalErrorHandler);

export default app