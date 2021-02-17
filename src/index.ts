import { ConcordiaManager } from "./manager";

async function start() {

    const server = new ConcordiaManager();

    process.stdin.on("connect", (...args) => console.log("Connected", ...args))
    process.stdin.on("data", (data: Buffer) => console.log("Data", data.toString()));
    process.stdin.on("end", (...args) => console.log("End", ...args));
}

start();