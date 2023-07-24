import {createContext} from "react";
import {ContextModel} from "./context-model";
import {RoleType} from "../enums/role-type";

const AppContext = createContext<ContextModel>({
    loggedIn: false,
    user: "",
    id: 0,
    role: RoleType.Undefined,
    locale: "en-US"
});

export default AppContext;
