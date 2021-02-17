import { MessagePayload } from "@developerdragon/dragoncordapi";
import { ConcordiaManager, ExtendedSocket } from "../manager";
import { MessageHandler } from "./AbstractHandler";

export class HeartbeatHandler extends MessageHandler {

    op = 2;

    handle(manager: ConcordiaManager, ws: ExtendedSocket, request: MessagePayload): void {
        ws.lastHeartbeat = Date.now();
    }

}
