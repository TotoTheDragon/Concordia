import { info } from "console";
import express, { Application, IRoute } from "express";
import { ConcordiaManager } from "../ConcordiaManager";
import { ServerPlugin } from "../plugins/ServerPlugin";

export class APIManager {

    manager: ConcordiaManager;

    _app: Application

    constructor(manager: ConcordiaManager) {
        this.manager = manager;
        this._app = express();
        this.setupDefaultRoutes();
    }

    listen() {
        this._app.listen(this.manager.options.APIport, this.manager.options.APIhost, () => this.manager.logger.emit("LOG", "API", "Now listening on", `${this.manager.options.APIhost}:${this.manager.options.APIport}`));
    }

    setupDefaultRoutes() {
        this.getRoute().get((req, res) => {
            res.status(200).send({ uptime: Date.now() - this.manager.startDate });
        });
    }

    getRoute(plugin?: ServerPlugin, ...route: string[]): IRoute {
        console.log([plugin?.identifier || undefined, ...route].filter(x => x !== undefined))
        return this._app.route("/" + [plugin?.identifier || undefined, ...route].filter(x => x !== undefined).join("/"));
    }
}