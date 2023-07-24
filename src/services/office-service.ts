import {BaseService} from "./base-service";
import {Office} from "../models/office";
import {ApiResult} from "../models/api-result";

export class OfficeService extends BaseService {

    static getOffices(page: number, code: string): Promise<ApiResult<Office>> {
        let filter = code ? `province.provinceCode=${code}` : "";
        return this.getPaginated<Office>("offices", page, filter);
    }

    static getOffice(id: number): Promise<Office> {
        return this.getCoerced<Office>(`offices/${id}`, new Office());
        //return this.getSingle<Office>(`offices/${id}`);
    }

    static patchOffice(office: Office): Promise<Office> {
        return this.patch<Office>(`offices/${office.officeId}`, office);
    }

}