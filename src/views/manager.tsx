import { useContext, useEffect, useState, FormEvent } from "react";
import AppContext from "../contexts/app-context";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "../components/header";
import NavBar from "../components/nav-bar";
import { Topic } from "../props/topic";
import classes from "../styles/manager.module.css";
import { I9Application } from "../models/i9-application";
import { I9ApplicationService } from "../services/i9application-service";
import Notification from "../components/notification";
import ManagerDash from "../components/manager-dash";
import { Status } from "../models/status";
import ManagerStats from "./managerStats";

export default function Manager(): JSX.Element {
    let context = useContext(AppContext);
    let history = useHistory();
    const [i9Applications, setI9Applications] = useState(new Array<I9Application>());
    const [status, setStatus] = useState(new Status());
    const [filteredApplications, setFilteredApplications] = useState(new Array<I9Application>());
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState('')  ;
    let [firstNameFilter,setFirstNameFilter] = useState('');
    let [lastNameFilter,setLastNameFilter] = useState('');
    let [cityFilter,setCityNameFilter] = useState('');
    let [zipCodeFilter,setZipCodeFilter] = useState('');
    let [statusFilter,setStatusFilter] = useState('');


    const topics = [
        new Topic(0, "Log Out", "logout"),
        new Topic(1, "Statistics", "managerStats")
    ];

    useEffect(() => {
        if (!context.loggedIn) {
            history.push("./login");
        }
        loadContent(currentPage);
    }, []);

    function onClickPrior(): void {
        let page = currentPage - 1;
        loadContent(page);
        setCurrentPage(page);
    }

    function onClickNext(): void {
        let page = currentPage + 1;
        loadContent(page);
        setCurrentPage(page);
    }

    function loadContent(page: number): void {
        I9ApplicationService.getAllI9ApplicationsForManager(page).then(result => {
            console.log("in load content");
            setI9Applications(result.content);
            setFilteredApplications(result.content);
            setPageCount(result.totalPages);
        });
    }

    function onSubmit(event: FormEvent): void {
        event.preventDefault();

    }

    const handleFirstNameFilterChange = (event: { target: { value: any; }; }) => {
        let searchTerm1 = event.target.value;
        firstNameFilter = searchTerm1;
        setFirstNameFilter(firstNameFilter);
        filterApplications(firstNameFilter);

    } ;
    const handleLastNameFilterChange = (event: { target: { value: any; }; }) => {
        let searchTerm2 = event.target.value;
        lastNameFilter = searchTerm2;
        setLastNameFilter(lastNameFilter);
        filterApplications(lastNameFilter);

    } ;
    const handleCityNameFilterChange = (event: { target: { value: any; }; }) => {
        const searchTerm3 = event.target.value;
        cityFilter = searchTerm3;
        setCityNameFilter(cityFilter);
        filterApplications(cityFilter);

    } ;
    const handleZipCodeNameFilterChange = (event: { target: { value: any; }; }) => {
        const searchTerm4 = event.target.value;
        zipCodeFilter = searchTerm4;
        setZipCodeFilter(zipCodeFilter);
        filterApplications(zipCodeFilter);

    } ;
    const handleStatusFilterChange = (event: { target: { value: any; }; }) => {
        const searchTerm5 = event.target.value;
        statusFilter = searchTerm5;
        setStatusFilter(statusFilter);
        filterApplications(statusFilter);

    } ;

    const clearFilter = () => {
        console.log("In filter");
        setFirstNameFilter('');
        setLastNameFilter('');
        setZipCodeFilter('');
        setCityNameFilter('');
        setFilteredApplications(i9Applications);
    };

    // function isDisabled(): boolean {

    //     let flag = !firstNamefilter || !lastNamefilter || !cityfilter  || !zipCodefilter;
    //     console.log("flag is:" + flag);
    //     return false;
    // }

    const filterApplications = (searchTerm: string) => {
      
        //setFilteredApplications(i9Applications);
        
     const filtered = i9Applications.filter(
        
        (I9Application) => {
        const firstNameMatch = I9Application.firstName.toLowerCase().includes(firstNameFilter.toLowerCase()) ;
        const lastNameMatch = I9Application.lastName.toLowerCase().includes(lastNameFilter.toLowerCase())  ;
        const cityMatch = I9Application.city.toLowerCase().includes(cityFilter.toLowerCase()) ;
        const zipCodeMatch = I9Application.zipCode.toLowerCase().includes(zipCodeFilter.toLowerCase()) ;
        const statusMatch = I9Application.status.description.toLowerCase().includes(statusFilter.toLowerCase()) ;
        return lastNameMatch && firstNameMatch && cityMatch && zipCodeMatch && statusMatch ;
        });
       console.log(filtered.length);
        setFilteredApplications(filtered);
    };

    return (
        <div className={classes.outer}>
                            <Header />
        <div className={classes.controls}>
                <NavBar topics={topics} />
                <div className="output">
                <div className="form">
                    <div >
                                    <label className={classes.label}>First Name</label>
                                    <input type="text" className={classes.input} placeholder = "Filter by First Name" defaultValue={firstNameFilter}  onChange={handleFirstNameFilterChange }  />
                                </div>
                                  
                                <div>
                                    <label className={classes.label}>Last Name</label>
                                    <input type="text" className={classes.input} placeholder = "Filter by Last Name" defaultValue={lastNameFilter}  onChange={handleLastNameFilterChange }  />
                                </div> 
                                <div>
                                    <label className={classes.label}>City</label><br></br>
                                    <input type="text" className={classes.input} placeholder = "Filter by City" defaultValue={cityFilter}  onChange={handleCityNameFilterChange } />
                                </div>
                                <div>
                                    <label className={classes.label}>Zip Code</label><br></br>
                                    <input type="text" className={classes.input} placeholder = "Filter by Zip Code" defaultValue={zipCodeFilter}  onChange={handleZipCodeNameFilterChange }  />
                                </div>   
                                <div>
                                    <label className={classes.label}>Status</label><br></br>
                                    <input type="text" className={classes.input} placeholder = "Filter by status" defaultValue={statusFilter}  onChange={handleStatusFilterChange }  />
                                </div>
                                {/* <div>
                                <button type="submit" className={`${classes.button} ${isDisabled() && classes.disabled}`} onClick={clearFilter}
                                        disabled={isDisabled()}>
                                        Clear Filters
                                    </button></div> */}
                       
             </div>
               <div>
                    <table>
                        <thead className={` ${classes.label}`} >
                            <tr>
                                <th className={`${classes.column} ${classes.i9ApplicationId}`}>ID</th>
                                <th className={` ${classes.column}${classes.firstName}`}>First Name</th>
                                <th> <div className={`${classes.column} ${classes.lastName}`}>Last Name</div></th>
                                <th> <div className={` ${classes.column} ${classes.address}`}>Address</div></th>
                                <th> <div className={`${classes.column} ${classes.city}`}>City</div></th>
                                <th> <div className={`${classes.column} ${classes.zipCode}`}>ZipCode</div></th>
                                <th> <div className={`${classes.column} ${classes.region}`}>Email</div></th>
                                <th> <div className={`${classes.column} ${classes.phone}`}>Phone Number</div></th>
                                <th> <div className={`${classes.column} ${classes.phone}`}>Status</div></th>

                            </tr>
                        </thead>
                        <tbody>
                            {filteredApplications?.map(i9Application =>
                                <tr className={`${classes.row}`} key={i9Application.i9ApplicationId}>
                                    <td className={`${classes.column} ${classes.i9ApplicationId}`}>{i9Application.i9ApplicationId}</td>
                                    <td className={`${classes.column} ${classes.firstName}`}>{i9Application.firstName}</td>
                                    <td className={`${classes.column} ${classes.lastName}`}>{i9Application.lastName}</td>
                                    <td className={`${classes.column} ${classes.address}`}>{i9Application.address}</td>
                                    <td className={`${classes.column} ${classes.city}`}>{i9Application.city}</td>
                                    <td className={`${classes.column} ${classes.zipCode}`}>{i9Application.zipCode}</td>
                                    <td className={`${classes.column} ${classes.email}`}>{i9Application.email}</td>
                                    <td className={`${classes.column} ${classes.phone}`}>{i9Application.phoneNumber}</td>
                                    <td className={`${classes.column} ${classes.phone}`}>{i9Application.status.description}</td>
                                </tr>)}
                        </tbody>
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
                    </table>
                            </div>
                </div>
            </div>
        </div>
    );
}
