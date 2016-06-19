import { KeyValuePair } from "./System.Collections";
export interface IDictionary<TValue> {
    Count: number;
    Add(item: KeyValuePair<TValue>): void;
    Add(key: string, value: any): void;
    Item(key: string): TValue;
    Item(key: string, value: TValue): void;
}
export declare class Dictionary<TValue> implements IDictionary<TValue> {
    private _list;
    Count: number;
    constructor(list?: Array<KeyValuePair<TValue>>);
    Add(first: any, second?: any): void;
    Item(key: string, value?: TValue): TValue;
}
