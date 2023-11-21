export class SimRolModel {
    public Id: string;
    public Name: string;
    public SimAplicacionId: number;
    public Funcionalidades: any[] = [];
    public SimAplicacion: any = {};
    public crud: boolean;

    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;
    public _relaciones: any;

    static clone(row: SimRolModel): any {
        let rowCloned = {
            Nombre: row.Name,
            AplicacionId: row.SimAplicacionId,
            Funcionalidades: row.Funcionalidades
        };
        return rowCloned;
    }
}

export class SimModuloModel {
    public SimModulosId: number;
    public SimModulosNombre: string;
    public SimModulosDescripcion: string;
    public SimModulosEstado: boolean;
    public SimModulosCodigo: number;
    public SimAplicacionId: number;
    public SimAplicacion: any;
    public Funcionalidades: SimFuncionalidadModel[];
    public funcActivasc: number;
    public funcActivasr: number;
    public funcActivasu: number;
    public funcActivasd: number;
    public funcTotal: number;
    public checkc: boolean;
    public checkr: boolean;
    public checku: boolean;
    public checkd: boolean;
}

export class SimFuncionalidadModel {
    public ClaimCode: number;
    public ClaimDescription: string;
    public ClaimPestanas: string;
    public ClaimName: string;
    public IdClaim: number;
    public ModuloId: number;
    public checkc: boolean;
    public checkr: boolean;
    public checku: boolean;
    public checkd: boolean;
    public checkadc: boolean;
    public permisosPestanas: string;
}