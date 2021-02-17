import { MessagePayload } from "@developerdragon/dragoncordapi";
import WebSocket, { Data, Server } from "ws";
import { MessageHandler } from "./handlers/AbstractHandler";
import { HeartbeatHandler } from "./handlers/HeartbeatHandler";
import { DefaultConcordiaOptions } from "./util/Constants";
import { Util } from "./util/Util";

export class ConcordiaManager {

    options: ConcordiaOptions;

    wss: Server;

    handlers: Map<number, MessageHandler>;

    constructor(options?: ConcordiaOptions) {
        this.options = Util.mergeDefault(DefaultConcordiaOptions, options);

        /* Register server handlers */
        this.handlers = new Map();
        new HeartbeatHandler().register(this);

        /* Start server */
        this.setupServer();
    }

    setupServer() {
        if (this.wss) return;
        this.wss = new Server({ host: this.options.host, port: this.options.port });
        this.wss.on("listening", () => console.log("Now listening on port", this.wss.options.port));
        this.wss.on("connection", (ws: ExtendedSocket) => {
            ws.on("message", (data: Data) => this.handleMessage(ws, data.toString()));
            ws.send(JSON.stringify({
                op: 1,
                d: {
                    heartbeatInterval: 40000
                },
                t: null,
                s: null
            }))
        });
    }

    handleMessage(socket: ExtendedSocket, message: string) {
        console.log(message);
        try {
            const json: MessagePayload = JSON.parse(message);
            if (this.handlers.has(json.op)) return this.handlers.get(json.op).handle(this, socket, json);
        } catch (err) {
            socket.send(JSON.stringify({ error: err.message }));
            socket.terminate();
        }
    }
}

export interface ConcordiaOptions {
    host?: string;
    port?: number;
}

export interface ExtendedSocket extends WebSocket {
    identified: boolean,
    shard: number | number[],
    shardCount: number,
    lastHeartbeat: number;
}