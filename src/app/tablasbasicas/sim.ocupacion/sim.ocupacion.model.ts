export class SimOcupacionModel {
    public SimOcupacionId: number = 0;
    public SimOcupacionCodigo: number;
    public SimOcupacionNombre: string;
    public SimOcupacionEstado: Boolean = true;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimOcupacionId = json.SimOcupacionId;
            this.SimOcupacionCodigo = json.SimOcupacionCodigo;
            this.SimOcupacionNombre = json.SimOcupacionNombre;
            this.SimOcupacionEstado = json.SimOcupacionEstado;
        }
    }

    static clone(row: SimOcupacionModel): SimOcupacionModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimOcupacionModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimOcupacionId: dato.SimOcupacionId,
              SimOcupacionCodigo: dato.SimOcupacionCodigo,
              SimOcupacionNombre: dato.SimOcupacionNombre,
              SimOcupacionEstado: dato.SimOcupacionEstado

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimOcupacionId}`;
        result += `${separator}${this.SimOcupacionCodigo}`;
        result += `${separator}${this.SimOcupacionNombre}`;
        result += `${separator}${this.SimOcupacionEstado}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimOcupacionModel {
        const result = value.split(separator);

        this.SimOcupacionId = parseInt(result[0]);
        this.SimOcupacionCodigo = parseInt(result[1]);
        this.SimOcupacionNombre = result[2];
        this.SimOcupacionEstado = new Boolean(result[3]);

        return this;
    }

}
