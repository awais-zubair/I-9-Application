import { useContext, useEffect, useState, FormEvent } from "react";
import AppContext from "../contexts/app-context";
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";
import Header from "../components/header";
import NavBar from "../components/nav-bar";
import { Topic } from "../props/topic";
import { Employee } from "../models/employee";
import ReviewerDash from "../components/reviewer-dash";
import { EmployeeService } from "../services/employee-service";
import { I9Application } from "../models/i9-application";
import { I9ApplicationService } from "../services/i9application-service";
import { DocumentTypeService } from "../services/document-type-service";
import { LocationState } from "../props/location-path";
import { Doc } from "../models/document";
import { DocumentType } from "../enums/document-type";
import { Helpers } from "../shared/helpers";
import { OfficeService } from "../services/office-service";
import { Office } from "../models/office";
import { Province } from "../models/province";
import classes from "../styles/reviewer.module.css";
import { DocumentService } from "../services/document-service";
import ReactModal from "react-modal";
import { Status } from "../models/status";


export default function Reviewer(): JSX.Element {

    let original: Employee;
    let original2: I9Application;
    let context = useContext(AppContext);
    const location = useLocation<LocationState>();
    let history = useHistory();
    const topics = [
        new Topic(0, "Log Out", "logout")
    ];

    const [i9Application, setI9Application] = useState(new I9Application());
    const [employee, setEmployee] = useState(new Employee());
    const [office, setOffice] = useState(new Office());
    const [province, setProvince] = useState(new Province());
    const [documentObjectArray, setDocumentObjectArray] = useState<Doc[]>([]);
    const [ documentObject, setDocumentObject ] = useState(new Doc());
    const [document, setDocument] = useState("");
    const [documentName, setDocumentName] = useState("Nothing");
    const [documentType, setDocumentType] = useState(new Array<DocumentType>());
    const [selectedOption, setSelectedOption] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showModalRej, setShowModalRej] = useState(false);
    const [status, setStatus] = useState(new Status());

    useEffect(() => {
        if (!context.loggedIn) {
            history.push("./login");
        }
        documentObjectArray.push(new Doc()); // index 0
        documentObjectArray.push(new Doc()); // index 1
        I9ApplicationService.getI9ByApplicationById(location.state?.id).then((i9ApplicationResponse) => {
            console.log(i9ApplicationResponse);
            OfficeService.getOffice(i9ApplicationResponse.employee.officeId).then(office => {
                setOffice(office);
                setProvince(office.province);

            });
            console.log(office);
            setI9Application(i9ApplicationResponse);
        });
        EmployeeService.getEmployee(context.id).then((employee) => {
            setEmployee(employee);
        });
    }, []);

    useEffect(() => {
        if (!context.loggedIn) {
            history.push("./login");
        }
    });

    function isDisabled(): boolean {
        return !employee.firstName;
    }

    function setData<T>(target: T, key: keyof T, value: any): T {
        target[key] = value;
        return { ...target };
    }

    function documentDataSet(index: number, target: Doc, key: string, value: any): void {
        target[key] = value;
        const newDocObj = { ...target };
        documentObjectArray[index] = newDocObj;
        // can do set docObjArr here .. 
    }

    function onSubmit(event: FormEvent): void {
        event.preventDefault();
        status.statusId = 3;
        setStatus(status);
        i9Application.status = status;
   
        console.log("i9 APP::");
        console.log(i9Application);
        I9ApplicationService.updateI9ApplicationPatch(i9Application.i9ApplicationId, i9Application);

        documentObjectArray.forEach((doc) => { doc.i_9_ApplicationId = i9Application.i9ApplicationId; });
        if (selectedOption == "A") {
            documentObjectArray[0].listType = "A";
        } else {
            documentObjectArray[0].listType = "B";
            documentObjectArray[1].listType = "C";
        }
        console.log(documentObjectArray);
        documentObjectArray.forEach((doc) => { console.log(doc); 
            if(doc.documentTitle != null && doc.documentTitle != ""){
                console.log("posted");
                console.log(doc);    
                DocumentService.postDocument(doc);
            }
        });
        //history.push(`/login`);
        setShowModal(true);
    }

    function onReject(event: FormEvent): void {
        event.preventDefault();
        i9Application.status.statusId = 4;
        I9ApplicationService.updateI9ApplicationPatch(i9Application.i9ApplicationId, i9Application);
        setShowModalRej(true);
    }

    function closeModal(): void {
        setShowModal(false);
    }

    function closeModalRej(): void {
        setShowModalRej(false);
    }

    return (
        <div>
            <div className="outer">
                <Header />
                <div className="output">
                    <NavBar topics={topics} />
                    <div className="output">
                        <div>
                            {/* <Switch>
                            <Route path="/reviewer" exact>
                                {<ReviewerDash/>}
                            </Route>
                            <Redirect from="*" to="/reviewer"/>
                        </Switch> */}
                        </div>
                        {/* <div className={classes.outer}>
                        <form className={classes.form}>
                        <input type={"dropdown"} className={classes.input} value="Hello"></input>
                        </form>
                    </div> */}
                        <div className={classes.outer}>
                            <form className={classes.form}>
                                <h3>Section II - I9 Application</h3>
                                <div className={classes.control}>

                                    <label className={classes.label}>First Name:</label>
                                    <input type={"text"} className={classes.input} defaultValue={i9Application.firstName} onChange={event => setI9Application(setData(i9Application, "firstName", event.target.value))}/>
                                    <label className={classes.label}>Last Name:</label>
                                    <input type={"text"} className={classes.input} defaultValue={i9Application.lastName} onChange={event => setI9Application(setData(i9Application, "lastName", event.target.value))}/> 
                                </div>
                                <div className={classes.control}>
                                    <label className={classes.label}>Middle Initial:</label>
                                    <input type={"text"} className={classes.input} defaultValue={i9Application.middleInitial} onChange={event => setI9Application(setData(i9Application, "middleInitial", event.target.value))}/>

                                    <label className={classes.label}>Citizenship Status</label>
                                    <input type={"text"} className={classes.input} defaultValue={i9Application.citizenStatus} onChange={event => setI9Application(setData(i9Application, "aptNumber", event.target.value))} />
                                </div>
                                <div className={classes.control1}>
                                    <label className={classes.label} >Document List Type:</label>
                                        <div className={classes.radioContainer}>
                                            <div className={classes.radioButton}>
                                                <input type={"radio"} value="A" checked={selectedOption === 'A'} onChange={event => setSelectedOption(event.target.value)} />
                                                <label>
                                                    A
                                                </label>
                                                </div>
                                                <div className={classes.radioButton}>
                                                <input type={"radio"} value="B and C" checked={selectedOption === 'B and C'} onChange={event => setSelectedOption(event.target.value)} /> 
                                                <label>
                                                B and C
                                                </label>
                                                </div>
                                    </div>
                                </div>
                                {selectedOption == "A" && (<div>
                                    <div className={classes.control}>
                                        <label className={classes.label}> List A Document Type:</label>
                                        <select className={classes.combo} defaultValue={document} onChange={e => documentDataSet(0, documentObjectArray[0], "documentTitle", e.target.value)}>
                                            {Object.keys(DocumentType).map(key =>
                                                <option key={key} value={key}>{DocumentType[key as keyof typeof DocumentType]}
                                                </option>)}
                                        </select>
                                        <label className={classes.label}>Issuing Authority:</label>
                                        <input type={"text"} className={classes.input} defaultValue={""} onChange={event => documentDataSet(0, documentObjectArray[0], "issuingAuthority", event.target.value)} />
                                    </div>
                                    <div className={classes.control}>
                                        <label className={classes.label}>Document Number:</label>
                                        <input type={"text"} className={classes.input} defaultValue={""} onChange={event => documentDataSet(0, documentObjectArray[0], "documentNumber", event.target.value)} />
                                        <label className={classes.label}>Expiration Date:</label>
                                        <input type={"text"} className={classes.input} defaultValue={""} onChange={event => documentDataSet(0, documentObjectArray[0], "expirationDate", event.target.value)} />
                                    </div></div>)}
                                {selectedOption == "B and C" && (<div>
                                    <div className={classes.control}>
                                        <label className={classes.label}>List B Document Type:</label>
                                        <select className={classes.combo} defaultValue={document} onChange={e => documentDataSet(0, documentObjectArray[0], "documentTitle", e.target.value)}>
                                            {Object.keys(DocumentType).map(key =>
                                                <option key={key} value={key}>{DocumentType[key as keyof typeof DocumentType]}
                                                </option>)}
                                        </select>
                                        <label className={classes.label}>Issuing Authority:</label>
                                        <input type={"text"} className={classes.input} defaultValue={""} onChange={event => documentDataSet(0, documentObjectArray[0], "issuingAuthority", event.target.value)} />
                                    </div>
                                    <div className={classes.control}>
                                        <label className={classes.label}>Document Number:</label>
                                        <input type={"text"} className={classes.input} defaultValue={""} onChange={event => documentDataSet(0, documentObjectArray[0], "documentNumber", event.target.value)} />
                                        <label className={classes.label}>Expiration Date:</label>
                                        <input type={"text"} className={classes.input} defaultValue={""} onChange={event => documentDataSet(0, documentObjectArray[0], "expirationDate", event.target.value)} />
                                    </div>
                                    <div className={classes.control}>
                                        <label className={classes.label}>List C Document Type:</label>
                                        <select className={classes.combo} defaultValue={document} onChange={e => documentDataSet(1, documentObjectArray[1], "documentTitle", e.target.value)}>
                                            {Object.keys(DocumentType).map(key =>
                                                <option key={key} value={key}>{DocumentType[key as keyof typeof DocumentType]}
                                                </option>)}
                                        </select>
                                        <label className={classes.label}>Issuing Authority:</label>
                                        <input type={"text"} className={classes.input} defaultValue={""} onChange={event => documentDataSet(1, documentObjectArray[1], "issuingAuthority", event.target.value)} />
                                    </div>
                                    <div className={classes.control}>
                                        <label className={classes.label}>Document Number:</label>
                                        <input type={"text"} className={classes.input} defaultValue={""} onChange={event => documentDataSet(1, documentObjectArray[1], "documentNumber", event.target.value)} />
                                        <label className={classes.label}>Expiration Date:</label>
                                        <input type={"text"} className={classes.input} defaultValue={""} onChange={event => documentDataSet(1, documentObjectArray[1], "expirationDate", event.target.value)} />
                                    </div>
                                </div>)}
                                {/* <div className={classes.control}>
                                <label className={classes.label}>First Date of Employment:</label>
                                <input type={"text"} className={classes.input} value={new Date(i9Application.employee.hireDate).getDate()+"/"+new Date(i9Application.employee.hireDate).getMonth()+"/"+new Date(i9Application.employee.hireDate).getFullYear()}  />
                            </div>   */}
                                <div className={classes.control}>
                                    <label className={classes.label}>First Name of Reviewer:</label>
                                    <input type={"text"} className={classes.input} defaultValue={employee.firstName} onChange={event => setI9Application(setData(i9Application, "address", event.target.value))} />

                                    <label className={classes.label}>Last Name of Reviewer:</label>
                                    <input type={"text"} className={classes.input} defaultValue={employee.lastName} onChange={event => setI9Application(setData(i9Application, "address", event.target.value))} />
                                </div>
                                <div className={classes.control}>
                                    <label className={classes.label}>Employer Name:</label>
                                    <input type={"text"} className={classes.input} defaultValue={office.name} onChange={event => setI9Application(setData(i9Application, "businessName", event.target.value))} />

                                    <label className={classes.label}>Employer Address:</label>
                                    <input type={"text"} className={classes.input} defaultValue={office.street} onChange={event => setI9Application(setData(i9Application, "address", event.target.value))} />
                                </div>
                                <div className={classes.control}>
                                    <label className={classes.label}>Employer City:</label>
                                    <input type={"text"} className={classes.input} defaultValue={office.city} onChange={event => setI9Application(setData(i9Application, "address", event.target.value))} />

                                    <label className={classes.label}>Employer State:</label>
                                    <input type={"text"} className={classes.input} defaultValue={province.description} onChange={event => setI9Application(setData(i9Application, "address", event.target.value))} />

                                </div>
                                <div className={classes.control1}>
                                    <label className={classes.label}>Employer Zip Code:</label>
                                    <input type={"text"} className={classes.input} defaultValue={office.postalCode} onChange={event => setI9Application(setData(i9Application, "address", event.target.value))} />

                                </div>
                                <div className={classes.control}>
                                    <button type="submit" className={`${classes.button} ${isDisabled() && classes.disabled}`} onClick={onSubmit}
                                        disabled={isDisabled()}>
                                        Submit
                                    </button>
                                    <ReactModal
                                    isOpen={showModal}
                                    onRequestClose={closeModal}
                                    className={classes.modal}
                                    >
                                    <div>
                                    <h2>Section 2 Submitted!</h2>
                                    <h3>Please reach out to helpDesk@employement.com if you have any queries.</h3>
                                    </div>
                                    <div style={{ position: "relative", height: "50%" }}>
                                        <button
                                        style={{
                                            position: "absolute",
                                            left: "50%",
                                            top: "50%",
                                            transform: "translate(-50%, -50%)",
                                            width: 100,
                                            marginBottom: 100
                                        }}
                                        onClick={closeModal}>
                                        Close
                                        </button>
                                    </div>
                                </ReactModal>
                                    <button type="submit" className={`${classes.rejButton}`} onClick={onReject}>
                                        Reject
                                    </button>
                                </div>
                                <ReactModal
                                    isOpen={showModalRej}
                                    onRequestClose={closeModalRej}
                                    className={classes.modal}
                                    >
                                    <div>
                                    <h2>Section 2 Rejected!</h2>
                                    <h3>Please reach out to helpDesk@employement.com if you have any queries.</h3>
                                    </div>
                                    <div style={{ position: "relative", height: "50%" }}>
                                        <button
                                        style={{
                                            position: "absolute",
                                            left: "50%",
                                            top: "50%",
                                            transform: "translate(-50%, -50%)",
                                            width: 100,
                                            marginBottom: 100
                                        }}
                                        onClick={closeModalRej}>
                                        Close
                                        </button>
                                    </div>
                                </ReactModal>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}