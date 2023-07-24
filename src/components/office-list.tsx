import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Office } from "../models/office";
import { OfficeService } from "../services/office-service";
import classes from "../styles/office-list.module.css";
import { Province } from "../models/province";
import { ProvinceService } from "../services/province-service";
import { Helpers } from "../shared/helpers";
import { LocationPath } from "../props/location-path";

function OfficeList(): JSX.Element {
    const [offices, setOffices] = useState(new Array<Office>());
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [province, setProvince] = useState("");
    const [provinces, setProvinces] = useState(new Array<Province>());

    useEffect(() => {
        loadContent(currentPage, province);
        loadProvinces();
    }, [currentPage, province]);

    function onClickPrior(): void {
        let page = currentPage - 1;
        loadContent(page, province);
        setCurrentPage(page);
    }

    function onClickNext(): void {
        let page = currentPage + 1;
        loadContent(page, province);
        setCurrentPage(page);
    }

    function loadContent(page: number, code: string): void {
        OfficeService.getOffices(page, code).then(result => {
            setOffices(result.content);
            setPageCount(result.totalPages);
        });
    }

    function loadProvinces(): void {
        ProvinceService.getProvinces().then(provinces => {
            setProvinces(provinces.sort((first, second) => Helpers.greaterThan(first.description, second.description)));
        });
    }

    function filterProvinces(code: string): void {
        setProvince(code);
        setCurrentPage(0);
        loadContent(0, code);                                      // Use to explain dispatch
    }

    return (
        <div className={classes.outer}>
            <div className={classes.controls}>
                <div className={classes.filter}>
                    <div className={classes.label}>Filter:</div>
                    <select className={classes.combo} onChange={e => filterProvinces(e.target.value)} value={province}>
                        <option value={""}>All Provinces</option>
                        {provinces.map(province => <option key={province.provinceCode} value={province.provinceCode}>{province.description}</option>)}
                    </select>
                </div>
            </div>
            <div className={classes.heading}>
                <div className={`${classes.column} ${classes.name}`}>Name</div>
                <div className={`${classes.column} ${classes.street}`}>Address</div>
                <div className={`${classes.column} ${classes.city}`}>City</div>
                <div className={`${classes.column} ${classes.province}`}>Province</div>
                <div className={`${classes.column} ${classes.postal}`}>Postal Code</div>
                <div className={`${classes.column} ${classes.region}`}>Region</div>
                <div className={`${classes.column} ${classes.phone}`}>Phone Number</div>
            </div>
            {offices?.map(office =>
                <div className={classes.row} key={office.officeId}>
                    <div className={`${classes.column} ${classes.name}`}><Link to={new LocationPath("office", office.officeId)}>{office.name}</Link></div>
                    <div className={`${classes.column} ${classes.street}`}>{office.street}</div>
                    <div className={`${classes.column} ${classes.city}`}>{office.city}</div>
                    <div className={`${classes.column} ${classes.province}`}>{office.province.description}</div>
                    <div className={`${classes.column} ${classes.postal}`}>{office.postalCode}</div>
                    <div className={`${classes.column} ${classes.region}`}>{office.province.region.description}</div>
                    <div className={`${classes.column} ${classes.phone}`}>{office.phoneNumber}</div>
                </div>)}
            <div className={classes.controls}>
                <div className={classes.footer}>
                    <div className={classes.control}>
                        <button type="button" onClick={onClickPrior} disabled={currentPage === 0}>Prior Page</button>
                    </div>
                    <div className={classes.counter}>
                        Page {currentPage + 1} of {pageCount}
                    </div>
                    <div className={classes.control}>
                        <button type="button" onClick={onClickNext} disabled={currentPage === pageCount - 1}>Next Page</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OfficeList;
