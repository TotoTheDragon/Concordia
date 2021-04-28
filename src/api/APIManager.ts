import fastify, { FastifyInstance } from "fastify";
import { ConcordiaManager } from "../ConcordiaManager";

export class APIManager {

    manager: ConcordiaManager;

    _app: FastifyInstance;

    constructor(manager: ConcordiaManager) {
        this.manager = manager;
        this._app = fastify();
        this.setupLogging();
        this.setupDefaultRoutes();
    }

    listen() {
        this._app.listen(this.manager.options.APIport, this.manager.options.APIhost, (err, address) => {
            if (err)
                this.manager.logger.error(
                    "Error on starting API listener",
                    "API",
                    err
                );
            else
                this.manager.logger.info(
                    "Started listening",
                    "API",
                    {
                        address
                    }
                );
        }
        );
    }

    setupLogging() {
        this._app.addHook("preHandler", (req, res, done) => {
            this.manager.logger.http(`${req.method} ${req.url} (${req.id})`)
            done();
        })
    }

    setupDefaultRoutes() {
        this._app.get("/stats", (req, res) => {
            res.status(200).send({ uptime: Date.now() - this.manager.startDate });
        });
    }

}