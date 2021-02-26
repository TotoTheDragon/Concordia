import { APIManager } from "./api/APIManager";
import { MessageHandler } from "./websocket/handlers/AbstractHandler";
import { SimpleLogger } from "./Logger";
import { PluginManager } from "./plugins/PluginManager";
import { ServerPlugin } from "./plugins/ServerPlugin";
import { ConcordiaOptions, DefaultConcordiaOptions } from "./util/Constants";
import { Util } from "./util/Util";
import { WebSocketManager } from "./websocket/WebSocketManager";

export class ConcordiaManager {

    startDate: number;

    options: ConcordiaOptions;

    logger: SimpleLogger;

    websocketManager: WebSocketManager;

    pluginManager: PluginManager;

    APIManager: APIManager;

    constructor(options?: ConcordiaOptions) {
        this.options = Util.mergeDefault(DefaultConcordiaOptions, options);

        this.logger = new SimpleLogger(true);

        this.APIManager = new APIManager(this);

        this.websocketManager = new WebSocketManager(this);

        this.pluginManager = new PluginManager(this);

        this.APIManager.listen();
        this.startDate = Date.now();
    }

    registerHandler(handler: MessageHandler): void {
        return handler.register(this.websocketManager);
    }

    registerPlugin(plugin: ServerPlugin): void {
        return this.pluginManager.registerPlugin(plugin);
    }

}
