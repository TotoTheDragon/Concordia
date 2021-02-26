import { ConcordiaManager } from "../ConcordiaManager";
import { ConcordiaShard } from "./ConcordiaShard";

export class ShardManager {

    shards: Map<number, ConcordiaShard>;
    manager: ConcordiaManager;

    constructor(manager: ConcordiaManager) {
        this.manager = manager;
    }

    getShard(id: number): ConcordiaShard {
        return this.shards.get(id);
    }

}