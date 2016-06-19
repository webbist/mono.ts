import { IIdentity, IPrincipal } from "./System.Security.Principal";
export declare class ClaimTypes {
    static Email: string;
    static Name: string;
    static NameIdentifier: string;
    static Role: string;
}
export declare class ClaimValueTypes {
    static String: string;
}
export declare class Claim {
    private _issuer;
    private _originalIssuer;
    private _type;
    private _value;
    private _valueType;
    Issuer: string;
    OriginalIssuer: string;
    Type: string;
    Value: string;
    ValueType: string;
    constructor(type: string, value: string);
    constructor(type: string, value: string, valueType: string);
    constructor(type: string, value: string, valueType: string, issuer: string);
    constructor(type: string, value: string, valueType: string, issuer: string, originalIssuer: string);
}
export declare class ClaimsIdentity implements IIdentity {
    private _authenticationType;
    private _claims;
    private _isAuthenticated;
    private _name;
    private _nameType;
    private _roleType;
    AuthenticationType: string;
    Claims: Claim[];
    IsAuthenticated: boolean;
    Name: string;
    NameClaimType: string;
    RoleClaimType: string;
    constructor();
    constructor(authenticationType: string);
    constructor(authenticationType: string, nameType: string, roleType: string);
    constructor(claims: Claim[]);
    constructor(claims: Claim[], authenticationType: string);
    constructor(claims: Claim[], authenticationType: string, nameType: string, roleType: string);
    constructor(identity: IIdentity);
    constructor(identity: IIdentity, claims: Claim[]);
    constructor(identity: IIdentity, claims: Claim[], authenticationType: string, nameType: string, roleType: string);
    HasClaim(type: string, value: string): boolean;
}
export declare class ClaimsPrincipal implements IPrincipal {
    private _claimsIdentities;
    Identity: IIdentity;
    constructor();
    constructor(identities: ClaimsIdentity[]);
    constructor(identity: IIdentity);
    constructor(principal: IPrincipal);
    IsInRole(role: string): boolean;
}
