import { MessagePayload } from "@developerdragon/dragoncordapi";
import { ConcordiaManager } from "../manager";
import { ExtendedSocket } from "../util/Constants";
import { MessageHandler } from "./AbstractHandler";

export class IdentifyHandler extends MessageHandler {

    op = 3;

    handle(manager: ConcordiaManager, ws: ExtendedSocket, request: MessagePayload): void {

        // TODO Check token before identifying

        ws.identified = true;
        ws.shard = request.d.shard;
        ws.shardCount = request.d.shardCount;
    }

}
