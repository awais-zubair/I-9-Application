import {useContext, useState} from "react";
import classes from "../styles/nav-button.module.css";
import {Topic} from "../props/topic";
import {useHistory} from "react-router-dom";
import Modal from "./modal";
import About from "./about";
import AppContext from "../contexts/app-context";
import {RoleType} from "../enums/role-type";
import ReactDOM from "react-dom";

export default function NavButton(props: Topic): JSX.Element {
    const history = useHistory();
    const context = useContext(AppContext);
    const [visible, setVisible] = useState(false);

    function showModal(state: boolean): void {
        setVisible(state);
    }

    function onClick(): void {
        let role = RoleType[context.role].toLowerCase();
        switch (props.route) {
            case "about":
                showModal(!visible);
                break;
            case "logout":
                history.push(`/logout`);
                break;
            case "managerStats":
                history.push(`/managerStats`);
                break;
            default:
                history.push(`/${role}/${props.route}`);
        }
    }

    return (
        <div className={classes.outer} onClick={onClick}>
            <span>{props.label}</span>
            {ReactDOM.createPortal(<Modal show={showModal} visible={visible}> <About/> </Modal>, document.body)}
        </div>
    );

}
