import {BaseService} from "./base-service";
import {Status} from "../models/status";

export class StatusService extends BaseService {

    static getStati(): Promise<Status[]> {
        return this.getRaw<Status>("stati");
    }

}
