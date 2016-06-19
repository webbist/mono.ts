// copyright 2016 Webbist Multimedia Enr.

// licensed under the Apache License, Version 2.0(the "License");
// you may not use this file except in compliance with the License.
// you may obtain a copy of the License at

//    http://www.apache.org/licenses/LICENSE-2.0

// unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
// either express or implied.
// see the License for the specific language governing permissions and limitations under the License.

import { IIdentity, IPrincipal } from "./System.Security.Principal";

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

export class ClaimsIdentity implements IIdentity {
    private _authenticationType: string;
    private _claims: Claim[];
    private _isAuthenticated: boolean;
    private _name: string;
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
            if (c.Type == me._nameType) {
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
    constructor(identity: IIdentity)
    constructor(identity: IIdentity, claims: Claim[])
    constructor(identity: IIdentity, claims: Claim[], authenticationType: string, nameType: string, roleType: string)
    constructor(first?: any, second?: any, third?: any, fourth?: any, fifth?: any) {
        if (!first) {
            return;
        }

        if (typeof first == "string") {
            this._authenticationType = first;

            if (second) {
                this._nameType = second;
                this._roleType = third;
            }
        }
        else if (typeof first == "object") {
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
        }
        else {
            if (second) {
                this._claims = second;

                if (third) {
                    this._authenticationType = third;
                    this._nameType = fourth;
                    this._roleType = fifth;
                }
                else {
                    this._authenticationType = first.AuthenticationType;
                    this._nameType = first.NameClaimType;
                    this._roleType = first.RoleClaimType;
                }
            }
            else {
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
            return c.Type == type && c.Value == value;
        });
    }
}

export class ClaimsPrincipal implements IPrincipal {
    private _claimsIdentities: ClaimsIdentity[];

    get Identity(): IIdentity {
        if (!this._claimsIdentities || this._claimsIdentities.length == 0)
            return null;

        return this._claimsIdentities[0];
    }

    constructor()
    constructor(identities: ClaimsIdentity[])
    constructor(identity: IIdentity)
    constructor(principal: IPrincipal)
    constructor(first?: any) {
        if (!first) {
            return;
        }

        if (Array.isArray(first)) {
            this._claimsIdentities = first;
        }
        else if (first.Identity) {
            this._claimsIdentities = [first.Identity];
        }
        else {
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

