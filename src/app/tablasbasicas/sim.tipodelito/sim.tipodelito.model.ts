export class SimTipoDelitoModel {
    public SimTipoDelitoId: number = 0;
    public SimTipoDelitoCodigo: number;
    public SimTipoDelitoNombre: string;
    public SimTipoDelitoEstado: Boolean = true;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimTipoDelitoId = json.SimTipoDelitoId;
            this.SimTipoDelitoCodigo = json.SimTipoDelitoCodigo;
            this.SimTipoDelitoNombre = json.SimTipoDelitoNombre;
            this.SimTipoDelitoEstado = json.SimTipoDelitoEstado;
        }
    }

    static clone(row: SimTipoDelitoModel): SimTipoDelitoModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimTipoDelitoModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimTipoDelitoId: dato.SimTipoDelitoId,
              SimTipoDelitoCodigo: dato.SimTipoDelitoCodigo,
              SimTipoDelitoNombre: dato.SimTipoDelitoNombre,
              SimTipoDelitoEstado: dato.SimTipoDelitoEstado

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimTipoDelitoId}`;
        result += `${separator}${this.SimTipoDelitoCodigo}`;
        result += `${separator}${this.SimTipoDelitoNombre}`;
        result += `${separator}${this.SimTipoDelitoEstado}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimTipoDelitoModel {
        const result = value.split(separator);

        this.SimTipoDelitoId = parseInt(result[0]);
        this.SimTipoDelitoCodigo = parseInt(result[1]);
        this.SimTipoDelitoNombre = result[2];
        this.SimTipoDelitoEstado = new Boolean(result[3]);

        return this;
    }

}
