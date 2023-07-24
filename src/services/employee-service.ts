import { BaseService } from "./base-service";
import { Employee } from "../models/employee";
import { Credentials } from "../props/credentials";
import { ApiResult } from "../models/api-result";

export class EmployeeService extends BaseService {

    static verifyLogin(login: string, password: string): Promise<Employee> {
        //return this.authenticate("login",new Credentials(login, password));
        return this.post<Employee>("employees/login", new Credentials(login, password));
    }

    static getEmployees(): Promise<ApiResult<Employee>> {
        return this.getPaginated<Employee>("employees", 0);
    }

    static getAllEmployees(): Promise<Employee[]> {
        return this.getRaw<Employee>("employees/all");
    }

    static getEmployee(id: number): Promise<Employee> {
        return this.getSingle<Employee>("employee/"+id);
    }

}
