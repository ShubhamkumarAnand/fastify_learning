import Fastify from 'fastify'
import handler from './routers.js'

const fastify = Fastify({
  logger: true
})

fastify.register(handler , {
  prefix: '/api'
})

const PORT = process.env.PORT || 8000

const start = async () => {
  try {
    await fastify.listen(PORT)
    console.log(`Currently Running on Port: ${PORT}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
