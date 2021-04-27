import { config } from "dotenv";

config();

/*
    Constants
*/

import WebSocket from "ws";

export const DefaultConcordiaOptions: ConcordiaOptions = {
    host: process.env.CONCORDIA_MANAGER_HOST ?? "127.0.0.1",
    port: process.env.CONCORDIA_MANAGER_PORT as unknown as number ?? 7591,
    APIhost: process.env.CONCORDIA_API_HOST ?? "127.0.0.1",
    APIport: process.env.CONCORDIA_API_PORT as unknown as number ?? 3000,
    logLevel: process.env.DEBUG ? "debug" : "info",
    token: process.env.CONCORDIA_MANAGER_TOKEN ?? null
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