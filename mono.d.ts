export declare class EventArgs {
    static Empty: EventArgs;
}
export declare class DateTime {
    private _date;
    public Date : Date;
    static Now : Date;
    constructor(value?: string);
}
export declare class Guid implements IEquatable<Guid> {
    private _guid;
    static Empty: Guid;
    constructor(guid?: string);
    public Equals(other: Guid): boolean;
    public toJSON(): string;
    public ToString(): string;
}
export declare class String {
    private static _empty;
    static Empty : string;
    static IsNullOrWhiteSpace(value: string): boolean;
    static Format(format: string, ...params: any[]): string;
}
export interface IEquatable<T> {
    Equals(other: T): boolean;
}
export declare module Collections {
    class KeyValuePair<TValue> {
        private _key;
        private _value;
        public Key : string;
        public Value : TValue;
        constructor(key: string, value: TValue);
    }
    interface IIndexable<T> {
        GetIndex(): T[];
    }
    module Generic {
        interface IDictionary<TValue> {
            Count: number;
            Add(item: KeyValuePair<TValue>): void;
            Add(key: string, value: any): void;
            Item(key: string): TValue;
            Item(key: string, value: TValue): void;
        }
        class Dictionary<TValue> implements IDictionary<TValue> {
            private _list;
            public Count : number;
            constructor(list?: KeyValuePair<TValue>[]);
            public Add(first: any, second?: any): void;
            public Item(key: string, value?: TValue): TValue;
        }
    }
}
export declare module Globalization {
    class CultureInfo {
        private static _currentUICulture;
        private static _localizedDisplayName;
        private _name;
        static CurrentUICulture : CultureInfo;
        public DisplayName : string;
        public Name : string;
        constructor(name: string);
    }
}
export declare module Resources {
    class ResourceManager {
        private _neutral;
        private _resourceSet;
        constructor(resources?: Collections.Generic.Dictionary<string>, cultureName?: string);
        public AddResources(resources: Collections.Generic.Dictionary<string>, cultureName?: string): void;
        public GetString(name: string): string;
        public GetString(name: string, cultureName: string): string;
    }
}
export declare module Script {
    class JavaScriptContext {
        private static _instance;
        private _user;
        static Current : JavaScriptContext;
        public User : Security.Principal.IPrincipal;
    }
}
export declare module Security {
    module Claims {
        class ClaimTypes {
            static Email : string;
            static Name : string;
            static NameIdentifier : string;
            static Role : string;
        }
        class ClaimValueTypes {
            static String : string;
        }
        class Claim {
            private _issuer;
            private _originalIssuer;
            private _type;
            private _value;
            private _valueType;
            public Issuer : string;
            public OriginalIssuer : string;
            public Type : string;
            public Value : string;
            public ValueType : string;
            constructor(type: string, value: string);
            constructor(type: string, value: string, valueType: string);
            constructor(type: string, value: string, valueType: string, issuer: string);
            constructor(type: string, value: string, valueType: string, issuer: string, originalIssuer: string);
        }
        class ClaimsIdentity implements Principal.IIdentity {
            private _authenticationType;
            private _claims;
            private _nameType;
            private _roleType;
            public AuthenticationType : string;
            public Claims : Claim[];
            public IsAuthenticated : boolean;
            public Name : string;
            public NameClaimType : string;
            public RoleClaimType : string;
            constructor();
            constructor(authenticationType: string);
            constructor(authenticationType: string, nameType: string, roleType: string);
            constructor(claims: Claim[]);
            constructor(claims: Claim[], authenticationType: string);
            constructor(claims: Claim[], authenticationType: string, nameType: string, roleType: string);
            constructor(identity: Principal.IIdentity);
            constructor(identity: Principal.IIdentity, claims: Claim[]);
            constructor(identity: Principal.IIdentity, claims: Claim[], authenticationType: string, nameType: string, roleType: string);
            public HasClaim(type: string, value: string): boolean;
        }
        class ClaimsPrincipal implements Principal.IPrincipal {
            private _claimsIdentities;
            public Identity : Principal.IIdentity;
            constructor();
            constructor(identities: ClaimsIdentity[]);
            constructor(identity: Principal.IIdentity);
            constructor(principal: Principal.IPrincipal);
            public IsInRole(role: string): boolean;
        }
    }
    module Principal {
        interface IIdentity {
            AuthenticationType: string;
            IsAuthenticated: boolean;
            Name: string;
        }
        interface IPrincipal {
            Identity: IIdentity;
            IsInRole(role: string): boolean;
        }
    }
}
