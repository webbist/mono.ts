// copyright 2016 Webbist Multimedia Enr.

// licensed under the Apache License, Version 2.0(the "License");
// you may not use this file except in compliance with the License.
// you may obtain a copy of the License at

//    http://www.apache.org/licenses/LICENSE-2.0

// unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
// either express or implied.
// see the License for the specific language governing permissions and limitations under the License.

import { KeyValuePair } from "./System.Collections";

export interface IDictionary<TValue> {
    Count: number;

    Add(item: KeyValuePair<TValue>): void;
    Add(key: string, value: any): void;
    Item(key: string): TValue;
    Item(key: string, value: TValue): void;
}

export class Dictionary<TValue> implements IDictionary<TValue> {
    private _list: Array<KeyValuePair<TValue>>;

    get Count(): number {
        return this._list.length;
    }

    public constructor(list: Array<KeyValuePair<TValue>> = new Array<KeyValuePair<TValue>>()) {
        this._list = list;
    }

    Add(first: any, second?: any): void {
        if (typeof second === "undefined") {
            this._list.push(<KeyValuePair<TValue>>first);
        }
        else {
            this._list.push(<KeyValuePair<TValue>>new KeyValuePair(<string>first, second));
        }
    }

    Item(key: string, value?: TValue): TValue {
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
    }
}