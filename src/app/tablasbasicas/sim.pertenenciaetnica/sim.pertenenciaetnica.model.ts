export class SimPertenenciaEtnicaModel {
    public SimPertenenciaEtnicaId: number = 0;
    public SimPertenenciaEtnicaCodigo: number;
    public SimPertenenciaEtnicaNombre: string;
    public SimPertenenciaEtnicaEstado: Boolean = true;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimPertenenciaEtnicaId = json.SimPertenenciaEtnicaId;
            this.SimPertenenciaEtnicaCodigo = json.SimPertenenciaEtnicaCodigo;
            this.SimPertenenciaEtnicaNombre = json.SimPertenenciaEtnicaNombre;
            this.SimPertenenciaEtnicaEstado = json.SimPertenenciaEtnicaEstado;
        }
    }

    static clone(row: SimPertenenciaEtnicaModel): SimPertenenciaEtnicaModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimPertenenciaEtnicaModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimPertenenciaEtnicaId: dato.SimPertenenciaEtnicaId,
              SimPertenenciaEtnicaCodigo: dato.SimPertenenciaEtnicaCodigo,
              SimPertenenciaEtnicaNombre: dato.SimPertenenciaEtnicaNombre,
              SimPertenenciaEtnicaEstado: dato.SimPertenenciaEtnicaEstado

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimPertenenciaEtnicaId}`;
        result += `${separator}${this.SimPertenenciaEtnicaCodigo}`;
        result += `${separator}${this.SimPertenenciaEtnicaNombre}`;
        result += `${separator}${this.SimPertenenciaEtnicaEstado}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimPertenenciaEtnicaModel {
        const result = value.split(separator);

        this.SimPertenenciaEtnicaId = parseInt(result[0]);
        this.SimPertenenciaEtnicaCodigo = parseInt(result[1]);
        this.SimPertenenciaEtnicaNombre = result[2];
        this.SimPertenenciaEtnicaEstado = new Boolean(result[3]);

        return this;
    }

}
