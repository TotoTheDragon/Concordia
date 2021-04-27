import { MessagePayload } from "@developerdragon/dragoncordapi";
import { v4 } from "uuid";
import { Server } from "ws";
import { ConcordiaManager } from "../ConcordiaManager";
import { ExtendedSocket } from "../util/Constants";
import { MessageHandler } from "./handlers/AbstractHandler";
import { HeartbeatHandler } from "./handlers/HeartbeatHandler";
import { IdentifyHandler } from "./handlers/IdentifyHandler";
import { StatisticsHandler } from "./handlers/StatisticsHandler";

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
        new StatisticsHandler().register(this);

        setInterval(() => {
            this.wss.clients.forEach(ws => {
                ws.send({
                    op: 4,
                    t: "METRICS",
                    d: null
                });
            })
        }, 10000);

        /* Start server */
        this.setupServer();
        this.startCleanup();
    }

    setupServer() {
        if (this.wss) return;
        this.wss = new Server({ host: this.manager.options.host, port: this.manager.options.port });
        this.wss.on("error", (err) => this.manager.logger.error("Error on starting websocket listener", "websocket", err))
        this.wss.on("listening", () =>
            this.manager.logger.info(
                "Started listening",
                "websocket",
                {
                    ip: `${this.wss.options.host}:${this.wss.options.port}`
                }
            )
        );

        this.wss.on("connection", this._handleNewConnection.bind(this));
    }

    _handleNewConnection(ws: ExtendedSocket) {

        this.manager.logger.debug(
            "Connection opened",
            "websocket",
            "client",
            {
                ip: `${ws._socket.remoteAddress}:${ws._socket.remotePort}`
            }
        );

        ws.id = v4();

        this.manager.logger.debug(
            "Assigned ID to connection",
            "websocket",
            {
                ip: `${ws._socket.remoteAddress}:${ws._socket.remotePort}`,
                id: ws.id
            }
        );


        ws.send = (f => u => {
            f(JSON.stringify(u));
            this.manager.logger.debug(
                "Sending payload",
                "websocket",
                {
                    ip: `${ws._socket.remoteAddress}:${ws._socket.remotePort}`,
                    id: ws.id,
                },
                u);
        })(ws.send.bind(ws));


        ws.on("message", this._handleWSMessage.bind(this, ws));
        ws.on("close", this._handleWSClose.bind(this, ws));
        ws.send({
            op: 1,
            d: {
                heartbeatInterval: 40000
            },
            t: null,
            s: null
        });
    }

    _handleWSClose(ws: ExtendedSocket) {
        this.manager.logger.debug(
            "Connection closed",
            "websocket",
            "client",
            {
                ip: `${ws._socket.remoteAddress}:${ws._socket.remotePort}`,
                id: ws.id
            }
        );
    }

    _handleWSMessage(socket: ExtendedSocket, message: string) {
        try {
            const json: MessagePayload = JSON.parse(message.toString());
            if (!this.handlers.has(json.op))
                return this.manager.logger.debug(
                    "Received unknown message",
                    "websocket",
                    {
                        ip: `${socket._socket.remoteAddress}:${socket._socket.remotePort}`,
                        id: socket.id
                    },
                    json
                );
            this.handlers.get(json.op).handle(this.manager, socket, json);
        } catch (err) {
            socket.send({ error: err.message });
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