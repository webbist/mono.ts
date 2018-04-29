// copyright 2016 Webbist Multimedia Enr.

// licensed under the Apache License, Version 2.0(the "License");
// you may not use this file except in compliance with the License.
// you may obtain a copy of the License at

//    http://www.apache.org/licenses/LICENSE-2.0

// unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
// either express or implied.
// see the License for the specific language governing permissions and limitations under the License.

/// <reference path="System.Security.Principal.ts" />

namespace System.Scripts {
    export class JavaScriptContext {
        private static _instance: JavaScriptContext;
        private _user: System.Security.Principal.IPrincipal;

        static get Current(): JavaScriptContext {
            if (!JavaScriptContext._instance) {
                JavaScriptContext._instance = new JavaScriptContext();
            }
            return JavaScriptContext._instance;
        }

        get User(): System.Security.Principal.IPrincipal {
            return this._user;
        }
        set User(value: System.Security.Principal.IPrincipal) {
            this._user = value;
        }
    }
}