export class SimPeriodoDiasModel {
    public SimPeriodoDiasId: number = 0;
    public SimPeriodoDiasCodigo: number;
    public SimPeriodoDiasNombre: string;
    public SimPeriodoDiasEstado: Boolean = true;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimPeriodoDiasId = json.SimPeriodoDiasId;
            this.SimPeriodoDiasCodigo = json.SimPeriodoDiasCodigo;
            this.SimPeriodoDiasNombre = json.SimPeriodoDiasNombre;
            this.SimPeriodoDiasEstado = json.SimPeriodoDiasEstado;
        }
    }

    static clone(row: SimPeriodoDiasModel): SimPeriodoDiasModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimPeriodoDiasModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimPeriodoDiasId: dato.SimPeriodoDiasId,
              SimPeriodoDiasCodigo: dato.SimPeriodoDiasCodigo,
              SimPeriodoDiasNombre: dato.SimPeriodoDiasNombre,
              SimPeriodoDiasEstado: dato.SimPeriodoDiasEstado

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimPeriodoDiasId}`;
        result += `${separator}${this.SimPeriodoDiasCodigo}`;
        result += `${separator}${this.SimPeriodoDiasNombre}`;
        result += `${separator}${this.SimPeriodoDiasEstado}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimPeriodoDiasModel {
        const result = value.split(separator);

        this.SimPeriodoDiasId = parseInt(result[0]);
        this.SimPeriodoDiasCodigo = parseInt(result[1]);
        this.SimPeriodoDiasNombre = result[2];
        this.SimPeriodoDiasEstado = new Boolean(result[3]);

        return this;
    }

}
