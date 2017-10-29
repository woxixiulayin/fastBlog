import db from 'lib/mongo'
import * as fastify from 'fastify'
import config from '../config'
import { router, controllers, } from './routes'
// import { helper } from 'routes'

const app: fastify.FastifyInstance = fastify()

router.createRoutes(app, controllers)

// Run the server!
app.listen(config.port, (err) => {
  if (err) throw err
  console.log(`app listen at port: ${config.port}`)
})