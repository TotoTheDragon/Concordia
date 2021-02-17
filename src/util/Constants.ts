
/*
    Constants
*/

import WebSocket from "ws";

export const DefaultConcordiaOptions: ConcordiaOptions = {
    host: "127.0.0.1",
    port: 7591
}

/*
    Interfaces
*/

export interface ConcordiaOptions {
    host?: string;
    port?: number;
}

export interface ExtendedSocket extends WebSocket {
    [x: string]: any;
    identified: boolean,
    shard: number | number[],
    shardCount: number,
    lastHeartbeat: number;
}