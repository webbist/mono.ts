"use strict";
var DateTime = (function () {
    function DateTime(value) {
        if (value) {
            if (value.substring(0, "/Date".length) === "/Date") {
                this._date = new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10));
            }
            else {
                this._date = new Date(value);
            }
        }
        else {
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
}());
exports.DateTime = DateTime;
var EventArgs = (function () {
    function EventArgs() {
    }
    EventArgs.Empty = new EventArgs();
    return EventArgs;
}());
exports.EventArgs = EventArgs;
var Guid = (function () {
    function Guid(guid) {
        if (guid) {
            this._guid = guid;
        }
        else {
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
}());
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
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var result = '';
        for (var i = 0;;) {
            var open = format.indexOf('{', i);
            var close = format.indexOf('}', i);
            if ((open < 0) && (close < 0)) {
                result += format.slice(i);
                break;
            }
            if ((close > 0) && ((close < open) || (open < 0))) {
                if (format.charAt(close + 1) !== '}') {
                    throw "stringFormatBraceMismatch";
                }
                result += format.slice(i, close + 1);
                i = close + 2;
                continue;
            }
            result += format.slice(i, open);
            i = open + 1;
            if (format.charAt(i) === '{') {
                result += '{';
                i++;
                continue;
            }
            if (close < 0)
                throw "stringFormatBraceMismatch";
            var brace = format.substring(i, close);
            var colonIndex = brace.indexOf(':');
            var argNumber = parseInt((colonIndex < 0) ? brace : brace.substring(0, colonIndex), 10);
            if (isNaN(argNumber))
                throw "stringFormatInvalid";
            var argFormat = (colonIndex < 0) ? '' : brace.substring(colonIndex + 1);
            var arg = params[argNumber];
            if (typeof (arg) === "undefined" || arg === null) {
                arg = '';
            }
            result += arg.toString();
            i = close + 1;
        }
        return result;
    };
    String._empty = "";
    return String;
}());
exports.String = String;
//# sourceMappingURL=System.js.map