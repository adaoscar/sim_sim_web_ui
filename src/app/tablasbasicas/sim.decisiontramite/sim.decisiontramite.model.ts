export class SimDecisionTramiteModel {
    public SimDecisionTramiteId: number = 0;
    public SimDecisionTramiteCodigo: number;
    public SimDecisionTramiteNombre: string;
    public SimDecisionTramiteEstado: Boolean = true;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimDecisionTramiteId = json.SimDecisionTramiteId;
            this.SimDecisionTramiteCodigo = json.SimDecisionTramiteCodigo;
            this.SimDecisionTramiteNombre = json.SimDecisionTramiteNombre;
            this.SimDecisionTramiteEstado = json.SimDecisionTramiteEstado;
        }
    }

    static clone(row: SimDecisionTramiteModel): SimDecisionTramiteModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimDecisionTramiteModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimDecisionTramiteId: dato.SimDecisionTramiteId,
              SimDecisionTramiteCodigo: dato.SimDecisionTramiteCodigo,
              SimDecisionTramiteNombre: dato.SimDecisionTramiteNombre,
              SimDecisionTramiteEstado: dato.SimDecisionTramiteEstado

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimDecisionTramiteId}`;
        result += `${separator}${this.SimDecisionTramiteCodigo}`;
        result += `${separator}${this.SimDecisionTramiteNombre}`;
        result += `${separator}${this.SimDecisionTramiteEstado}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimDecisionTramiteModel {
        const result = value.split(separator);

        this.SimDecisionTramiteId = parseInt(result[0]);
        this.SimDecisionTramiteCodigo = parseInt(result[1]);
        this.SimDecisionTramiteNombre = result[2];
        this.SimDecisionTramiteEstado = new Boolean(result[3]);

        return this;
    }

}
