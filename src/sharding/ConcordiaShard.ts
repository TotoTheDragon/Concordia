import { ConcordiaManager } from "../ConcordiaManager";
import { ShardManager } from "./ShardManager";

export class ConcordiaShard {

    id: number;

    manager: ShardManager;

    constructor(manager: ShardManager, id: number) {
        this.manager = manager;
        this.id = id;
    }

}