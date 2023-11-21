export class SimUsuarioModel {
    public SimUsuarioId: number = 0;
    public SimTipoDocumentoId: number;
    public SimUsuarioDocumento: string;
    public SimUsuarioNombres: string;
    public SimUsuarioApellidos: string;
    public SimUsuarioTelefono: string;
    public SimUsuarioEmail: string;
    public SimUsuarioEstado: Boolean;
    public SimUsuarioRoles: string[];
    public SimTipoDocumento: any = {};
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    static cloneAdd(row: SimUsuarioModel): any {
        let rowCloned = {
            IdTipoDocumento: row.SimTipoDocumentoId,
            Documento: row.SimUsuarioDocumento,
            Nombres: row.SimUsuarioNombres,
            Apellidos: row.SimUsuarioApellidos,
            Telefono: row.SimUsuarioTelefono,
            Email: row.SimUsuarioEmail,
            Roles: [],
            Estado: row.SimUsuarioEstado
        };

        return rowCloned;
    }

    static cloneUpdate(row: any, tipo: number): any {
        let rowCloned = {
            Nombres: tipo === 1 ? row.Nombres : row.SimUsuarioNombres,
            Apellidos: tipo === 1 ? row.Apellidos : row.SimUsuarioApellidos,
            Telefono: tipo === 1 ? row.PhoneNumber : row.SimUsuarioTelefono,
            Email: tipo === 1 ? row.Email : row.SimUsuarioEmail,
            Roles: tipo === 1 ? row.Roles : row.SimUsuarioRoles,
            Estado: tipo === 1 ? row.Estado : row.SimUsuarioEstado
        };

        return rowCloned;
    }
}

export class SimAplicacionModel {
    public SimAplicacionCodigo: number;
    public SimAplicacionEstado: boolean;
    public SimAplicacionId: number;
    public SimAplicacionNombre: string;
    public roles: SimRolModel[];
}
export class SimRolModel {
    public ConcurrencyStamp: string;
    public Id: string;
    public Name: string;
    public NormalizedName: string;
    public SimAplicacionId: number;
    public check: boolean;
}