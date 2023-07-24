import AppContext from "../contexts/app-context";
import { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";

import Header from "../components/header";
import NavBar from "../components/nav-bar";
import { Topic } from "../props/topic";

import { I9Application } from "../models/i9-application";
import { I9ApplicationService } from "../services/i9application-service";
import classes from "../styles/office-list.module.css";
import { LocationPath } from "../props/location-path";

export default function Reviewer2(): JSX.Element {
    const context = useContext(AppContext);
    let history = useHistory();
    const topics = [
        new Topic(0, "Log Out", "logout")
    ];

    const [i9Applications, setI9Applications] = useState(new Array<I9Application>()); // utilize later for when you pick a specific i9 out of the arr
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        if (!context.loggedIn) {
            history.push("./login");
        }
        loadContent(currentPage, context.id);
    }, [currentPage]);

    function loadContent(page: number, reviewerId: number) {
        I9ApplicationService.getAllI9Applications(page, reviewerId).then(result => {
            setI9Applications(result.content.sort((a,b)=>(a.dateCreated > b.dateCreated) ? 1 : -1));
            setPageCount(result.totalPages);
        });
    }

    function onClickNext(): void {
        let page = currentPage + 1;
        loadContent(page, context.id);
        setCurrentPage(page);
    }

    function onClickPrior(): void {
        let page = currentPage - 1;
        loadContent(page, context.id);
        setCurrentPage(page);
    }

    function setDueDate(date: Date): string {
        let newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 3);
        return newDate.getDate() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear();
    }

    return (
        <div className="outer">
            <Header />
            <div className="body">
                <NavBar topics={topics} />
                <div className="output">
                    <div className={classes.outer}>
                        <div className={classes.heading}>
                            <div className={`${classes.column} ${classes.name}`}>Name</div>
                            <div className={`${classes.column} ${classes.date}`}>Due</div>
                        </div>
                        {i9Applications?.map(i9Application =>
                            <div className={classes.row} key={i9Application.i9ApplicationId}>
                                <div className={`${classes.column} ${classes.name}`}><Link to={new LocationPath("reviewer", i9Application.i9ApplicationId)}>{i9Application.employee.firstName + " " + i9Application.employee.lastName}</Link></div>
                                <div className={`${classes.column} ${classes.date}`}>{setDueDate(i9Application.dateCreated)}</div>
                            </div>)}
                        <div className={classes.controls}>
                            <div className={classes.footer}>
                                <div className={classes.control}>
                                    <button type="button" onClick={onClickPrior} disabled={currentPage === 0}> Prior page </button>
                                </div>
                                <div className={classes.counter}>
                                    Page {currentPage + 1} of {pageCount}
                                </div>
                                <div className={classes.control}>
                                    <button type="button" onClick={onClickNext} disabled={currentPage === pageCount - 1}> Next page </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}