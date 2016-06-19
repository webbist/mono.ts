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
}());
exports.JavaScriptContext = JavaScriptContext;
//# sourceMappingURL=System.Script.js.map