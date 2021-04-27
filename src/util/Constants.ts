/*
    Constants
*/

import WebSocket from "ws";

export const DefaultConcordiaOptions: ConcordiaOptions = {
    host: "127.0.0.1",
    port: 7591,
    APIhost: "127.0.0.1",
    APIport: 3000,
    logLevel: "info",
    token: null
}

/*
    Interfaces
*/

export interface ConcordiaOptions {
    host?: string,
    port?: number,
    APIhost?: string,
    APIport?: number,
    logLevel?: string,
    token?: string
}

export interface ExtendedSocket extends WebSocket {
    [x: string]: any,
    id: string,
    identified: boolean,
    shard: number | number[],
    shardCount: number,
    referenceID: string,
    lastHeartbeat: number
}