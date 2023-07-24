import {Province} from "../models/province";
import {BaseService} from "./base-service";
import {Region} from "../models/region";

export class DocumentTypeService extends BaseService {

    static getDocumentType(): Promise<DocumentType[]> {
        return this.getRaw<DocumentType>( "getDocumentTypeList");
    }

   
}
