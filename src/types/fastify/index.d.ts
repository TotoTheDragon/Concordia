import { APIManager } from "../../api/APIManager";
import { ConcordiaManager } from "../ConcordiaManager";

declare module 'fastify' {
    interface FastifyInstance {
        concordia: ConcordiaManager;
        apiManager: APIManager;
    }
}