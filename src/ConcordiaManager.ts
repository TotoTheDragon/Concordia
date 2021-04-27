import { Logger } from "winston";
import { APIManager } from "./api/APIManager";
import { PluginManager } from "./plugins/PluginManager";
import { ServerPlugin } from "./plugins/ServerPlugin";
import { ConcordiaOptions, DefaultConcordiaOptions } from "./util/Constants";
import { Util } from "./util/Util";
import { MessageHandler } from "./websocket/handlers/AbstractHandler";
import { WebSocketManager } from "./websocket/WebSocketManager";
import { createLogger } from "./winston/patch";
import { transport } from "./winston/transport";

export class ConcordiaManager {

    startDate: number;

    options: ConcordiaOptions;

    logger: Logger;

    websocketManager: WebSocketManager;
    pluginManager: PluginManager;
    APIManager: APIManager;

    constructor(options?: ConcordiaOptions) {
        this.options = Util.mergeDefault(DefaultConcordiaOptions, options);

        this.logger = createLogger({
            transports: transport(),
            level: this.options.logLevel ?? "info"
        });

        this.APIManager = new APIManager(this);
        this.websocketManager = new WebSocketManager(this);
        this.pluginManager = new PluginManager(this);

        this.APIManager.listen();
        this.startDate = Date.now(); // Successfully initialized. Set start date
    }

    registerHandler(handler: MessageHandler): void {
        return handler.register(this.websocketManager);
    }

    registerPlugin(plugin: ServerPlugin): void {
        return this.pluginManager.registerPlugin(plugin);
    }

    startAll() {

    }

}
