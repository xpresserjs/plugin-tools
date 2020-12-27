import type RequestEngine from "xpresser/src/RequestEngine";

export = (extender: (RequestEngineClass: typeof RequestEngine) => any) => {
    return extender;
};