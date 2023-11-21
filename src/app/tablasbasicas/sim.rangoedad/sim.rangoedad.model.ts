export class SimRangoEdadModel {
    public SimRangoEdadId: number = 0;
    public SimRangoEdadCodigo: number;
    public SimRangoEdadNombre: string;
    public SimRangoEdadEstado: Boolean = true;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimRangoEdadId = json.SimRangoEdadId;
            this.SimRangoEdadCodigo = json.SimRangoEdadCodigo;
            this.SimRangoEdadNombre = json.SimRangoEdadNombre;
            this.SimRangoEdadEstado = json.SimRangoEdadEstado;
        }
    }

    static clone(row: SimRangoEdadModel): SimRangoEdadModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimRangoEdadModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimRangoEdadId: dato.SimRangoEdadId,
              SimRangoEdadCodigo: dato.SimRangoEdadCodigo,
              SimRangoEdadNombre: dato.SimRangoEdadNombre,
              SimRangoEdadEstado: dato.SimRangoEdadEstado

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimRangoEdadId}`;
        result += `${separator}${this.SimRangoEdadCodigo}`;
        result += `${separator}${this.SimRangoEdadNombre}`;
        result += `${separator}${this.SimRangoEdadEstado}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimRangoEdadModel {
        const result = value.split(separator);

        this.SimRangoEdadId = parseInt(result[0]);
        this.SimRangoEdadCodigo = parseInt(result[1]);
        this.SimRangoEdadNombre = result[2];
        this.SimRangoEdadEstado = new Boolean(result[3]);

        return this;
    }

}
