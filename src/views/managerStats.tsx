import { useContext, useEffect, useState } from "react";
import AppContext from "../contexts/app-context";
import { useHistory, Link } from "react-router-dom";
import { Topic } from "../props/topic";
import Header from "../components/header";
import NavBar from "../components/nav-bar";
import classes from "../styles/office-list.module.css";
import { I9ApplicationService } from "../services/i9application-service";
import { VictoryPie } from "victory-pie";

export default function ManagerStats(): JSX.Element {
    const context = useContext(AppContext);
    let history = useHistory();
    const topics = [
        new Topic(0, "Log Out", "logout")
    ];
    const [totalBlocklisted, setTotalBlocklisted] = useState(0);
    const [totalRejected, setTotalRejected] = useState(0);
    const [totalApproved, setTotalApproved] = useState(0);
    const [totalTodo, setTotalTodo] = useState(0);
    const [data, setData] = useState([
        { x: "Blocklisted", y: 0 },
        { x: "Rejected", y: 0 },
        { x: "Approved", y: 0 },
        { x: "Todo", y: 0 },
    ]);
    //const [label, setLabel] = useState(false);
    useEffect(() => {
        if (!context.loggedIn) {
            history.push("./login");
        }
        I9ApplicationService.getI9StatusTotalsByType(5).then((value) => { setTotalBlocklisted(value); let updated = [...data]; updated[0].y = value; setData(updated); });
        I9ApplicationService.getI9StatusTotalsByType(4).then((value) => { setTotalRejected(value); let updated = [...data]; updated[1].y = value; setData(updated); });
        I9ApplicationService.getI9StatusTotalsByType(3).then((value) => { setTotalApproved(value); let updated = [...data]; updated[2].y = value; setData(updated); });
        I9ApplicationService.getI9StatusTotalsByType(2).then((value) => { setTotalTodo(value); let updated = [...data]; updated[3].y = value; setData(updated); });
    }, []);

    return (
        <div className="outer">
            <Header />
            <div className="body">
                <NavBar topics={topics} />
                <div className="output">
                    <div className={classes.footer1}>
                    <VictoryPie
                                animate={{
                                    duration: 2000
                                }}
                                origin={{ x: 150, y: 100 }}
                                colorScale={["#000099", "#ff4d4d", "#00cc00", "#bf80ff"]}
                                data={data}
                                labels={({datum})=>`${datum.x}: ${datum.y}`} 
                                width={250}
                                style={{ parent: { paddingBottom: 0 }, data: { paddingBottom: 4 }, labels: { fontSize: 12, padding: 10 } }}/>
                    </div>
                </div>
            </div>
        </div>
    );
}