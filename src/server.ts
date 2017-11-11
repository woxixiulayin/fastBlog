import './lib/mongo'
import * as fs from 'fs'
import * as path from 'path'
import * as fastify from 'fastify'
import { router, controllers } from './routes'
const config = JSON.parse(fs.readFileSync(path.resolve('../config.json'), { encoding: 'utf-8'}))

const app: fastify.FastifyInstance = fastify()

app.register(require('fastify-static'), {
  root: path.join(__dirname, '../public'),
  prefix: '/public/', // optional: default '/'
//   page404Path: path.join(__dirname, 'public', '404.html'), // optional
//   page403Path: path.join(__dirname, 'public', '403.html'), // optional
//   page500Path: path.join(__dirname, 'public', '500.html')  // optional
})

app.register(require('fastify-formbody'), {}, (err) => {
  if (err) throw err
})

app.register(require('fastify-cookie'), {}, (err) => {
  if (err) {
      console.log('cookie error')
      throw err
  }
})
  

app.register(require('fastify-session'), {
    secret: '123456',
    cookieName: 'sessionId',
    cookie: {
        // close secure to enable set cookie in http
        secure: false
    }
},
    (err) => {
  if (err) throw err
})


router.createRoutes(app, controllers)

// Run the server!
app.listen(config.port, (err) => {
  if (err) throw err
  console.log(`app listen at port: ${config.port}`)
})
