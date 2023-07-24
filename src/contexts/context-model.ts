import {RoleType} from "../enums/role-type";

export class ContextModel {
    loggedIn: boolean;
    user: string;
    role: RoleType;
    locale: string;
    id: number;
}
