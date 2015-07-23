// copyright 2015 Webbist Multimedia Enr.

// licensed under the Apache License, Version 2.0(the "License");
// you may not use this file except in compliance with the License.
// you may obtain a copy of the License at

//    http://www.apache.org/licenses/LICENSE-2.0

// unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
// either express or implied.
// see the License for the specific language governing permissions and limitations under the License.

export class EventArgs {
    static Empty: EventArgs = new EventArgs();
}

export class DateTime {
    private _date: Date;

    get Date(): Date {
        return this._date;
    }

    static get Now(): Date {
        return new Date();
    }

    constructor(value?: string) {
        if (value) {
            if (value.substring(0, "/Date".length) === "/Date") {
                this._date = new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10));
            } else {
                this._date = new Date(value);
            }
        } else {
            this._date = new Date();
        }
    }
}

export class Guid implements IEquatable<Guid> {
    private _guid: string;

    public static Empty: Guid = new Guid();

    constructor(guid?: string) {
        if (guid) {
            this._guid = guid;
        } else {
            this._guid = "00000000-0000-0000-0000-000000000000";
        }
    }

    Equals(other: Guid): boolean {
        return this._guid === other.ToString();
    }

    public toJSON() {
        return this._guid;
    }

    public ToString(): string {
        return this._guid;
    }
}

export class String {
    private static _empty: string = "";

    public static get Empty(): string {
        return String._empty;
    }

    public static IsNullOrWhiteSpace(value: string) {
        if (!value || value === "") {
            return true;
        }

        for (var i = 0; i < value.length; i++) {
            if (value.charAt(i) !== " ") {
                return false;
            }
        }
        return true;
    }

    public static Format(format: string, ...params: any[]) {
        var result = "";

        for (var i = 0; ;) {
            var open = format.indexOf("{", i);
            var close = format.indexOf("}", i);
            if ((open < 0) && (close < 0)) {
                result += format.slice(i);
                break;
            }
            if ((close > 0) && ((close < open) || (open < 0))) {
                if (format.charAt(close + 1) !== "}") {
                    throw "stringFormatBraceMismatch";
                }
                result += format.slice(i, close + 1);
                i = close + 2;
                continue;
            }
            result += format.slice(i, open);
            i = open + 1;
            if (format.charAt(i) === "{") {
                result += "{";
                i++;
                continue;
            }
            if (close < 0) {
                throw "stringFormatBraceMismatch";
            }
            var brace = format.substring(i, close);
            var colonIndex = brace.indexOf(":");
            var argNumber = parseInt((colonIndex < 0) ? brace : brace.substring(0, colonIndex), 10);
            if (isNaN(argNumber)) {
                throw "stringFormatInvalid";
            }

            var arg = params[argNumber];
            if (typeof (arg) === "undefined" || arg === null) {
                arg = "";
            }
            // todo: Support cultures
            // if (arg.toFormattedString) {
            //     result += arg.toFormattedString(argFormat);
            // }
            // else if (useLocale && arg.localeFormat) {
            //     result += arg.localeFormat(argFormat);
            // }
            // else if (arg.format) {
            //     var argFormat = (colonIndex < 0) ? "" : brace.substring(colonIndex + 1);
            //     result += arg.format(argFormat);
            // }
            // else
            result += arg.toString();
            i = close + 1;
        }
        return result;
    }
}

export interface IEquatable<T> {
    Equals(other: T): boolean;
}

export module Collections {
    "use strict";

    export class KeyValuePair<TValue> {
        private _key: string;
        private _value: TValue;

        get Key(): string {
            return this._key;
        }

        get Value(): TValue {
            return this._value;
        }

        public constructor(key: string, value: TValue) {
            this._key = key;
            this._value = value;
        }
    }

    export interface IIndexable<T> {
        GetIndex(): Array<T>
    }

    export module Generic {
        export interface IDictionary<TValue> {
            Count: number;

            Add(item: KeyValuePair<TValue>): void;
            Add(key: string, value: any): void;
            Item(key: string): TValue;
            Item(key: string, value: TValue): void;
        }

        export class Dictionary<TValue> implements IDictionary<TValue> {
            private _list: Array<KeyValuePair<TValue>>;

            get Count(): number {
                return this._list.length;
            }

            public constructor(list: Array<KeyValuePair<TValue>> = new Array<KeyValuePair<TValue>>()) {
                this._list = list;
            }

            Add(first: any, second?: any): void {
                if (typeof second === "undefined") {
                    this._list.push(<KeyValuePair<TValue>>first);
                } else {
                    this._list.push(<KeyValuePair<TValue>>new KeyValuePair(<string>first, second));
                }
            }

