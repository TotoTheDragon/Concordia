
/*
    Constants
*/

import WebSocket from "ws";

export const DefaultConcordiaOptions: ConcordiaOptions = {
    host: "127.0.0.1",
    port: 7591,
    APIhost: "127.0.0.1",
    APIport: 3000
}

/*
    Interfaces
*/

export interface ConcordiaOptions {
    host?: string,
    port?: number,
    APIhost?: string,
    APIport?: number;
}

export interface ExtendedSocket extends WebSocket {
    [x: string]: any;
    identified: boolean,
    shard: number | number[],
    shardCount: number,
    lastHeartbeat: number;
}