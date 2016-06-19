export interface IIdentity {
    AuthenticationType: string;
    IsAuthenticated: boolean;
    Name: string;
}
export interface IPrincipal {
    Identity: IIdentity;
    IsInRole(role: string): boolean;
}
