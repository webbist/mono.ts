// copyright 2016 Webbist Multimedia Enr.

// licensed under the Apache License, Version 2.0(the "License");
// you may not use this file except in compliance with the License.
// you may obtain a copy of the License at

//    http://www.apache.org/licenses/LICENSE-2.0

// unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
// either express or implied.
// see the License for the specific language governing permissions and limitations under the License.

import { CultureInfo } from "./System.Globalization";
import { Dictionary } from "./System.Collections.Generic";

export class ResourceManager {
    private _neutral: string = "neutral";
    private _resourceSet: Dictionary<Dictionary<string>>;

    public constructor(resources?: Dictionary<string>, cultureName?: string) {
        this._resourceSet = new Dictionary<Dictionary<string>>();

        if (resources) {
            this.AddResources(resources, cultureName);
        }
    }

    public AddResources(resources: Dictionary<string>, cultureName?: string): void {
        if (cultureName) {
            this._resourceSet.Add(cultureName, resources);
        }
        else {
            this._resourceSet.Add(this._neutral, resources);
        }
    }

    public GetString(name: string): string;
    public GetString(name: string, cultureName: string): string;
    public GetString(name: string, cultureName?: string): string {
        var resources: Dictionary<string>;

        if (cultureName) {
            resources = this._resourceSet.Item(cultureName);
        }
        else {
            resources = this._resourceSet.Item(CultureInfo.CurrentUICulture.Name);
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
    }
}