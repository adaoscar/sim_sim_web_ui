export class SimEscolaridadModel {
    public SimEscolaridadId: number = 0;
    public SimEscolaridadCodigo: number;
    public SimEscolaridadNombre: string;
    public SimEscolaridadEstado: Boolean = true;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimEscolaridadId = json.SimEscolaridadId;
            this.SimEscolaridadCodigo = json.SimEscolaridadCodigo;
            this.SimEscolaridadNombre = json.SimEscolaridadNombre;
            this.SimEscolaridadEstado = json.SimEscolaridadEstado;
        }
    }

    static clone(row: SimEscolaridadModel): SimEscolaridadModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimEscolaridadModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimEscolaridadId: dato.SimEscolaridadId,
              SimEscolaridadCodigo: dato.SimEscolaridadCodigo,
              SimEscolaridadNombre: dato.SimEscolaridadNombre,
              SimEscolaridadEstado: dato.SimEscolaridadEstado

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimEscolaridadId}`;
        result += `${separator}${this.SimEscolaridadCodigo}`;
        result += `${separator}${this.SimEscolaridadNombre}`;
        result += `${separator}${this.SimEscolaridadEstado}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimEscolaridadModel {
        const result = value.split(separator);

        this.SimEscolaridadId = parseInt(result[0]);
        this.SimEscolaridadCodigo = parseInt(result[1]);
        this.SimEscolaridadNombre = result[2];
        this.SimEscolaridadEstado = new Boolean(result[3]);

        return this;
    }

}
