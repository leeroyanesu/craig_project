import dotenv from 'dotenv'
dotenv.config()
import app from './utils/app' // (server)
import dataRoutes from './routes/data'

const bootstrap = async () => {

  app.get('/', (req, res) => {
    res.status(200).send('Hello, world!')
  })

  app.get('/healthz', (req, res) => {
    res.status(204).end()
  })

  app.use('/data', dataRoutes)
  // add rest of routes here...

  app.listen(8080, () => {
    console.log(`✅ Server is listening on port: ${8080}`)
  })
}

bootstrap()
