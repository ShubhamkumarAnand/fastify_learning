import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

const server: FastifyInstance = Fastify({});

const opts: RouteShorthandOptions = {
	schema: {
		response: {
			200: {
				type: 'object',
				properties: {
					pong: {
						type: 'string',
					},
				},
			},
		},
	},
};

server.get('/ping', opts, async (req, res) => {
	return { pong: 'It Worked' };
});

const start = async () => {
	try {
		await server.listen({ port: 3000 });
		const address = await server.server.address();
		const port = typeof address === 'string' ? address : address?.port;
	} catch (error) {
		server.log.error(error);
		process.exit(1);
	}
};

start();
