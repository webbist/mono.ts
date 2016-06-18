"use strict";
var HttpServerUtility = (function () {
    function HttpServerUtility() {
    }
    HttpServerUtility.UrlEncode = function (url) {
        return encodeURI(url).replace(/[!'()*]/g, function (c) {
            return '%' + c.charCodeAt(0).toString(16).toUpperCase();
        });
    };
    HttpServerUtility.UrlPathEncode = function (path) {
        return encodeURIComponent(path).replace(/[!'()*]/g, function (c) {
            return '%' + c.charCodeAt(0).toString(16).toUpperCase();
        });
    };
    return HttpServerUtility;
}());
exports.HttpServerUtility = HttpServerUtility;
//# sourceMappingURL=System.Web.js.map