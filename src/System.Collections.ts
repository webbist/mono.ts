// copyright 2016 Webbist Multimedia Enr.

// licensed under the Apache License, Version 2.0(the "License");
// you may not use this file except in compliance with the License.
// you may obtain a copy of the License at

//    http://www.apache.org/licenses/LICENSE-2.0

// unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
// either express or implied.
// see the License for the specific language governing permissions and limitations under the License.

namespace System.Collections {
    export class KeyValuePair<TValue> {
        private _key: string;
        private _value: TValue;

        get Key(): string {
            return this._key;
        }

        get Value(): TValue {
            return this._value;
        }

        public constructor(key: string, value: TValue) {
            this._key = key;
            this._value = value;
        }
    }

    export interface IIndexable<T> {
        GetIndex(): Array<T>
    }
}