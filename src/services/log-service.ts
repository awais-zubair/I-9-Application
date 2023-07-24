import {BaseService} from "./base-service";
import {ProcessDays} from "../props/process-days";

export class LogService extends BaseService {

    static getPeriodCounts(): Promise<ProcessDays[]> {
        return this.getRaw<ProcessDays>("logs/days");
    }

}
