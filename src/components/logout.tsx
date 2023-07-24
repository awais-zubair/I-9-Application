import {useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";
import AppContext from "../contexts/app-context";

export default function Logout() {
    const history = useHistory();
    const context = useContext(AppContext);

    useEffect(() => {
        context.loggedIn = false;
        history.push("./login");
    }, [context, history]);

    return null;

}
