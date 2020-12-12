import type {DollarSign} from "xpresser/types";

export function loadPluginConfig(config: {
    namespace: string,
    configFile: string,
    type: "function" | "object",
    default: (...args: any[]) => Record<any, any>,
}) {
    const {getInstance, InXpresserError}: {
        getInstance: () => DollarSign,
        InXpresserError: typeof Error
    } = require("xpresser");

    const $ = getInstance();
    // Convert pluginConfig to collection.
    const pluginConfig = $.objectCollection(config.default($));

    // Add namespace to plugin pluginConfig (optional but recommended)
    pluginConfig.set("namespace", config.namespace);

    // Try to get config_file.(js|ts)
    // File extension was excluded to allow require guess the file.
    // Just in-case it's typescript.
    const configPath = $.path.configs(config.configFile);
    let userDefinedConfig;
    let foundConfigFile = false;

    try {
        userDefinedConfig = require(configPath);
        foundConfigFile = true;
    } catch (err) {
        // do nothing
    }

    // Throw Error if config file does not return a function.
    if (foundConfigFile && typeof userDefinedConfig !== "function") {
        throw new InXpresserError(
            `Plugin ${config.namespace}  Config file must return a function.`
        );
    }

    if (foundConfigFile) {
        /**
         * Merge with user defined values.
         */
        pluginConfig.merge(userDefinedConfig($, pluginConfig.all()));
    }

    return {pluginConfig, foundConfigFile, $};
};