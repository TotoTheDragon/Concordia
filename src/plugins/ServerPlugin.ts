import { ConcordiaManager } from "../ConcordiaManager";

export abstract class ServerPlugin {

    abstract identifier: string;

    abstract initialize(manager: ConcordiaManager): void;
}