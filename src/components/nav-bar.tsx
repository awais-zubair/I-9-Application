import NavButton from "./nav-button";
import classes from "../styles/nav-bar.module.css";
import {ITopics} from "../props/topic";

export default function NavBar(props: ITopics): JSX.Element {

    return (
        <div className={classes.outer}>
            {props.topics.map(topic => <NavButton key={topic.key} label={topic.label} route={topic.route}/>)}
        </div>
    );
}
