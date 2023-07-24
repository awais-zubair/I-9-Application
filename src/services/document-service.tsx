import { BaseService } from "./base-service";
import { Doc } from "../models/document";

export class DocumentService extends BaseService {
    static postDocument(document: Doc): Promise<Doc>{
        return this.post("postDocument", document);
    } 
}