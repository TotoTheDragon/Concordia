import { FastifyInstance } from "fastify";

async function V1Router(fastify: FastifyInstance, _opts: object) {

    fastify.get("/status/", (_req, res) => {
        res.send({
            uptime: fastify.concordia.uptime,
            version: 1
        })
    })

}

export default V1Router;