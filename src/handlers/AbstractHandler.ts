import { MessagePayload } from "@developerdragon/dragoncordapi";
import { ConcordiaManager, ExtendedSocket } from "../manager";
import { WebSocketManager } from "../WebsocketManager";

export abstract class MessageHandler {

    op: number = -1;

    abstract handle(manager: ConcordiaManager, ws: ExtendedSocket, request: MessagePayload): void;

    register(manager: WebSocketManager) {
        manager.handlers.set(this.op, this);
    }
}
