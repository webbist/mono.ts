export declare class DateTime {
    private _date;
    Date: Date;
    static Now: Date;
    constructor(value?: string);
}
export declare class EventArgs {
    static Empty: EventArgs;
    constructor();
}
export declare class Guid implements IEquatable<Guid> {
    private _guid;
    static Empty: Guid;
    constructor(guid?: string);
    Equals(other: Guid): boolean;
    toJSON(): string;
    ToString(): string;
}
export interface IEquatable<T> {
    Equals(other: T): boolean;
}
export declare class String {
    private static _empty;
    static Empty: string;
    static IsNullOrWhiteSpace(value: string): boolean;
    static Format(format: string, ...params: any[]): string;
}
