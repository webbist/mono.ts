define(["require", "exports"], function(require, exports) {
    var EventArgs = (function () {
        function EventArgs() {
        }
        EventArgs.Empty = new EventArgs();
        return EventArgs;
    })();
    exports.EventArgs = EventArgs;

    var DateTime = (function () {
        function DateTime(value) {
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
        Object.defineProperty(DateTime.prototype, "Date", {
            get: function () {
                return this._date;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DateTime, "Now", {
            get: function () {
                return new Date();
            },
            enumerable: true,
            configurable: true
        });
        return DateTime;
    })();
    exports.DateTime = DateTime;

    var Guid = (function () {
        function Guid(guid) {
            if (guid) {
                this._guid = guid;
            } else {
                this._guid = "00000000-0000-0000-0000-000000000000";
            }
        }
        Guid.prototype.Equals = function (other) {
            return this._guid === other.ToString();
        };

        Guid.prototype.toJSON = function () {
            return this._guid;
        };

        Guid.prototype.ToString = function () {
            return this._guid;
        };
        Guid.Empty = new Guid();
        return Guid;
    })();
    exports.Guid = Guid;

    var String = (function () {
        function String() {
        }
        Object.defineProperty(String, "Empty", {
            get: function () {
                return String._empty;
            },
            enumerable: true,
            configurable: true
        });

        String.IsNullOrWhiteSpace = function (value) {
            if (!value || value === "") {
                return true;
            }

            for (var i = 0; i < value.length; i++) {
                if (value.charAt(i) !== " ") {
                    return false;
                }
            }
            return true;
        };

        String.Format = function (format) {
            var params = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                params[_i] = arguments[_i + 1];
            }
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

                result += arg.toString();
                i = close + 1;
            }
            return result;
        };
        String._empty = "";
        return String;
    })();
    exports.String = String;

    (function (Collections) {
        "use strict";

        var KeyValuePair = (function () {
            function KeyValuePair(key, value) {
                this._key = key;
                this._value = value;
            }
            Object.defineProperty(KeyValuePair.prototype, "Key", {
                get: function () {
                    return this._key;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(KeyValuePair.prototype, "Value", {
                get: function () {
                    return this._value;
                },
                enumerable: true,
                configurable: true
            });
            return KeyValuePair;
        })();
        Collections.KeyValuePair = KeyValuePair;

        (function (Generic) {
            var Dictionary = (function () {
                function Dictionary(list) {
                    if (typeof list === "undefined") { list = new Array(); }
                    this._list = list;
                }
                Object.defineProperty(Dictionary.prototype, "Count", {
                    get: function () {
                        return this._list.length;
                    },
                    enumerable: true,
                    configurable: true
                });

                Dictionary.prototype.Add = function (first, second) {
                    if (typeof second === "undefined") {
                        this._list.push(first);
                    } else {
                        this._list.push(new KeyValuePair(first, second));
                    }
                };

                Dictionary.prototype.Item = function (key, value) {
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
                };
                return Dictionary;
            })();
            Generic.Dictionary = Dictionary;
        })(Collections.Generic || (Collections.Generic = {}));
        var Generic = Collections.Generic;
    })(exports.Collections || (exports.Collections = {}));
    var Collections = exports.Collections;

    (function (Globalization) {
        "use strict";

        function GetLocalizedDisplayName() {
            return new Collections.Generic.Dictionary([
                new Collections.KeyValuePair("en", "English"),
                new Collections.KeyValuePair("fr", "français"),
                new Collections.KeyValuePair("es", "español")
            ]);
        }

        var CultureInfo = (function () {
            function CultureInfo(name) {
                this._name = name;
            }
            Object.defineProperty(CultureInfo, "CurrentUICulture", {
                get: function () {
                    return CultureInfo._currentUICulture;
                },
                set: function (value) {
                    CultureInfo._currentUICulture = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(CultureInfo.prototype, "DisplayName", {
                get: function () {
                    return CultureInfo._localizedDisplayName.Item(this._name);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(CultureInfo.prototype, "Name", {
                get: function () {
                    return this._name;
                },
                enumerable: true,
                configurable: true
            });
            CultureInfo._currentUICulture = new CultureInfo("en");
            CultureInfo._localizedDisplayName = GetLocalizedDisplayName();
            return CultureInfo;
        })();
        Globalization.CultureInfo = CultureInfo;
    })(exports.Globalization || (exports.Globalization = {}));
    var Globalization = exports.Globalization;

    (function (Resources) {
        "use strict";

        var ResourceManager = (function () {
            function ResourceManager(resources, cultureName) {
                this._neutral = "neutral";
                this._resourceSet = new Collections.Generic.Dictionary();

                if (resources) {
                    this.AddResources(resources, cultureName);
                }
            }
            ResourceManager.prototype.AddResources = function (resources, cultureName) {
                if (cultureName) {
                    this._resourceSet.Add(cultureName, resources);
                } else {
                    this._resourceSet.Add(this._neutral, resources);
                }
            };

            ResourceManager.prototype.GetString = function (name, cultureName) {
                var resources;

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
            };
            return ResourceManager;
        })();
        Resources.ResourceManager = ResourceManager;
    })(exports.Resources || (exports.Resources = {}));
    var Resources = exports.Resources;

    (function (Script) {
        "use strict";

        var JavaScriptContext = (function () {
            function JavaScriptContext() {
            }
            Object.defineProperty(JavaScriptContext, "Current", {
                get: function () {
                    if (!JavaScriptContext._instance) {
                        JavaScriptContext._instance = new JavaScriptContext();
                    }
                    return JavaScriptContext._instance;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(JavaScriptContext.prototype, "User", {
                get: function () {
                    return this._user;
                },
                set: function (value) {
                    this._user = value;
                },
                enumerable: true,
                configurable: true
            });
            return JavaScriptContext;
        })();
        Script.JavaScriptContext = JavaScriptContext;
    })(exports.Script || (exports.Script = {}));
    var Script = exports.Script;

    (function (Security) {
        "use strict";

        (function (Claims) {
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
            })();
            Claims.ClaimTypes = ClaimTypes;

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
            })();
            Claims.ClaimValueTypes = ClaimValueTypes;

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
            })();
            Claims.Claim = Claim;

            var ClaimsIdentity = (function () {
                function ClaimsIdentity(first, second, third, fourth, fifth) {
                    this._nameType = ClaimTypes.Name;
                    this._roleType = ClaimTypes.Role;
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
                            if (c.Type === me._nameType) {
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
                        return c.Type === type && c.Value === value;
                    });
                };
                return ClaimsIdentity;
            })();
            Claims.ClaimsIdentity = ClaimsIdentity;

            var ClaimsPrincipal = (function () {
                function ClaimsPrincipal(first) {
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
                Object.defineProperty(ClaimsPrincipal.prototype, "Identity", {
                    get: function () {
                        if (!this._claimsIdentities || this._claimsIdentities.length === 0) {
                            return null;
                        }

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
            })();
            Claims.ClaimsPrincipal = ClaimsPrincipal;
        })(Security.Claims || (Security.Claims = {}));
        var Claims = Security.Claims;
    })(exports.Security || (exports.Security = {}));
    var Security = exports.Security;
});
//# sourceMappingURL=mono.js.map
