export class LOGIN_CambioClaveModel {
    public password: string;
    public newPassword: string;
    public validPassword: string;

    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.password = json.password;
            this.newPassword = json.newPassword;
            this.validPassword = json.validPassword;
        }
    }

    static clone(row: LOGIN_CambioClaveModel): any {
        let rowCloned = {
            Password: row.password,
            NewPassword: row.newPassword
        };

        return rowCloned;
    }
}
