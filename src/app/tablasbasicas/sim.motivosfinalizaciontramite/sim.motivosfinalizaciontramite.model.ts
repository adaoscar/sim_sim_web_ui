export class SimMotivosFinalizacionTramiteModel {
    public SimMotivosFinalizacionTramiteId: number = 0;
    public SimMotivosFinalizacionTramiteCodigo: number;
    public SimMotivosFinalizacionTramiteNombre: string;
    public SimMotivosFinalizacionTramiteEstado: Boolean = true;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimMotivosFinalizacionTramiteId = json.SimMotivosFinalizacionTramiteId;
            this.SimMotivosFinalizacionTramiteCodigo = json.SimMotivosFinalizacionTramiteCodigo;
            this.SimMotivosFinalizacionTramiteNombre = json.SimMotivosFinalizacionTramiteNombre;
            this.SimMotivosFinalizacionTramiteEstado = json.SimMotivosFinalizacionTramiteEstado;
        }
    }

    static clone(row: SimMotivosFinalizacionTramiteModel): SimMotivosFinalizacionTramiteModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimMotivosFinalizacionTramiteModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimMotivosFinalizacionTramiteId: dato.SimMotivosFinalizacionTramiteId,
              SimMotivosFinalizacionTramiteCodigo: dato.SimMotivosFinalizacionTramiteCodigo,
              SimMotivosFinalizacionTramiteNombre: dato.SimMotivosFinalizacionTramiteNombre,
              SimMotivosFinalizacionTramiteEstado: dato.SimMotivosFinalizacionTramiteEstado

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimMotivosFinalizacionTramiteId}`;
        result += `${separator}${this.SimMotivosFinalizacionTramiteCodigo}`;
        result += `${separator}${this.SimMotivosFinalizacionTramiteNombre}`;
        result += `${separator}${this.SimMotivosFinalizacionTramiteEstado}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimMotivosFinalizacionTramiteModel {
        const result = value.split(separator);

        this.SimMotivosFinalizacionTramiteId = parseInt(result[0]);
        this.SimMotivosFinalizacionTramiteCodigo = parseInt(result[1]);
        this.SimMotivosFinalizacionTramiteNombre = result[2];
        this.SimMotivosFinalizacionTramiteEstado = new Boolean(result[3]);

        return this;
    }

}
