// copyright 2016 Webbist Multimedia Enr.

// licensed under the Apache License, Version 2.0(the "License");
// you may not use this file except in compliance with the License.
// you may obtain a copy of the License at

//    http://www.apache.org/licenses/LICENSE-2.0

// unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
// either express or implied.
// see the License for the specific language governing permissions and limitations under the License.

import { Dictionary } from "./System.Collections.Generic";
import { KeyValuePair } from "./System.Collections";

function GetLocalizedDisplayName(): Dictionary<string> {
    return new Dictionary<string>([
        new KeyValuePair<string>("en", "English"),
        new KeyValuePair<string>("fr", "français"),
        new KeyValuePair<string>("es", "español")
    ]);
}

export class CultureInfo {
    private static _currentUICulture: CultureInfo = new CultureInfo("en");
    private static _localizedDisplayName: Dictionary<string> = GetLocalizedDisplayName();
    private _name: string;

    public static get CurrentUICulture(): CultureInfo {
        return CultureInfo._currentUICulture;
    }
    public static set CurrentUICulture(value: CultureInfo) {
        CultureInfo._currentUICulture = value;
    }

    public get DisplayName(): string {
        return CultureInfo._localizedDisplayName.Item(this._name);
    }

    public get Name(): string {
        return this._name;
    }

    public constructor(name: string) {
        this._name = name;
    }
}