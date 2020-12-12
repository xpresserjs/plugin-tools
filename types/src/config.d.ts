import type { DollarSign } from "xpresser/types";
export declare function loadPluginConfig(config: {
    namespace: string;
    configFile: string;
    type: "function" | "object";
    default: (...args: any[]) => Record<any, any>;
}): {
    pluginConfig: import("object-collection");
    foundConfigFile: boolean;
    $: DollarSign;
};
