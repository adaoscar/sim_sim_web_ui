export class SimTipoSesionModel {
    public SimTipoSesionId: number = 0;
    public SimTipoSesionCodigo: number;
    public SimTipoSesionNombre: string;
    public SimTipoSesionEstado: Boolean = true;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimTipoSesionId = json.SimTipoSesionId;
            this.SimTipoSesionCodigo = json.SimTipoSesionCodigo;
            this.SimTipoSesionNombre = json.SimTipoSesionNombre;
            this.SimTipoSesionEstado = json.SimTipoSesionEstado;
        }
    }

    static clone(row: SimTipoSesionModel): SimTipoSesionModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimTipoSesionModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimTipoSesionId: dato.SimTipoSesionId,
              SimTipoSesionCodigo: dato.SimTipoSesionCodigo,
              SimTipoSesionNombre: dato.SimTipoSesionNombre,
              SimTipoSesionEstado: dato.SimTipoSesionEstado

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimTipoSesionId}`;
        result += `${separator}${this.SimTipoSesionCodigo}`;
        result += `${separator}${this.SimTipoSesionNombre}`;
        result += `${separator}${this.SimTipoSesionEstado}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimTipoSesionModel {
        const result = value.split(separator);

        this.SimTipoSesionId = parseInt(result[0]);
        this.SimTipoSesionCodigo = parseInt(result[1]);
        this.SimTipoSesionNombre = result[2];
        this.SimTipoSesionEstado = new Boolean(result[3]);

        return this;
    }

}
