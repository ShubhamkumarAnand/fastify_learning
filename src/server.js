import Fastify from 'fastify'
import users from './users.json' assert {type: 'json'}

const fastify = Fastify({
  logger: false
})

fastify.get('/getUsers',async (request, reply) => {
  const { gender } = await request.query
  if(!gender) return users
  const filteredUsers = users.filter((user) => user.gender.toLowerCase() === gender.toLowerCase())
  return filteredUsers
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
