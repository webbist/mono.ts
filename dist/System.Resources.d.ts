import { Dictionary } from "./System.Collections.Generic";
export declare class ResourceManager {
    private _neutral;
    private _resourceSet;
    constructor(resources?: Dictionary<string>, cultureName?: string);
    AddResources(resources: Dictionary<string>, cultureName?: string): void;
    GetString(name: string): string;
    GetString(name: string, cultureName: string): string;
}
