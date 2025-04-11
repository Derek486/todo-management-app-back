import express from 'express'
import { APP_CORS, APP_HOST, APP_PORT } from './config'
import helmet from 'helmet'
import cors from 'cors'

import todoRouter from './routes/todo.router'
import authRouter from './routes/auth.router'

const app = express()

app.set('PORT', APP_PORT)
app.set('HOST', APP_HOST)
app.set('CORS_ORIGIN', APP_CORS)

app.use(express.json())
app.use(helmet())

if (app.get('CORS_ORIGIN')) {
  app.use(cors({
    origin: app.get('CORS_ORIGIN')
  }))
}

app.disable('x-powered-by')

/**
 * Routers here
 */
app.use('/api/todos', todoRouter)
app.use('/api/auth', authRouter)

app.use('**', (_req, res, _next) => {
  res.status(404).json({ message: 'Resource not found' });
});

export default app