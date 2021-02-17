import { MessageHandler } from "./handlers/AbstractHandler";
import { SimpleLogger } from "./Logger";
import { PluginManager } from "./plugins/PluginManager";
import { ServerPlugin } from "./plugins/ServerPlugin";
import { ConcordiaOptions, DefaultConcordiaOptions } from "./util/Constants";
import { Util } from "./util/Util";
import { WebSocketManager } from "./WebsocketManager";

export class ConcordiaManager {

    options: ConcordiaOptions;

    logger: SimpleLogger;

    websocketManager: WebSocketManager;

    pluginManager: PluginManager;


    constructor(options?: ConcordiaOptions) {
        this.options = Util.mergeDefault(DefaultConcordiaOptions, options);

        this.logger = new SimpleLogger(true);

        this.websocketManager = new WebSocketManager(this);

        this.pluginManager = new PluginManager(this);
    }

    registerHandler(handler: MessageHandler): void {
        return handler.register(this.websocketManager);
    }

    registerPlugin(plugin: ServerPlugin): void {
        return this.pluginManager.registerPlugin(plugin);
    }

}