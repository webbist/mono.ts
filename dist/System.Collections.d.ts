export declare class KeyValuePair<TValue> {
    private _key;
    private _value;
    Key: string;
    Value: TValue;
    constructor(key: string, value: TValue);
}
export interface IIndexable<T> {
    GetIndex(): Array<T>;
}
