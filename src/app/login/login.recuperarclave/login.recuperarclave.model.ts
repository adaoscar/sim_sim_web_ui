export class RecuperarClaveModel {
    public token: string;
    public cedula: string;
    public newPassword: string;
    public validPassword: string;

    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.token = json.token;
            this.cedula = json.cedula;
            this.newPassword = json.newPassword;
            this.validPassword = json.validPassword;
        }
    }

    static clone(row: RecuperarClaveModel): RecuperarClaveModel {
        const rowCloned = Object.assign({}, row);
        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }
}