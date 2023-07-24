import { ApiResult } from "../models/api-result";
import { Employee } from "../models/employee";
import { Credentials } from "../props/credentials";
import { Helpers } from "../shared/helpers";

export class BaseService {
    private static root = "http://localhost:8080";

    protected static getSingle<T>(url: string): Promise<T> {
        url = `${this.root}/${url}`;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            }
        };
        return fetch(url, options).then(response => {
            return response.json();
        }).then(data => {
            return <T>data;
        });
    }

    protected static getCoerced<T>(url: string, model: T): Promise<T> {
        url = `${this.root}/${url}`;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            }
        };
        return fetch(url, options).then(response => {
            return response.json();
        }).then(data => {
            return Helpers.coerce<T>(data, model);
        });
    }

     protected static getRaw<T>(url: string): Promise<T[]> {
        url = `${this.root}/${url}`;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            }
        };
        return fetch(url, options).then(response => {
            return response.json();
        }).then(data => {
            return data.map((datum: T) =>
                <T>datum
            );
        });
    }

    protected static getPaginated<T>(url: string, page: number, filter?: string): Promise<ApiResult<T>> {
        url = `${this.root}/${url}?page=${page}`;
        url = filter ? `${url}&${filter}` : url;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            }
        };
        return fetch(url, options).then(response => {
            return response.json();
        }).then((result: ApiResult<T>) => {
            let content: T[] = result.content.map((datum: T) => <T>datum);
            return new ApiResult<T>(content, result.totalElements, result.totalPages, result.size, page, true);
        });
    }

    protected static post<T>(url: string, body: unknown): Promise<T> {
        url = `${this.root}/${url}`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            },
            body: JSON.stringify(body)
        };
        return fetch(url, options).then(response => {
            return response.json();
        }).then(data => {
            return <T>data;
        });
    }

    protected static patch<T>(url: string, body: unknown): Promise<T> {
        url = `${this.root}/${url}`;
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            },
            body: JSON.stringify(body)
        };
        return fetch(url, options).then(response => {
            return response.json();
        }).then((data: T) => {
            return <T>data;
        });
    }

    protected static authenticate(url: string, credentials: Credentials): Promise<Employee> {
        url = `${this.root}/${url}`;
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
        };
        return fetch(url, options).then(response => {
            let token = response.headers.get("Authorization");
            this.setToken(token ? token : "");
            return response.json();
        }).then(data => {
            return <Employee>data;
        });
    }

    private static getToken(): string {
        let token = localStorage.getItem("Token");
        return token ? `Bearer ${token}` : "";
    }

    private static setToken(token: string): void {
        localStorage.setItem("Token", token);
    }

}