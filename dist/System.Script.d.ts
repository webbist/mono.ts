import { IPrincipal } from "./System.Security.Principal";
export declare class JavaScriptContext {
    private static _instance;
    private _user;
    static Current: JavaScriptContext;
    User: IPrincipal;
}
