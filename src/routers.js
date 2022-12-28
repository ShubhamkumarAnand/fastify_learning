import users from './users.json' assert {type: 'json'}

const handler = (fastify, opts, done) => {
  fastify.get('/getUsers', async (request, reply) => {
    const { gender } = await request.query
    if (!gender) return users
    const filteredUsers = users.filter((user) => user.gender.toLowerCase() === gender.toLowerCase())
    return filteredUsers
  })

  fastify.get('/getUsers/:id', async (request, reply) => {
    const id = parseInt(await request.params.id, 10)
    const user = users.find(user => user.id === id)
    return (user || reply.status(404).send({
      msg: 'User Not Found'
    }))
  })

  done()
}

export default handler;
