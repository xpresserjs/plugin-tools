import type {DollarSign} from "xpresser/types";

/**
 * Add an extension to the projects addExtension method.
 * @param extension
 * @param $
 */
export function addExtension(extension: string, $?: DollarSign) {
    if (!$) {
        $ = (require('xpresser') as typeof import('xpresser')).getInstance();
    }

    const useXjsCliFile = $.path.base("use-xjs-cli.json");
    if (!$.file.exists(useXjsCliFile)) {
        return $.logErrorAndExit("use-xjs-cli.json not found.");
    }

    const data = $.file.readJson(useXjsCliFile) as Record<string, any>;

    if (data.extensions) {
        if (data.extensions.includes(extension)) {
            return $.logInfo(`Extension ${extension} already exists`);
        } else {
            data.extensions.push(extension);
        }
    } else {
        data.extensions = [extension];
    }

    $.file.saveToJson(useXjsCliFile, data);
    $.logSuccess("Extension added to use-xjs-cli.json");
}