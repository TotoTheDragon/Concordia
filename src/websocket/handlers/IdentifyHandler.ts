import { MessagePayload } from "@developerdragon/dragoncordapi";
import { ConcordiaManager } from "../../ConcordiaManager";
import { ExtendedSocket } from "../../util/Constants";
import { MessageHandler } from "./AbstractHandler";

export class IdentifyHandler extends MessageHandler {

    op = 3;

    handle(manager: ConcordiaManager, ws: ExtendedSocket, request: MessagePayload): void {

        // TODO Check token before identifying

        manager.logger.debug(
            "Received identify payload",
            "identify",
            "client",
            {
                socketID: ws.id,
                data: request.d
            }
        );

        /*
            Check token
        */
        if (manager.options.token != null && manager.options.token != request.d.token) {

            manager.logger.debug(
                "Received incorrect token",
                "identify",
                "client",
                {
                    socketID: ws.id,
                    token: request.d.token,
                    expected: manager.options.token
                }
            );


            ws.close(4004, "Invalid token");

            return;
        }

        /*
           Determine which shard this connection belongs to
       */
        if (request.d.shard != null || request.d.shardCount != null) {

            if (request.d.shard == null || request.d.shardCount == null) {
                manager.logger.debug(
                    "Received incorrect sharding information",
                    "identify",
                    "client",
                    {
                        socketID: ws.id,
                        shard: request.d.shard ?? null,
                        shardCount: request.d.shardCount ?? null
                    }
                );


                ws.close(4005, "Invalid sharding information");

                return;
            }

            ws.shard = request.d.shard;
            ws.shardCount = request.d.shardCount;
        }

        if (request.d.referenceID != null) {

            if (ws.shard != null || ws.shardCount != null) {
                manager.logger.debug(
                    "Received a referenceID, but have sharding information set",
                    "identify",
                    "client",
                    {
                        socketID: ws.id,
                        referenceID: request.d.referenceID,
                        shard: ws.shard ?? null,
                        shardCount: ws.shardCount ?? null
                    }
                );


                ws.close(4005, "Invalid sharding information");

                return;
            }

            /*
                Find the correct reference and set shard according to that
            */

            ws.shard = 0;
            ws.shardCount = 1;
            ws.referenceID = request.d.referenceID;
        }

        if (ws.shard == null || ws.shardCount == null) {
            manager.logger.debug(
                "Received incorrect sharding information",
                "identify",
                "client",
                {
                    socketID: ws.id,
                    shard: ws.shard ?? null,
                    shardCount: ws.shardCount ?? null,
                    referenceID: ws.referenceID ?? null
                }
            );


            ws.close(4005, "Invalid sharding information");

            return;
        }

        ws.identified = true;

        manager.logger.debug(
            "Successfully identified",
            "identify",
            "client",
            {
                socketID: ws.id,
                shard: ws.shard,
                shardCount: ws.shardCount,
                referenceID: ws.referenceID
            }
        );

    }

}
