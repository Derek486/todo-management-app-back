import express, { Response } from 'express'
import { APP_CORS, APP_HOST, APP_PORT } from './config'
import helmet from 'helmet'

const app = express()

app.set('PORT', APP_PORT)
app.set('HOST', APP_HOST)
app.set('CORS_ORIGIN', APP_CORS)

app.use(express.json())
app.use(helmet())

app.disable('x-powered-by')

/**
 * Routers here
 */

app.use((_, res, __) => {
  res.status(404).json({ message: 'Resource not found' });
});

app.use((err: any, _: any, res: Response) => {
  console.error(err.stack)
  res.status(500).json({ message: 'An unexpected error has occurred', error: err.message })
});

export default app