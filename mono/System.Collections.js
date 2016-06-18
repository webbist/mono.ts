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
}());
exports.KeyValuePair = KeyValuePair;
//# sourceMappingURL=System.Collections.js.map