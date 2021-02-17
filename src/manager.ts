import WebSocket from "ws";
import { MessageHandler } from "./handlers/AbstractHandler";
import { SimpleLogger } from "./Logger";
import { DefaultConcordiaOptions } from "./util/Constants";
import { Util } from "./util/Util";
import { WebSocketManager } from "./WebsocketManager";

export class ConcordiaManager {

    options: ConcordiaOptions;

    websocketManager: WebSocketManager;

    logger: SimpleLogger;

    constructor(options?: ConcordiaOptions) {
        this.options = Util.mergeDefault(DefaultConcordiaOptions, options);

        this.logger = new SimpleLogger(true);

        this.websocketManager = new WebSocketManager(this);
    }

    registerHandler(handler: MessageHandler): void {
        return handler.register(this.websocketManager);
    }

}

export interface ConcordiaOptions {
    host?: string;
    port?: number;
}

export interface ExtendedSocket extends WebSocket {
    [x: string]: any;
    identified: boolean,
    shard: number | number[],
    shardCount: number,
    lastHeartbeat: number;
}