            Item(key: string, value?: TValue): TValue {
                if (value) {
                    for (var i = 0; i < this._list.length; i++) {
                        if (this._list[i].Key === key) {
                            this._list[i].Value = value;
                        }
                    }

                    this.Add(key, value);
                    return;
                } else {
                    for (var j = 0; j < this._list.length; j++) {
                        if (this._list[j].Key === key) {
                            return this._list[j].Value;
                        }
                    }
                    return null;
                }
            }
        }
    }
}

export module Globalization {
    "use strict";

    function GetLocalizedDisplayName(): Collections.Generic.Dictionary<string> {
        return new Collections.Generic.Dictionary<string>([
            new Collections.KeyValuePair<string>("en", "English"),
            new Collections.KeyValuePair<string>("fr", "français"),
            new Collections.KeyValuePair<string>("es", "español")
        ]);
    }

    export class CultureInfo {
        private static _currentUICulture: CultureInfo = new CultureInfo("en");
        private static _localizedDisplayName: Collections.Generic.Dictionary<string> = GetLocalizedDisplayName();
        private _name: string;

        public static get CurrentUICulture(): CultureInfo {
            return CultureInfo._currentUICulture;
        }
        public static set CurrentUICulture(value: CultureInfo) {
            CultureInfo._currentUICulture = value;
        }

        public get DisplayName(): string {
            return CultureInfo._localizedDisplayName.Item(this._name);
        }

        public get Name(): string {
            return this._name;
        }

        public constructor(name: string) {
            this._name = name;
        }
    }
}

export module Resources {
    "use strict";

    export class ResourceManager {
        private _neutral: string = "neutral";
        private _resourceSet: Collections.Generic.Dictionary<Collections.Generic.Dictionary<string>>;

        public constructor(resources?: Collections.Generic.Dictionary<string>, cultureName?: string) {
            this._resourceSet = new Collections.Generic.Dictionary<Collections.Generic.Dictionary<string>>();

            if (resources) {
                this.AddResources(resources, cultureName);
            }
        }

        public AddResources(resources: Collections.Generic.Dictionary<string>, cultureName?: string): void {
            if (cultureName) {
                this._resourceSet.Add(cultureName, resources);
            } else {
                this._resourceSet.Add(this._neutral, resources);
            }
        }

        public GetString(name: string): string;
        public GetString(name: string, cultureName: string): string;
        public GetString(name: string, cultureName?: string): string {
            var resources: Collections.Generic.Dictionary<string>;

            if (cultureName) {
                resources = this._resourceSet.Item(cultureName);
            } else {
                resources = this._resourceSet.Item(Globalization.CultureInfo.CurrentUICulture.Name);
            }

            if (!resources) {
                resources = this._resourceSet.Item(this._neutral);
            }

            if (resources) {
                return resources.Item(name);
            } else {
                return null;
            }
        }
    }
}

export module Script {
    "use strict";

    export class JavaScriptContext {
        private static _instance: JavaScriptContext;
        private _user: Security.Principal.IPrincipal;

        static get Current(): JavaScriptContext {
            if (!JavaScriptContext._instance) {
                JavaScriptContext._instance = new JavaScriptContext();
            }
            return JavaScriptContext._instance;
        }

        get User(): Security.Principal.IPrincipal {
            return this._user;
        }
        set User(value: Security.Principal.IPrincipal) {
            this._user = value;
        }
    }

}

export module Security {
    "use strict";

    export module Claims {

        export class ClaimTypes {
            static get Email(): string {
                return "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
            }

            static get Name(): string {
                return "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
            }

            static get NameIdentifier(): string {
                return "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
            }

            static get Role(): string {
                return "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
            }
        }

        export class ClaimValueTypes {
            static get String(): string {
                return "http://www.w3.org/2001/XMLSchema#string";
            }
        }

        export class Claim {
            private _issuer: string;
            private _originalIssuer: string;
            private _type: string;
            private _value: string;
            private _valueType: string;

            get Issuer(): string {
                return this._issuer;
            }

            get OriginalIssuer(): string {
                return this._originalIssuer;
            }

            get Type(): string {
                return this._type;
            }

            get Value(): string {
                return this._value;
            }

            get ValueType(): string {
                return this._valueType;
            }

