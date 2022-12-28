import Fastify from 'fastify'
import Ajv from 'ajv'
import handler from './routers.js'

const ajv = new Ajv({
  removeAdditional: true,
  coerceTypes: false
})

const fastify = Fastify({
  logger: true
})

fastify.setValidatorCompiler(({ schema, method, url, httpPart }) => {
  return ajv.compile(schema)
})

fastify.register(handler, {
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
