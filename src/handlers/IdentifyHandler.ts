import { MessagePayload } from "@developerdragon/dragoncordapi";
import { ConcordiaManager, ExtendedSocket } from "../server";
import { MessageHandler } from "./AbstractHandler";

export class IdentifyHandler extends MessageHandler {

    op = 3;

    handle(manager: ConcordiaManager, ws: ExtendedSocket, request: MessagePayload): void {
        throw new Error("Method not implemented.");
    }

}
