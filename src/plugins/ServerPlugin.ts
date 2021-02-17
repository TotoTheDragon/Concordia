import { ConcordiaManager } from "../manager";

export abstract class ServerPlugin {

    abstract identifier: string;

    abstract initialize(manager: ConcordiaManager): void;
}