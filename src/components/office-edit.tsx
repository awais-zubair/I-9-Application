import { FormEvent, useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { Office } from "../models/office";
import { OfficeService } from "../services/office-service";
import { LocationState } from "../props/location-path";
import classes from "../styles/office-edit.module.css";
import { Province } from "../models/province";
import { ProvinceService } from "../services/province-service";
import AppContext from "../contexts/app-context";
import { RoleType } from "../enums/role-type";

export default function OfficeEdit(): JSX.Element {
    const context = useContext(AppContext);
    const history = useHistory();
    const location = useLocation<LocationState>();
    const [provinces, setProvinces] = useState(new Array<Province>());
    const [office, setOffice] = useState(new Office());
    let original: Office;

    useEffect(() => {
        ProvinceService.getProvinces().then(provinces => setProvinces(provinces));
        if (location.state?.id) {
            OfficeService.getOffice(location.state.id).then(office => {
                setOffice(office);
                original = office;
            });
        }
    }, [location]);


    function onSubmit(event: FormEvent): void {
        event.preventDefault();
        OfficeService.patchOffice(office);
        history.push(`/${RoleType[context.role].toLowerCase()}/offices`);
    }

    function isDisabled(): boolean {
        return !office.name || !office.street || !office.city || !office.province?.provinceCode || !office.postalCode || !office.phoneNumber;
    }

    function setData<T>(target: T, key: keyof T, value: any): T {
        target[key] = value;
        return {...target};
    }

    function setProvinceCode(code: string) : void {
        office.province.provinceCode = code;
        //setOffice({...office});
    }

    return (
        <div className={classes.outer}>
            <form className={classes.form}>
                <div className={classes.control}>
                    <label className={classes.label}>First Name:</label>
                    <input type={"text"} className={classes.input} value={office.name} onChange={event => setOffice(setData(office, "name", event.target.value))} />
                </div>
                <div className={classes.control}>
                    <label className={classes.label}>Street:</label>
                    <input type={"text"} className={classes.input} value={office.street} onChange={event => setOffice(setData(office, "street", event.target.value))} />
                </div>
                <div className={classes.control}>
                    <label className={classes.label}>City:</label>
                    <input type={"text"} className={classes.input} value={office.city} onChange={event => setOffice(setData(office, "city", event.target.value))} />
                </div>
                <div className={classes.control}>
                    <label className={classes.label}>Province:</label>
                    <div className={classes.regions}>
                        <select className={classes.combo} onChange={event => setProvinceCode(event.target.value)} value={office.province?.provinceCode}>
                            {provinces.map(province => <option key={province.provinceCode} value={province.provinceCode}>{province.description}</option>)}
                        </select>
                    </div>
                </div>
                <div className={classes.control}>
                    <label className={classes.label}>Postal Code:</label>
                    <input type={"text"} className={classes.input} value={office.postalCode} onChange={event => setOffice(setData(office, "postalCode", event.target.value))} />
                </div>
                <div className={classes.control}>
                    <label className={classes.label}>Phone Number:</label>
                    <input type={"text"} className={classes.input} value={office.phoneNumber} onChange={event => setOffice(setData(office, "phoneNumber", event.target.value))} />
                </div>
                <div className={classes.control}>
                    <label className={classes.label}>Opening Date:</label>
                    <input type={"date"} className={classes.input} value={office.openDate} onChange={event => setOffice(setData(office,  "openDate", event.target.value))} />
                </div>
                <div className={classes.controls}>
                    <button type="submit" className={`${classes.button} ${isDisabled() && classes.disabled}`} onClick={onSubmit}
                        disabled={isDisabled()}>
                        Save
                    </button>
                    <button type="button" className={classes.button} onClick={() => setOffice(original)}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}