import mongo from './lib/mongo'
import logger from './lib/logger'
import * as fs from 'fs'
import * as path from 'path'
import * as fastify from 'fastify'

const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config.json'), { encoding: 'utf-8'}))
mongo.connect(config.mongodb)

import { createRoutes } from './router'

const app: fastify.FastifyInstance = fastify()

app.register(require('fastify-static'), {
  root: path.join(__dirname, '../public'),
  prefix: '/public', // optional: default '/'
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

createRoutes(app)

// Run the server!
app.listen(config.port, (err) => {
  if (err) throw err
  console.log(`app listen en at port: ${config.port}`)
})
