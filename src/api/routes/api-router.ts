import { FastifyInstance } from "fastify";
import V1Router from "./v1/v1-router";
import V2Router from "./v2/v2-router";

async function APIRouter(fastify: FastifyInstance, opts: object) {

    // Default
    fastify.register(V1Router, { prefix: "/" });

    // V1
    fastify.register(V1Router, { prefix: "v1/" });

    // V2 (not registered, just here for future use)
    // fastify.register(V2Router, { prefix: "v2/" });
}

export default APIRouter;