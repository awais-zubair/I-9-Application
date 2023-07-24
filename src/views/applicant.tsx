import { FormEvent, SetStateAction, useContext, useEffect, useState } from "react";
import AppContext from "../contexts/app-context";
import { useHistory } from "react-router-dom";
import Header from "../components/header";
import NavBar from "../components/nav-bar";
import { Topic } from "../props/topic";
import classes from "../styles/office-edit.module.css";
import { I9Application } from "../models/i9-application";
import { Employee } from "../models/employee";
import { EmployeeService } from "../services/employee-service";
import { Province } from "../models/province";
import { I9ApplicationService } from "../services/i9application-service";
import ReactModal from "react-modal";
import { Status } from "../models/status";
import { reduceEachTrailingCommentRange } from "typescript";

export default function Applicant(): JSX.Element {
    let context = useContext(AppContext);
    let history = useHistory();
    const topics = [
        new Topic(0, "Log Out", "logout")
    ];
    const [i9Application, setI9Application] = useState(new I9Application());
    const [employee, setEmployee] = useState(new Employee());
    const [province, setProvince] = useState(new Province());
    const [showModal, setShowModal] = useState(false);
    const [selectedOption , setSelectedOption] = useState('');
    const [showModalBlock, setShowModalBlock] = useState(false);
    const [status, setStatus] = useState(new Status());
    let validationString = "";


    useEffect(() => {
        if (!context.loggedIn) {
            history.push("./login");
        }
        //console.log(employee.provinceCode.provinceCode);
        EmployeeService.getEmployee(context.id).then((employee) => {
            setEmployee(employee);
            console.log(employee.provinceCode.provinceCode);
            setProvince(employee.provinceCode); // last edit!

            //setI9Application(i9Application);
            //original = employee;
            //original2 = i9Application;
        });
        //console.log(employee.provinceCode.provinceCode);
    },[]);

    function validateDefaults(): void {
        i9Application.employee = employee;
        i9Application.dateCreated = new Date();
        status.statusId = 2;
        i9Application.status = status;
        if(i9Application["address"] == null){
            i9Application["address"] = employee.street;
        }
        if(i9Application["zipCode"] == null){
            i9Application["zipCode"] = employee.postalCode;
        }
        if(i9Application["aptNumber"] == null){
            i9Application["aptNumber"] = employee.aptNumber;
        }
        if(i9Application["city"] == null){
            i9Application["city"] = employee.city;
        }
        if(i9Application["state"] == null){
            i9Application["state"] = province.provinceCode;
        }
 if(i9Application["firstName"] == null){
            i9Application["firstName"] = employee.firstName;
        }
        if(i9Application["lastName"] == null){
            i9Application["lastName"] = employee.lastName;
        }
        if(i9Application["middleInitial"] == null){
            i9Application["middleInitial"] = employee.middleInitial;
        }
        if(i9Application["email"] == null){
            i9Application["email"] = employee.email;
        }
        if(i9Application["ssn"] == null){
            i9Application["ssn"] = employee.ssn;
        }
        if(i9Application["phoneNumber"] == null){
            i9Application["phoneNumber"] = employee.phoneNumber;
        }
           }

    function onSubmit(event: FormEvent): void {
        event.preventDefault();
           
        validateDefaults();
        if(!checkFields()){
     
        console.log(employee);
        console.log(i9Application);

        I9ApplicationService.saveSectionOneI9Application(i9Application).then((i9AppResp)=>{
            console.log(i9AppResp);
            if(i9AppResp.status.statusId == 5){
                setShowModalBlock(true);
            } else {
                setShowModal(true);
            }
        }
    
        );
    }
        //history.push(`/login`);
    }

    function isDisabled(): boolean {
        return !employee.firstName || !employee.lastName || !employee.ssn ;
    }

    // function isBlockListed(): boolean {
    //     if( i9Application.statusId == 5){
    //         setShowModalBlock(true);
    //         return true;
    //     }
    //     return false;
    // }

    function checkFields(): boolean {
        let flag = false;
        let count = 0;
        validationString += "Please enter neccessary details:";
        if(i9Application["firstName"] == null || i9Application["firstName"] === ""){
            validationString += " First Name"; 
            count++;
            flag = true;
        }
        if(i9Application["lastName"] == null || i9Application["lastName"] === ""){
            if(count > 0){
                validationString += ",";
            }
            validationString += " Last name"; 
            count++;
            flag = true;
        }
        if(i9Application["address"] == null || i9Application["address"] === ""){
            if(count > 0){
                validationString += ",";
            }
            validationString += " Address"; 
            count++;
            flag = true;
        }
        if(i9Application["city"] == null || i9Application["city"] === ""){
            if(count > 0){
                validationString += ",";
            }
            validationString += " City"; 
            count++;
            flag = true;
        }
        if(i9Application["zipCode"] == null || i9Application["zipCode"] === ""){
            if(count > 0){
                validationString += ",";
            }
            validationString += " Zip Code"; 
            count++;
            flag = true;
        }
        if(i9Application["state"] == null || i9Application["state"] === ""){
            if(count > 0){
                validationString += ",";
            }
            validationString += " State"; 
            count++;
            flag = true;
        }
        if(i9Application["ssn"] == null || i9Application["ssn"] === ""){
            if(count > 0){
                validationString += ",";
            }
            validationString += " SSN";
            count++; 
            flag = true;
        }
        if(i9Application["preparedOrTranslatedId"] == null || i9Application["preparedOrTranslatedId"] === ""){
            if(count > 0){
                validationString += ",";
            }
            validationString += " Prepared/Translated"; 
            count++;
            flag = true;
        }
        if(i9Application["citizenStatus"] == null || i9Application["citizenStatus"] === ""){
            if(count > 0){
                validationString += ",";
            }
            validationString += " US Status"; 
            count++;
            flag = true;
        }
        if(i9Application.citizenStatus == "ALIEN"){
        if(i9Application["uscisNumber"] == null || i9Application["uscisNumber"] === ""){
            if(count > 0){
                validationString += ",";
            }
            validationString += " USCIS number"; 
            count++;
            flag = true;
        }
        if(i9Application["alienAuthorizationDate"] == null){
            if(count > 0){
                validationString += ",";
            }
            validationString += " Alien authorization date"; 
            count++;
            flag = true;
        }
        if(i9Application["form_I_94_AdmissionNumber"] == null || i9Application["form_I_94_AdmissionNumber"] === ""){
            if(count > 0){
                validationString += ",";
            }
            validationString += " Form I-94 Admission Number";
            count++;
            flag = true; 
        } 
        if(i9Application["countryCode"] == null || i9Application["countryCode"] === ""){
            if(count > 0){
                validationString += ",";
            }
            validationString += " Country code"; 
            count++;
            flag = true;
        }
    }
        if(flag){
            alert(validationString);
        }
       return flag;
       
    }
   
    function setData<T>(target: T, key: keyof T, value: any): T {
        target[key] = value;
        return {...target};

    }

    function closeModal(): void {
        setShowModal(false);
        setShowModalBlock(false);
    }
    /*function ValidateText(event: React.ChangeEvent<HTMLInputElement>,){

        let allInputs = {
            otherNames: "otherNames",
            address: "address",
            aptNumber: "aptNumber",
            city: "city",
            zipCode: "zipCode",
            // state
            // DOB
            citizenStatus: "citizenStatus",
            uscisNumber: "uscisNumber",
            alienAuthorizationDate: "alienAuthorizationDate",
            form_I_94_AdmissionNumber: "form_I_94_AdmissionNumber",
            foreignPassportNumber: "foreignPassportNumber",
            countryCode: "countryCode",
            preparedOrTranslatedId: "preparedOrTranslatedId"

        };

        let defaultValues = {
            otherNames: "",
            address: employee.street,
            aptNumber: employee.aptNumber,
            city: employee.city,
            zipCode: employee.postalCode,
            // state
            // DOB
            citizenStatus: "",
            uscisNumber: "",
            alienAuthorizationDate: Date.now(),
            form_I_94_AdmissionNumber: "",
            foreignPassportNumber: "",
            countryCode: "",
            preparedOrTranslatedId: ""
        };

        for (const key in defaultValues){
            if(i9Application[key] == null){
                setI9Application(setData(i9Application, key, defaultValues[key]));
            }
        }


        //let test123____ = ;

        
        //setI9Application(test123____);
    }*/


    // style={{
    //     position: "absolute",
    //     left: "50%",
    //     top: "50%",
    //     transform: "translate(-50%, -50%)",
    //     width: 100,
    //     marginBottom: 100
    // }}

    return (
        <div className="outer">
            <Header />
            <div className="body">
                <NavBar topics={topics} />
                <div className="output">
                <div className="form">
                    <div style={{position: "relative",
                                        left: "50%", padding: '10px'
                                        }}>
                        <h1>Applicant Dashboard</h1>
                    </div>
                       
                        <form className={classes.form}>
                            <div style={{ position: "relative",
                                            left: "-10%", height: "100%", padding: '40px' }}>
                                <h3 style={{position: "relative",
                                            left: "85%", padding: '20px'}}>Anti Discrimination Policy:</h3>
                                <label style={{fontSize: "15px", width: '365%', border: "2px solid black", padding: "10px", display: "flex",}}>It is illegal to discriminate against any work authorized individual in hiring, firing, recruitment or referral for a fee, or in the employment eligibility verification process based on that individuals citizenship status, immigration status or national origin.
                                </label> <br></br>
                                </div>
                                
                                <div className={classes.control} style={{display: 'flex', padding: '0px'}}>
                                    <div style={{ marginRight: '20px' }}>
                                        <label className={classes.label}>First Name:</label>
                                        <input type="text" className={classes.input} defaultValue={employee.firstName} onChange={event => setI9Application(setData(i9Application, "firstName", event.target.value))}/>
                                    </div>

                                    <div className={classes.control} style={{ display: 'flex' }}>    
                                    <div style={{ marginRight: '20px' }}>
                                        <label className={classes.label}>Last Name:</label>
                                        <input type="text" className={classes.input} defaultValue={employee.lastName} onChange={event => setI9Application(setData(i9Application, "lastName", event.target.value))}/> 
                                    </div>
                                    </div>

                                    <div className={classes.control} style={{ display: 'flex' }}>    
                                    <div style={{ marginRight: '20px' }}>
                                        <label className={classes.label}>Middle Initial:</label>
                                        <input type={"text"} className={classes.input} defaultValue={employee.middleInitial} onChange={event => setI9Application(setData(i9Application, "middleInitial", event.target.value))}/>
                                    </div>
                                    </div>

                                    <div className={classes.control} style={{ display: 'flex' }}>
                                    <div style={{ marginRight: '20px' }}>
                                        <label className={classes.label}>Other Names:</label>
                                        <input type={"text"} className={classes.input} onChange={event => setI9Application(setData(i9Application, "otherNames", event.target.value))} />
                                    </div>
                                    </div>

                                    <div className={classes.control} style={{ display: 'flex' }}>
                                    <div style={{ marginRight: '10px' }}>
                                        <label className={classes.label}>Address:</label>
                                        <input type={"text"} className={classes.input} defaultValue={employee.street} onChange={event => setI9Application(setData(i9Application, "address", event.target.value))} />
                                    </div>
                                    </div>
                                    </div> 


                                    <div className={classes.control} style={{ display: 'flex' }}>
                                    <div style={{ marginRight: '20px' }}>
                                        <label className={classes.label}>Apt Number:</label>
                                        <input type={"text"} className={classes.input} defaultValue={employee.aptNumber} onChange={event => setI9Application(setData(i9Application, "aptNumber", event.target.value))} />
                                    </div>
                                    
                                    <div className={classes.control} style={{ display: 'flex' }}>
                                    <div style={{ marginRight: '20px' }}>
                                        <label className={classes.label}>City or town:</label>
                                        <input type={"text"} className={classes.input} defaultValue={employee.city} onChange={event => setI9Application(setData(i9Application, "city", event.target.value))} />
                                    </div>
                                    </div>

                                    <div className={classes.control} style={{ display: 'flex' }}>
                                    <div style={{ marginRight: '20px' }}>
                                        <label className={classes.label}>Zip Code:</label>
                                        <input type={"text"} className={classes.input} defaultValue={employee.postalCode} onChange={event => setI9Application(setData(i9Application, "zipCode", event.target.value))} />
                                    </div>
                                    </div>

                                    <div className={classes.control} style={{ display: 'flex' }}>
                                    <div style={{ marginRight: '20px' }}>
                                        <label className={classes.label}>State:</label>
                                        <input type={"text"} className={classes.input} defaultValue={province.provinceCode} onChange={event => setI9Application(setData(i9Application, "state", event.target.value))} />
                                    </div>  
                                    </div>

                                    <div className={classes.control} style={{ display: 'flex' }}>
                                    <div style={{ marginRight: '20px' }}>
                                        <label className={classes.label}>Date of Birth (MM/DD/YYYY):</label>
                                        <input type={"text"} className={classes.input} value={new Date(employee.birthDate).getMonth()+"1"+"/"+new Date(employee.birthDate).getDate()+"/"+new Date(employee.birthDate).getFullYear()}/>                            
                                    </div>   
                                    </div>
                                    </div>

                        
                                    <div className={classes.control} style={{ display: 'flex' }}>
                                    <div style={{ marginRight: '20px' }}>
                                        <label className={classes.label}>US SSN:</label>
                                        <input type={"text"} className={classes.input} defaultValue={employee.ssn} onChange={event => setI9Application(setData(i9Application, "ssn", event.target.value))}/>
                                    </div>

                                    <div className={classes.control} style={{ display: 'flex' }}>
                                    <div style={{ marginRight: '20px' }}>
                                        <label className={classes.label}>Email Address:</label>
                                        <input type={"text"} className={classes.input} defaultValue={employee.email} onChange={event => setI9Application(setData(i9Application, "email", event.target.value))} />
                                    </div>
                                    </div>
                                    
                                    <div className={classes.control} style={{ display: 'flex' }}>
                                    <div style={{ marginRight: '20px' }}>
                                        <label className={classes.label}>Phone Number:</label>
                                        <input type={"text"} className={classes.input} defaultValue={employee.phoneNumber} onChange={event => setI9Application(setData(i9Application, "phoneNumber", event.target.value))} />
                                    </div> 
                                    </div> 

                                    <div className={classes.control} style={{ display: 'flex' }}>
                                    <div style={{ marginRight: '20px' }}>
                                        <label className={classes.label}>Prepared/Translated?</label>
                                        <select name={"selectedOption"} className={classes.combo} onChange={event => setI9Application(setData(i9Application, "preparedOrTranslatedId", event.target.value))}>
                                        <option value="0">
                                            select
                                        </option>
                                        <option value="1">
                                            Yes
                                        </option>
                                        <option value="2">
                                            No
                                        </option>
                                        </select>
                                    </div>
                                    </div>

                                    <div className={classes.control} style={{ display: 'flex'}}>
                                    <div style={{ marginRight: '28px' }}>
                                        <label className={classes.label}>US STATUS:</label>
                                        <select name="selectedOption" className={classes.combo} onChange={event => setI9Application(setData(i9Application, "citizenStatus", event.target.value))}>

                                            <option value="0">
                                            select
                                            </option>
                                            <option value="US_CIT">
                                            A citizen of the United States
                                            </option>
                                            <option value="NON_CIT">
                                            A noncitizen national of United States
                                            </option>
                                            <option value="PERM_RES">
                                            A lawful permanent resident
                                            </option>
                                            <option value="ALIEN">
                                            An alien authorized to work 
                                            </option>
                                        </select>
                                        </div>
                                    </div>
                                    
                                    <div style={{ position: "relative",
                                            left: "-297.8%", top: "80px"}}>
                                        {i9Application.citizenStatus == "ALIEN" && (
                                        <div className={classes.control} style={{ display: 'flex', marginBottom: '10px' }}>
                                        <div style={{ marginRight: '20px'}}>
                                        <label className={classes.label}>Form I-94 Admission Number:</label>
                                        <input type={"text"} className={classes.input} onChange={event => setI9Application(setData(i9Application, "form_I_94_AdmissionNumber", event.target.value))} />
                                        </div>
                                        
                                        <div className={classes.control} style={{ display: 'flex' }}>
                                        <div style={{ marginRight: '20px' }}>
                                            <label className={classes.label}>USCIS Number:</label>
                                            <input type={"text"} className={classes.input} onChange={event => setI9Application(setData(i9Application, "uscisNumber", event.target.value)) } />
                                        </div>
                                        </div>

                                        <div className={classes.control} style={{ display: 'flex' }}>
                                        <div style={{ marginRight: '20px' }}>
                                            <label className={classes.label}>Alien Authorization Date:</label>
                                            <input type={"text"} className={classes.input} onChange={event => setI9Application(setData(i9Application, "alienAuthorizationDate", event.target.value))} /> {/*may need to be the value converted to a date or string*/}
                                        </div>
                                        </div>

                                        <div className={classes.control} style={{ display: 'flex' }}>
                                        <div style={{ marginRight: '20px' }}>
                                            <label className={classes.label}>Foreign Passport Number:</label>
                                            <input type={"text"} className={classes.input} onChange={event => setI9Application(setData(i9Application, "foreignPassportNumber", event.target.value))} />
                                        </div>
                                        </div>

                                        <div className={classes.control} style={{ display: 'flex' }}>
                                        <div style={{ marginRight: '20px' }}>
                                            <label className={classes.label}>Country Code:</label>
                                            <input type={"text"} className={classes.input} onChange={event => setI9Application(setData(i9Application, "countryCode", event.target.value))} />
                                        </div>
                                        </div>
                                </div>)} 
                                </div>

                                <div className={classes.controls}>
                                    <button style={{
                                            position: "absolute",
                                            left: "50%",
                                            top: "115%",
                                            transform: "translate(-50%, -50%)",
                                            width: 100,
                                            marginBottom: 100
                                        }} type="submit" className={`${classes.button} ${isDisabled() && classes.disabled}`} onClick={onSubmit}
                                        disabled={isDisabled()}>
                                        Submit
                                    </button>
                                </div>
                                    <ReactModal
                                    isOpen={showModal}
                                    onRequestClose={closeModal}
                                    className={classes.modal}
                                    >
                                    <div>
                                    <h2>Section 1 Submitted!</h2>
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
                                <ReactModal
                                    isOpen={showModalBlock}
                                    onRequestClose={closeModal}
                                    className={classes.modal}
                                    >
                                    <div>
                                    <h2>Error! This user is block-listed.</h2>
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
                                            marginBottom: 100, 
                                        }}
                                        onClick={closeModal}>
                                        Close
                                        </button>
                                    </div>
                                </ReactModal>
                            </div>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
    );
}


