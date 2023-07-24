import {FormEvent, useContext, useEffect, useState} from "react";
import classes from "../styles/notification.module.css";
import {Helpers} from "../shared/helpers";
import {EmployeeService} from "../services/employee-service";
import {Employee} from "../models/employee";
import {NotificationType} from "../enums/notification-type";
import AppContext from "../contexts/app-context";
import {RoleType} from "../enums/role-type";
import {useHistory} from "react-router-dom";
import {DocumentType} from "../enums/document-type";
import { toast } from "../shared/toast-manager";
import { ToastProps } from "../shared/toast-props";

export default function Notification(): JSX.Element {
    const [user, setUser] = useState("");
    const [users, setUsers] = useState(new Array<Employee>());
    const [type, setType] = useState(RoleType.Auditor);
    const [code, setCode] = useState("");
    const [comments, setComments] = useState("");
    const [document, setDocument] = useState("");
    const context = useContext(AppContext);
    const history = useHistory();
    //let documentName = "Undefined";
    const[documentName, setDocumentName] = useState("Nothing");

    useEffect(() => {
        loadUsers();
    }, []);

    function loadUsers(): void {
        EmployeeService.getEmployees().then(result => {
            setUsers(result.content.sort((first, second) =>
                Helpers.greaterThan(first.lastName, second.lastName)));
        });
    }

    function onSelectDocument(key: string): void {
        setDocument(key);
        //documentName = Helpers.stringToEnum(DocumentType, key as keyof typeof DocumentType);
        setDocumentName(Helpers.stringToEnum(DocumentType, key as keyof typeof DocumentType));
    }

    function onSubmit(event: FormEvent): void {
        event.preventDefault();
        toast.show(new ToastProps("Notification submitted",`${user}, ${type}, ${code}, ${comments}`,5000));
        let role = RoleType[context.role].toLowerCase();
        history.push(`/${role}/dashboard`);
    }

    function onClear(): void {
        setUser("");
        setType(0);
        setComments("");
        setCode("");
    }

    function isDisabled(): boolean {
        return !user || !type || !comments;                                            // Note that code is optional
    }

    return (
        <div className={classes.outer}>
            <form className={classes.form}>
                <span className={classes.caption}>Notify other system users</span>
                <div className={classes.instructions}>
                    <span>Use this form to tag I-9 submissions with comments. You can then use these for subsequent follow-up.</span>
                </div>
                <div className={classes.control}>
                    <label className={classes.label} htmlFor="user">User Name:</label>
                    <select className={classes.combo} id="user" onChange={e => setUser(e.target.value)} value={user}>
                        {<option value={""}>Select User</option>}
                        {users.map(user => <option key={user.employeeId} value={user.email}>{`${user.lastName}, ${user.firstName}`}</option>)}
                    </select>
                </div>
                <div className={classes.control}>
                    <label className={classes.label}>Email Address:</label>
                    <span>{user}</span>
                </div>
                <div className={classes.control}>
                    <label className={classes.label}>Document Type:</label>
                    <select className={classes.combo} value={document} onChange={e => onSelectDocument(e.target.value)}>
                        {Object.keys(DocumentType).map(key =>
                            <option key={key} value={key}>{DocumentType[key as keyof typeof DocumentType]}
                            </option>)}
                    </select>
                </div>
                <div className={classes.control}>
                    <label className={classes.label}>Document Name:</label>
                    <span>{documentName}</span>
                </div>
                <div className={classes.control}>
                    <label className={classes.label}>Notification Type:</label>
                    <select className={classes.combo} onChange={e => setType(+e.target.value)} value={type}>
                        {Helpers.enumKeys(NotificationType).map(type => <option key={type} value={NotificationType[type]}>{type}</option>)}
                    </select>
                </div>
                {context.role === RoleType.Auditor ?
                    <div className={classes.control}>
                        <label className={classes.label}>Auditor Code:</label>
                        <input type={"text"} className={classes.input} value={code} onChange={event => setCode(event.target.value)}/>
                    </div>
                    : null}
                <div className={classes.control}>
                    <label className={classes.label}>Comments:</label>
                </div>
                <textarea maxLength={2000} rows={20} cols={20} className={classes.comments} placeholder={"Enter your comments"}
                          onChange={e => setComments(e.target.value)} value={comments}/>
                <div className={classes.controls}>
                    <button type="submit" className={`${classes.button} ${isDisabled() && classes.disabled}`} onClick={onSubmit}
                            disabled={isDisabled()}>
                        Submit Notification
                    </button>
                    <button type="button" className={classes.button} onClick={onClear}>
                        Clear Values
                    </button>
                </div>
            </form>
        </div>
    );
}
