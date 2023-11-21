export class SimTipoDecisionModel {
    public SimTipoDecisionId: number = 0;
    public SimTipoDecisionCodigo: number;
    public SimTipoDecisionNombre: string;
    public SimTipoDecisionEstado: Boolean = true;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimTipoDecisionId = json.SimTipoDecisionId;
            this.SimTipoDecisionCodigo = json.SimTipoDecisionCodigo;
            this.SimTipoDecisionNombre = json.SimTipoDecisionNombre;
            this.SimTipoDecisionEstado = json.SimTipoDecisionEstado;
        }
    }

    static clone(row: SimTipoDecisionModel): SimTipoDecisionModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimTipoDecisionModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimTipoDecisionId: dato.SimTipoDecisionId,
              SimTipoDecisionCodigo: dato.SimTipoDecisionCodigo,
              SimTipoDecisionNombre: dato.SimTipoDecisionNombre,
              SimTipoDecisionEstado: dato.SimTipoDecisionEstado

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimTipoDecisionId}`;
        result += `${separator}${this.SimTipoDecisionCodigo}`;
        result += `${separator}${this.SimTipoDecisionNombre}`;
        result += `${separator}${this.SimTipoDecisionEstado}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimTipoDecisionModel {
        const result = value.split(separator);

        this.SimTipoDecisionId = parseInt(result[0]);
        this.SimTipoDecisionCodigo = parseInt(result[1]);
        this.SimTipoDecisionNombre = result[2];
        this.SimTipoDecisionEstado = new Boolean(result[3]);

        return this;
    }

}
