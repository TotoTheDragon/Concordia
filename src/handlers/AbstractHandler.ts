import { MessagePayload } from "@developerdragon/dragoncordapi";
import { ConcordiaManager, ExtendedSocket } from "../server";

export abstract class MessageHandler {

    op: number = -1;

    abstract handle(manager: ConcordiaManager, ws: ExtendedSocket, request: MessagePayload): void;

    register(manager: ConcordiaManager) {
        manager.handlers.set(this.op, this);
    }
}
