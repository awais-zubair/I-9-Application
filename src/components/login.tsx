import React from "react";
import {FormEvent, useContext, useEffect, useMemo, useState} from "react";
import {useHistory} from "react-router-dom";
import InvertedLogo from "../images/InvertedLogo.png";
import SmallLogo from "../images/SmallLogo.png";
import {EmployeeService} from "../services/employee-service";
import classes from "../styles/login.module.css";
import AppContext from "../contexts/app-context";
import {Helpers} from "../shared/helpers";
import {RoleType} from "../enums/role-type";

export default function Login(): JSX.Element {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [remember, setRemember] = useState(false);
    const [locale, setLocale] = useState({key: 0, value: "en-US", label: "English"});
    const history = useHistory();
    const context = useContext(AppContext);
    const locales = useMemo(() => [
        {key: 0, value: "en-US", label: "English"},
        {key: 1, value: "en-CA", label: "Canadian"},
        {key: 2, value: "fr-ca", label: "French"}
    ], []);

    useEffect(() => {
        let login = Helpers.extractCookie(document.cookie, "login");
        if (login) {
            setRemember(true);
            setLogin(login);
        }
        const locale = Helpers.extractCookie(document.cookie, "locale");
        setLocale(locales[locale ? +locale : 0]);
    }, [locales]);

    function onSubmit(event: FormEvent): void {
        event.preventDefault();
        EmployeeService.verifyLogin(login, password).then(employee => {
            if (employee && employee.employeeId) {
                context.loggedIn = true;
                context.user = `${employee.firstName} ${employee.lastName}`;
                context.role = employee.employeeRole.employeeRoleId;
                context.locale = locale.value;
                context.id = employee.employeeId;
                document.cookie = Helpers.createCookie("login", login, remember ? 30 : -30);
                document.cookie = Helpers.createCookie("locale", locale.key.toString(), 30);
                if(context.role == 2){
                    history.push(`/reviewer2`);
                } else {
                    history.push(`/${RoleType[context.role].toLowerCase()}`);
                }
            } else {
                setMessage("Invalid credentials");
            }
        });
    }

    function isDisabled(): boolean {
        return !login || !password;
    }

    return (
        <div className={classes.outer}>
            <img alt="logo" src={InvertedLogo} className={classes.backgroundLogo}/>
            <form className={classes.content}>
                <div className={classes.header}>
                    <img alt="logo" src={SmallLogo} className={classes.logo}/>
                    <div className={classes.picker}>
                        <select name={"locales"} aria-label={"locales"} className={classes.locale} onChange={e => setLocale(locales[+e.target.value])}
                                value={locale.key}>
                            {locales.map(locale => <option key={locale.key} value={locale.key}>{locale.label}</option>)}
                        </select>
                    </div>
                </div>
                <div className={classes.form}>
                    <div className={classes.caption}>Welcome to ADP</div>
                    <label htmlFor="userName">User ID</label>
                    <input data-testid="login" type="text" name="userName" className={`${classes.loginInput} ${classes.control}`} value={login}
                           onChange={e => setLogin(e.target.value)}
                           maxLength={15} size={40}/>
                    <div className={classes.remember}>
                        <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} name="remember"/>
                        <label htmlFor="remember">Remember My User ID</label>
                    </div>
                    <label htmlFor="password">Password (case sensitive)</label>
                    <input alt="password" type="password" name="password" className={`${classes.passwordInput} ${classes.control}`} value={password}
                           onChange={e => setPassword(e.target.value)}
                           maxLength={15} size={40}/>
                    <div className={classes.message}>{message}</div>
                    <button type="submit" className={`${classes.button} ${isDisabled() && classes.disabled}`} onClick={onSubmit}
                            disabled={isDisabled()}>
                        Log In
                    </button>
                </div>
            </form>
        </div>
    );
}
