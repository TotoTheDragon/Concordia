import { MessagePayload } from "@developerdragon/dragoncordapi";
import { ConcordiaManager } from "../../ConcordiaManager";
import { ExtendedSocket } from "../../util/Constants";
import { MessageHandler } from "./AbstractHandler";

export class HeartbeatHandler extends MessageHandler {

    op = 2;

    handle(manager: ConcordiaManager, ws: ExtendedSocket, request: MessagePayload): void {
        ws.lastHeartbeat = Date.now();
    }

}
