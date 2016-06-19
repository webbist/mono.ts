"use strict";
var System_Globalization_1 = require("./System.Globalization");
var System_Collections_Generic_1 = require("./System.Collections.Generic");
var ResourceManager = (function () {
    function ResourceManager(resources, cultureName) {
        this._neutral = "neutral";
        this._resourceSet = new System_Collections_Generic_1.Dictionary();
        if (resources) {
            this.AddResources(resources, cultureName);
        }
    }
    ResourceManager.prototype.AddResources = function (resources, cultureName) {
        if (cultureName) {
            this._resourceSet.Add(cultureName, resources);
        }
        else {
            this._resourceSet.Add(this._neutral, resources);
        }
    };
    ResourceManager.prototype.GetString = function (name, cultureName) {
        var resources;
        if (cultureName) {
            resources = this._resourceSet.Item(cultureName);
        }
        else {
            resources = this._resourceSet.Item(System_Globalization_1.CultureInfo.CurrentUICulture.Name);
        }
        if (!resources) {
            resources = this._resourceSet.Item(this._neutral);
        }
        if (resources) {
            return resources.Item(name);
        }
        else {
            return null;
        }
    };
    return ResourceManager;
}());
exports.ResourceManager = ResourceManager;
//# sourceMappingURL=System.Resources.js.map