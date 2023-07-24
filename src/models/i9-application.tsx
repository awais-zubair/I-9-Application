import {Employee} from "./employee";
import {Status} from "./status";

export class I9Application {
    i9ApplicationId: number;
	employee: Employee;
	reviewerId: number;
	status: Status;
	dateCreated: Date;
	dateSubmitted: Date;
	otherNames: string;
	address: string;
	aptNumber: string;
	city: string;
	state: string;
	zipCode: string;
	citizenStatus: string;
	uscisNumber: string;
	alienAuthorizationDate: Date;
	form_I_94_AdmissionNumber: string;
	foreignPassportNumber: string;
	countryCode: string;
	preparedOrTranslatedId: string;
	empLastFirstMiddleName: string;
	empFirstDayOfEmployment: Date;
	reviewerSignatureDate: Date;
	titleOfEmployer: string;
	businessName: string;
	provinceCode: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	middleInitial: string;
	ssn: string;
	email: string;
}