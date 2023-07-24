import {Province} from "../models/province";
import {BaseService} from "./base-service";
import {Region} from "../models/region";

export class ProvinceService extends BaseService {

    static getProvinces(): Promise<Province[]> {
        return this.getRaw<Province>( "provinces");
    }

    static getRegions(): Promise<Region[]> {
        return this.getRaw<Region>( "regions");
    }
}
