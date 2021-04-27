import { MessagePayload } from "@developerdragon/dragoncordapi";
import { ConcordiaManager } from "../../ConcordiaManager";
import { ExtendedSocket } from "../../util/Constants";
import { MessageHandler } from "./AbstractHandler";

export class HeartbeatHandler extends MessageHandler {

    op = 2;

    handle(manager: ConcordiaManager, ws: ExtendedSocket, request: MessagePayload): void {

        manager.logger.debug(
            "Received heartbeat",
            "heartbeat",
            "client",
            {
                socketID: ws.id,
                type: request.t,
                data: request.d
            }
        );

        ws.lastHeartbeat = Date.now();
    }

}
