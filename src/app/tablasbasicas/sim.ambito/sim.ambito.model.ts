export class SimAmbitoModel {
    public SimAmbitoId: number = 0;
    public SimAmbitoCodigo: number;
    public SimAmbitoNombre: string;
    public SimAmbitoEstado: Boolean = true;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimAmbitoId = json.SimAmbitoId;
            this.SimAmbitoCodigo = json.SimAmbitoCodigo;
            this.SimAmbitoNombre = json.SimAmbitoNombre;
            this.SimAmbitoEstado = json.SimAmbitoEstado;
        }
    }

    static clone(row: SimAmbitoModel): SimAmbitoModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimAmbitoModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimAmbitoId: dato.SimAmbitoId,
              SimAmbitoCodigo: dato.SimAmbitoCodigo,
              SimAmbitoNombre: dato.SimAmbitoNombre,
              SimAmbitoEstado: dato.SimAmbitoEstado

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimAmbitoId}`;
        result += `${separator}${this.SimAmbitoCodigo}`;
        result += `${separator}${this.SimAmbitoNombre}`;
        result += `${separator}${this.SimAmbitoEstado}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimAmbitoModel {
        const result = value.split(separator);

        this.SimAmbitoId = parseInt(result[0]);
        this.SimAmbitoCodigo = parseInt(result[1]);
        this.SimAmbitoNombre = result[2];
        this.SimAmbitoEstado = new Boolean(result[3]);

        return this;
    }

}
