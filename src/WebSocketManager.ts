import { MessagePayload } from "@developerdragon/dragoncordapi";
import { Data, Server } from "ws";
import { MessageHandler } from "./handlers/AbstractHandler";
import { HeartbeatHandler } from "./handlers/HeartbeatHandler";
import { IdentifyHandler } from "./handlers/IdentifyHandler";
import { ConcordiaManager, ExtendedSocket } from "./manager";

export class WebSocketManager {

    manager: ConcordiaManager;

    wss: Server;

    handlers: Map<number, MessageHandler>;

    cleanup: NodeJS.Timeout;


    constructor(manager: ConcordiaManager) {
        this.manager = manager;

        /* Register server handlers */
        this.handlers = new Map();
        new HeartbeatHandler().register(this);
        new IdentifyHandler().register(this);

        /* Start server */
        this.setupServer();
        this.startCleanup();
    }

    setupServer() {
        if (this.wss) return;
        this.wss = new Server({ host: this.manager.options.host, port: this.manager.options.port });
        this.wss.on("listening", () => this.manager.logger.emit("LOG", "LISTENING", "Now listening on", `${this.wss.options.host}:${this.wss.options.port}`));
        this.wss.on("connection", (ws: ExtendedSocket) => {
            this.manager.logger.emit("DEBUG", "OPEN", `${ws._socket.remoteAddress}:${ws._socket.remotePort} >`, "Connection opened")
            ws.on("message", (data: Data) => this.handleMessage(ws, data.toString()));
            ws.on("close", () => this.manager.logger.emit("DEBUG", "CLOSE", `${ws._socket.remoteAddress}:${ws._socket.remotePort} >`, "Connection closed"));
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
        this.manager.logger.emit("DEBUG", "MESSAGE", `${socket._socket.remoteAddress}:${socket._socket.remotePort} >`, message);
        try {
            const json: MessagePayload = JSON.parse(message);
            if (this.handlers.has(json.op)) return this.handlers.get(json.op).handle(this.manager, socket, json);
            this.manager.logger.emit("ERROR", "UNKNOWN MESSAGE", `${socket._socket.remoteAddress}:${socket._socket.remotePort} >`, message);
        } catch (err) {
            socket.send(JSON.stringify({ error: err.message }));
            socket.terminate();
        }
    }

    startCleanup(): void {
        if (this.cleanup) clearInterval(this.cleanup);
        this.cleanup = setInterval(() => {
            const expiredTime = Date.now() - 60000; // 60 seconds ago, heartbeats take 40 secs. Gives the clients 20 seconds leeway
            this.wss.clients.forEach((client: ExtendedSocket) => {
                if (client.lastHeartbeat && client.lastHeartbeat < expiredTime) client.terminate();
            })
        }, 20000);
    }

}