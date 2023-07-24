import {useContext, useEffect, useState} from "react";
import AppContext from "../contexts/app-context";
import {RoleType} from "../enums/role-type";
import classes from "../styles/header.module.css";
import SmallLogo from "../images/SmallLogo.png";
import BobbleHead from "../images/BobbleHead.png";

export default function Header(): JSX.Element {
    const context = useContext(AppContext);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    useEffect(() => {
        setClock(new Date());                                          // So we don't wait one second
        const interval = setInterval(() => {
            setClock(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, [context.locale]);

    function setClock(now: Date): void {
        let date = now.toLocaleDateString(context.locale);
        setDate(date);
        let time = now.toLocaleTimeString(context.locale);
        setTime(time);
    }

    return (
        <div className={classes.outer}>
            <img alt="logo" src={SmallLogo} className={classes.logo}/>
            <div className={classes.tagline}>
                <span>Always designing for people</span>
            </div>
            <h1 className={classes.title}>I-9 Submission System</h1>
            <div className={classes.bobble}>
                <img alt="bobble head" src={BobbleHead}/>
            </div>
            <div className={classes.user}>
                <span><b>User: </b>{context.user}</span>
                <span><b>Role: </b>{RoleType[context.role]}</span>
            </div>
            <div className={classes.clock}>
                <div>{date}</div>
                <div>{time}</div>
            </div>
        </div>
    );
}

