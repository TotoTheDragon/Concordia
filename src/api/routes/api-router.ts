import { FastifyInstance } from "fastify";
import V1Router from "./v1/v1-router";

async function APIRouter(fastify: FastifyInstance, opts: object) {

    /*
        Register v1 API
    */
    fastify.register(V1Router, { prefix: "/v1/" });

}

export default APIRouter;