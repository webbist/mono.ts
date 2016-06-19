"use strict";
var System_Collections_1 = require("./System.Collections");
var Dictionary = (function () {
    function Dictionary(list) {
        if (list === void 0) { list = new Array(); }
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
        }
        else {
            this._list.push(new System_Collections_1.KeyValuePair(first, second));
        }
    };
    Dictionary.prototype.Item = function (key, value) {
        if (value) {
            for (var i = 0; i < this._list.length; i++) {
                if (this._list[i].Key == key) {
                    this._list[i].Value = value;
                }
            }
            this.Add(key, value);
            return;
        }
        else {
            for (var i = 0; i < this._list.length; i++) {
                if (this._list[i].Key == key) {
                    return this._list[i].Value;
                }
            }
            return null;
        }
    };
    return Dictionary;
}());
exports.Dictionary = Dictionary;
//# sourceMappingURL=System.Collections.Generic.js.map