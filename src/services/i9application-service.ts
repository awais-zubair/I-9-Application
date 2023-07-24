import { BaseService } from "./base-service";
import { I9Application } from "../models/i9-application";
import { ApiResult } from "../models/api-result";

export class I9ApplicationService extends BaseService {
    static saveSectionOneI9Application(i9Application: I9Application): Promise<I9Application> {
        return this.post<I9Application>(`saveSectionOneI9Application`, i9Application);
    }
    static getAllI9Applications(page: number, reviewerId: number): Promise<ApiResult<I9Application>> {
        let filter = reviewerId ? `reviewerId=${reviewerId}&status.statusId=2` : "";
        return this.getPaginated<I9Application>(`getAllI9Applications`,0,filter); // trying with page 0
    }

    static getAllI9ApplicationsForManager(page: number): Promise<ApiResult<I9Application>> {
       return this.getPaginated<I9Application>(`getAllI9Applications`,0); // trying with page 0
    }

    static getI9ByApplicationById(i9ApplicationId: number): Promise<I9Application> {
        console.log("in I9!");
        console.log(`getI9ApplicationById/${i9ApplicationId}`);
        return this.getSingle<I9Application>(`getI9ApplicationById/${i9ApplicationId}`);
    }

    static updateI9ApplicationPatch(i9ApplicationId: number, i9Application : I9Application): Promise<I9Application> {
        console.log("Sending the request");
        console.log(i9Application);
        return this.patch<I9Application>(`I9Application/${i9ApplicationId}`,i9Application);
    }

    static getI9StatusTotalsByType(statusId: number): Promise<number> {
        return this.getSingle<number>(`getI9StatusTotalsByType/${statusId}`);
    }
}
