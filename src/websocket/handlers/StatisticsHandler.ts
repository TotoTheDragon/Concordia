import { MessagePayload } from "@developerdragon/dragoncordapi";
import { ConcordiaManager } from "../../ConcordiaManager";
import { ExtendedSocket } from "../../util/Constants";
import { MessageHandler } from "./AbstractHandler";

export class StatisticsHandler extends MessageHandler {

    op = 5;

    handle(manager: ConcordiaManager, ws: ExtendedSocket, request: MessagePayload): void {

        manager.logger.debug(
            "Received statistics",
            "statistics",
            {
                socketID: ws.id,
                type: request.t,
                data: request.d
            }
        );
    }

}