            constructor(type: string, value: string)
            constructor(type: string, value: string, valueType: string)
            constructor(type: string, value: string, valueType: string, issuer: string)
            constructor(type: string, value: string, valueType: string, issuer: string, originalIssuer: string)
            constructor(type: string, value: string, valueType?: string, issuer?: string, originalIssuer?: string) {
                this._issuer = issuer ? issuer : "LOCAL AUTHORITY";
                this._originalIssuer = originalIssuer ? originalIssuer : this._issuer;
                this._type = type;
                this._value = value;
                this._valueType = valueType ? valueType : ClaimValueTypes.String;
            }
        }

        export class ClaimsIdentity implements Principal.IIdentity {
            private _authenticationType: string;
            private _claims: Claim[];
            private _nameType: string = ClaimTypes.Name;
            private _roleType: string = ClaimTypes.Role;

            get AuthenticationType(): string {
                return this._authenticationType;
            }

            get Claims(): Claim[] {
                return this._claims;
            }

            get IsAuthenticated(): boolean {
                return this._authenticationType && this._authenticationType.length > 0;
            }

            get Name(): string {
                if (!this._claims) {
                    return null;
                }

                var me = this;
                var nameClaims = this._claims.map(function (c: Claim) {
                    if (c.Type === me._nameType) {
                        return c;
                    }
                    return null;
                });
                if (nameClaims.length < 1) {
                    return null;
                }
                return nameClaims[0].Value;
            }

            get NameClaimType(): string {
                return this._nameType;
            }

            get RoleClaimType(): string {
                return this._roleType;
            }

            constructor()
            constructor(authenticationType: string)
            constructor(authenticationType: string, nameType: string, roleType: string)
            constructor(claims: Claim[])
            constructor(claims: Claim[], authenticationType: string)
            constructor(claims: Claim[], authenticationType: string, nameType: string, roleType: string)
            constructor(identity: Principal.IIdentity)
            constructor(identity: Principal.IIdentity, claims: Claim[])
            constructor(identity: Principal.IIdentity, claims: Claim[], authenticationType: string, nameType: string, roleType: string)
            constructor(first?: any, second?: any, third?: any, fourth?: any, fifth?: any) {
                if (!first) {
                    return;
                }

                if (typeof first === "string") {
                    this._authenticationType = first;

                    if (second) {
                        this._nameType = second;
                        this._roleType = third;
                    }
                } else if (typeof first === "object") {
                    if (Array.isArray(first)) {
                        this._claims = first;

                        if (second) {
                            this._authenticationType = second;

                            if (third) {
                                this._nameType = third;
                                this._roleType = fourth;
                            }
                        }
                    }
                } else {
                    if (second) {
                        this._claims = second;

                        if (third) {
                            this._authenticationType = third;
                            this._nameType = fourth;
                            this._roleType = fifth;
                        } else {
                            this._authenticationType = first.AuthenticationType;
                            this._nameType = first.NameClaimType;
                            this._roleType = first.RoleClaimType;
                        }
                    } else {
                        this._authenticationType = first.AuthenticationType;
                        this._nameType = first.NameClaimType;
                        this._roleType = first.RoleClaimType;
                        this._claims = first.Claims;
                    }
                }
            }

            HasClaim(type: string, value: string): boolean {
                if (!this._claims) {
                    return false;
                }

                return this._claims.some(function (c: Claim) {
                    return c.Type === type && c.Value === value;
                });
            }
        }

        export class ClaimsPrincipal implements Principal.IPrincipal {
            private _claimsIdentities: ClaimsIdentity[];

            get Identity(): Principal.IIdentity {
                if (!this._claimsIdentities || this._claimsIdentities.length === 0) {
                    return null;
                }

                return this._claimsIdentities[0];
            }

            constructor()
            constructor(identities: ClaimsIdentity[])
            constructor(identity: Principal.IIdentity)
            constructor(principal: Principal.IPrincipal)
            constructor(first?: any) {
                if (!first) {
                    return;
                }

                if (Array.isArray(first)) {
                    this._claimsIdentities = first;
                } else if (first.Identity) {
                    this._claimsIdentities = [first.Identity];
                } else {
                    this._claimsIdentities = [first];
                }
            }

            IsInRole(role: string): boolean {
                if (!this._claimsIdentities) {
                    return false;
                }

                return this._claimsIdentities.some(function (ci: ClaimsIdentity) {
                    return ci.HasClaim(ci.RoleClaimType, role);
                });
            }
        }
    }

    export module Principal {

        export interface IIdentity {
            AuthenticationType: string
            IsAuthenticated: boolean
            Name: string
        }

        export interface IPrincipal {
            Identity: IIdentity
            IsInRole(role: string): boolean
        }

    }
}