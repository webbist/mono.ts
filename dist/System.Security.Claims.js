"use strict";
var ClaimTypes = (function () {
    function ClaimTypes() {
    }
    Object.defineProperty(ClaimTypes, "Email", {
        get: function () {
            return "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClaimTypes, "Name", {
        get: function () {
            return "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClaimTypes, "NameIdentifier", {
        get: function () {
            return "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClaimTypes, "Role", {
        get: function () {
            return "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
        },
        enumerable: true,
        configurable: true
    });
    return ClaimTypes;
}());
exports.ClaimTypes = ClaimTypes;
var ClaimValueTypes = (function () {
    function ClaimValueTypes() {
    }
    Object.defineProperty(ClaimValueTypes, "String", {
        get: function () {
            return "http://www.w3.org/2001/XMLSchema#string";
        },
        enumerable: true,
        configurable: true
    });
    return ClaimValueTypes;
}());
exports.ClaimValueTypes = ClaimValueTypes;
var Claim = (function () {
    function Claim(type, value, valueType, issuer, originalIssuer) {
        this._issuer = issuer ? issuer : "LOCAL AUTHORITY";
        this._originalIssuer = originalIssuer ? originalIssuer : this._issuer;
        this._type = type;
        this._value = value;
        this._valueType = valueType ? valueType : ClaimValueTypes.String;
    }
    Object.defineProperty(Claim.prototype, "Issuer", {
        get: function () {
            return this._issuer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Claim.prototype, "OriginalIssuer", {
        get: function () {
            return this._originalIssuer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Claim.prototype, "Type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Claim.prototype, "Value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Claim.prototype, "ValueType", {
        get: function () {
            return this._valueType;
        },
        enumerable: true,
        configurable: true
    });
    return Claim;
}());
exports.Claim = Claim;
var ClaimsIdentity = (function () {
    function ClaimsIdentity(first, second, third, fourth, fifth) {
        this._nameType = ClaimTypes.Name;
        this._roleType = ClaimTypes.Role;
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
    Object.defineProperty(ClaimsIdentity.prototype, "AuthenticationType", {
        get: function () {
            return this._authenticationType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClaimsIdentity.prototype, "Claims", {
        get: function () {
            return this._claims;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClaimsIdentity.prototype, "IsAuthenticated", {
        get: function () {
            return this._authenticationType && this._authenticationType.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClaimsIdentity.prototype, "Name", {
        get: function () {
            if (!this._claims) {
                return null;
            }
            var me = this;
            var nameClaims = this._claims.map(function (c) {
                if (c.Type == me._nameType) {
                    return c;
                }
                return null;
            });
            if (nameClaims.length < 1) {
                return null;
            }
            return nameClaims[0].Value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClaimsIdentity.prototype, "NameClaimType", {
        get: function () {
            return this._nameType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClaimsIdentity.prototype, "RoleClaimType", {
        get: function () {
            return this._roleType;
        },
        enumerable: true,
        configurable: true
    });
    ClaimsIdentity.prototype.HasClaim = function (type, value) {
        if (!this._claims) {
            return false;
        }
        return this._claims.some(function (c) {
            return c.Type == type && c.Value == value;
        });
    };
    return ClaimsIdentity;
}());
exports.ClaimsIdentity = ClaimsIdentity;
var ClaimsPrincipal = (function () {
    function ClaimsPrincipal(first) {
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
    Object.defineProperty(ClaimsPrincipal.prototype, "Identity", {
        get: function () {
            if (!this._claimsIdentities || this._claimsIdentities.length == 0)
                return null;
            return this._claimsIdentities[0];
        },
        enumerable: true,
        configurable: true
    });
    ClaimsPrincipal.prototype.IsInRole = function (role) {
        if (!this._claimsIdentities) {
            return false;
        }
        return this._claimsIdentities.some(function (ci) {
            return ci.HasClaim(ci.RoleClaimType, role);
        });
    };
    return ClaimsPrincipal;
}());
exports.ClaimsPrincipal = ClaimsPrincipal;
//# sourceMappingURL=System.Security.Claims.js.map