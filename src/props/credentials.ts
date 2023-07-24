export class Credentials {
    loginCode: string;
    password: string;

    constructor(loginCode: string, password: string) {
        this.loginCode = loginCode;
        this.password = password;
    }
}
