import {Redirect, Route, Switch} from "react-router-dom";
import Auditor from "./auditor";
import Applicant from "./applicant";
import Manager from "./manager";
import Reviewer from "./reviewer";
import Login from "../components/login";
import Logout from "../components/logout";
import Reviewer2 from "./reviewer2";
import ManagerStats from "./managerStats";
import "../styles/main.css";

export default function Main(): JSX.Element {

    return (
        <Switch>
            <Route path="/login" exact>
                <Login/>
            </Route>
            <Route path="/applicant" exact>
                <Applicant/>
            </Route>
            <Route path="/auditor">
                <Auditor/>
            </Route>
            <Route path="/manager">
                <Manager/>
            </Route>
            <Route path="/reviewer2">
                <Reviewer2/>
            </Route>
            <Route path="/reviewer">
                <Reviewer/>
            </Route>
            <Route path="/managerStats">
                <ManagerStats/>
            </Route>
            <Route path="/logout" exact>
                <Logout/>
            </Route>
            <Redirect from="*" to="/login"/>
        </Switch>
    );

}
