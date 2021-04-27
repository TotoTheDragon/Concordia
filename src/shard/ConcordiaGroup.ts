
import { EventEmitter3000 } from "eventemitter3000";
import { ConcordiaShard } from "./ConcordiaShard";

export class ConcordiaGroup extends EventEmitter3000 {

    readonly id: string;

    shards: Map<number, ConcordiaShard>;

    constructor(id: string) {
        super();
        this.id = id;
        this.shards = new Map();
    }

}