import { ConcordiaManager } from "../manager";
import { ServerPlugin } from "./ServerPlugin";

export class PluginManager {

    manager: ConcordiaManager

    registered: Map<string, ServerPlugin>;

    constructor(manager: ConcordiaManager) {
        this.manager = manager;
        this.registered = new Map();
    }

    getPlugin<T extends ServerPlugin>(identifier: string): T {
        return this.registered.get(identifier) as T;
    }

    registerPlugin(plugin: ServerPlugin): void {
        if (this.registered.has(plugin.identifier)) throw new Error("Trying to register plugin that has already been registered: " + plugin.identifier);
        plugin.initialize(this.manager);
        this.registered.set(plugin.identifier, plugin);
    }

}