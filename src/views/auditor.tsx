import {useContext, useEffect} from "react";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import AppContext from "../contexts/app-context";
import Header from "../components/header";
import NavBar from "../components/nav-bar";
import classes from "../styles/view.module.css";
import OfficeList from "../components/office-list";
import AuditorDash from "../components/auditor-dash";
import Notification from "../components/notification";
import {Topic} from "../props/topic";
import OfficeEdit from "../components/office-edit";

export default function Auditor(): JSX.Element {
    let context = useContext(AppContext);
    let history = useHistory();
    const topics = [
        new Topic(0, "Dashboard", "dashboard"),
        new Topic(1, "Offices", "offices"),
        new Topic(2, "About", "about"),
        new Topic(3, "Log Out", "logout")
    ];

    useEffect(() => {
        if (!context.loggedIn) {
            history.push("./login");
        }
    });

    return (
        <div>
            <Header/>
            <div className="body">
                <NavBar topics={topics}/>
                <div className={classes.outer}>
                    <div>
                        <Switch>
                            <Route path="/auditor" exact>
                                <AuditorDash/>
                            </Route>
                            <Route path="/auditor/dashboard" exact>
                                <AuditorDash/>
                            </Route>
                            <Route path="/auditor/offices" exact>
                                <OfficeList/>
                            </Route>
                            <Route path="/auditor/office" exact>
                                <OfficeEdit/>
                            </Route>
                            <Route path="/auditor/notification" exact>
                                <Notification/>
                            </Route>
                            <Redirect from="*" to="/login"/>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
}

