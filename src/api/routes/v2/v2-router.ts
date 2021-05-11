import { FastifyInstance } from "fastify";

async function V2Router(fastify: FastifyInstance, _opts: object) {

    fastify.get("/status/", (_req, res) => {
        res.send({
            uptime: fastify.concordia.uptime,
            version: 2
        })
    })

}

export default V2Router;