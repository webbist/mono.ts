// copyright 2016 Webbist Multimedia Enr.

// licensed under the Apache License, Version 2.0(the "License");
// you may not use this file except in compliance with the License.
// you may obtain a copy of the License at

//    http://www.apache.org/licenses/LICENSE-2.0

// unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
// either express or implied.
// see the License for the specific language governing permissions and limitations under the License.

namespace System {
    export class DateTime {
        private _date: Date;

        get Date(): Date {
            return this._date;
        }

        static get Now(): Date {
            return new Date();
        }

        constructor(value?: string) {
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
    }

    export class EventArgs {

        static Empty: EventArgs = new EventArgs();

        public constructor() {
        }
    }

    export class Guid implements IEquatable<Guid> {
        private _guid: string;

        public static Empty: Guid = new Guid();

        constructor(guid?: string) {
            if (guid) {
                this._guid = guid;
            }
            else {
                this._guid = "00000000-0000-0000-0000-000000000000";
            }
        }

        Equals(other: Guid): boolean {
            return this._guid === other.ToString();
        }

        public toJSON() {
            return this._guid;
        }

        public ToString(): string {
            return this._guid;
        }
    }

    export interface IEquatable<T> {
        Equals(other: T): boolean;
    }

    export class String {
        private static _empty: string = "";

        public static get Empty(): string {
            return String._empty;
        }

        public static IsNullOrWhiteSpace(value: string) {
            if (!value || value === "") {
                return true;
            }

            for (var i = 0; i < value.length; i++) {
                if (value.charAt(i) !== " ") {
                    return false;
                }
            }
            return true;
        }

        public static Format(format: string, ...params: any[]) {
            var result = '';

            for (var i = 0; ;) {
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
                if (close < 0) throw "stringFormatBraceMismatch";
                var brace = format.substring(i, close);
                var colonIndex = brace.indexOf(':');
                var argNumber = parseInt((colonIndex < 0) ? brace : brace.substring(0, colonIndex), 10);
                if (isNaN(argNumber)) throw "stringFormatInvalid";
                var argFormat = (colonIndex < 0) ? '' : brace.substring(colonIndex + 1);
                var arg = params[argNumber];
                if (typeof (arg) === "undefined" || arg === null) {
                    arg = '';
                }
                // TODO: Supporter la culture
                //if (arg.toFormattedString) {
                //    result += arg.toFormattedString(argFormat);
                //}
                //else if (useLocale && arg.localeFormat) {
                //    result += arg.localeFormat(argFormat);
                //}
                //else if (arg.format) {
                //    result += arg.format(argFormat);
                //}
                //else
                result += arg.toString();
                i = close + 1;
            }
            return result;
        }
    }
}