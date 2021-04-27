import { EventEmitter3000 } from "eventemitter3000";
import { ConcordiaGroup } from "./ConcordiaGroup";

export class ConcordiaShard extends EventEmitter3000 {

    shard: number;

    readonly group: ConcordiaGroup;

    constructor(group: ConcordiaGroup) {
        super();
        this.group = group;
    }

    get groupId(): string {
        return this.group.id;
    }

}