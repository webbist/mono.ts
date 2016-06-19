"use strict";
var System_Collections_Generic_1 = require("./System.Collections.Generic");
var System_Collections_1 = require("./System.Collections");
function GetLocalizedDisplayName() {
    return new System_Collections_Generic_1.Dictionary([
        new System_Collections_1.KeyValuePair("en", "English"),
        new System_Collections_1.KeyValuePair("fr", "français"),
        new System_Collections_1.KeyValuePair("es", "español")
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
}());
exports.CultureInfo = CultureInfo;
//# sourceMappingURL=System.Globalization.js.map