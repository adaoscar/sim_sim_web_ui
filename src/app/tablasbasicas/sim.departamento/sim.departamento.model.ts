export class SimDepartamentoModel {
    public SimDepartamentoId: number = 0;
    public SimDepartamentoCodigo: number;
    public SimDepartamentoNombre: string;
    public SimDepartamentoEstado: Boolean = true;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimDepartamentoId = json.SimDepartamentoId;
            this.SimDepartamentoCodigo = json.SimDepartamentoCodigo;
            this.SimDepartamentoNombre = json.SimDepartamentoNombre;
            this.SimDepartamentoEstado = json.SimDepartamentoEstado;
        }
    }

    static clone(row: SimDepartamentoModel): SimDepartamentoModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimDepartamentoModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimDepartamentoId: dato.SimDepartamentoId,
              SimDepartamentoCodigo: dato.SimDepartamentoCodigo,
              SimDepartamentoNombre: dato.SimDepartamentoNombre,
              SimDepartamentoEstado: dato.SimDepartamentoEstado

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimDepartamentoId}`;
        result += `${separator}${this.SimDepartamentoCodigo}`;
        result += `${separator}${this.SimDepartamentoNombre}`;
        result += `${separator}${this.SimDepartamentoEstado}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimDepartamentoModel {
        const result = value.split(separator);

        this.SimDepartamentoId = parseInt(result[0]);
        this.SimDepartamentoCodigo = parseInt(result[1]);
        this.SimDepartamentoNombre = result[2];
        this.SimDepartamentoEstado = new Boolean(result[3]);

        return this;
    }

}
