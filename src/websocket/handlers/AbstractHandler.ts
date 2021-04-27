import { MessagePayload } from "@developerdragon/dragoncordapi";
import { ConcordiaManager } from "../../ConcordiaManager";
import { ExtendedSocket } from "../../util/Constants";
import { WebSocketManager } from "../WebSocketManager";

export abstract class MessageHandler {

    op: number = -1;

    abstract handle(manager: ConcordiaManager, ws: ExtendedSocket, request: MessagePayload): void;

    register = (manager: WebSocketManager) => { manager.handlers.set(this.op, this) }

}
