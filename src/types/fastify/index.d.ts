import { ConcordiaManager } from "../ConcordiaManager";

declare module 'fastify' {
    interface FastifyInstance {
        concordia: ConcordiaManager;
    }
}