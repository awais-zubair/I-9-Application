import {Province} from "./province";
import {Office} from "./office";

export class Employee {
    employeeId: number;
    employeeRole: EmployeeRole;
    office: Office;
    lastName: string;
    firstName: string;
    middleInitial: string;
    street: string;
    aptNumber: string;
    city: string;
    provinceCode: Province;
    postalCode: string;
    birthDate: Date;
    ssn: string;
    email: string;
    phoneNumber: string;
    hireDate: Date;
    officeId: number;
}

export class EmployeeRole {
    employeeRoleId: number;
    description: string;
}
