export class SimPaisModel {
    public SimPaisId: number = 0;
    public SimPaisCodigo: number;
    public SimPaisNombre: string;
    public SimPaisEstado: Boolean = true;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimPaisId = json.SimPaisId;
            this.SimPaisCodigo = json.SimPaisCodigo;
            this.SimPaisNombre = json.SimPaisNombre;
            this.SimPaisEstado = json.SimPaisEstado;
        }
    }

    static clone(row: SimPaisModel): SimPaisModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimPaisModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimPaisId: dato.SimPaisId,
              SimPaisCodigo: dato.SimPaisCodigo,
              SimPaisNombre: dato.SimPaisNombre,
              SimPaisEstado: dato.SimPaisEstado

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimPaisId}`;
        result += `${separator}${this.SimPaisCodigo}`;
        result += `${separator}${this.SimPaisNombre}`;
        result += `${separator}${this.SimPaisEstado}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimPaisModel {
        const result = value.split(separator);

        this.SimPaisId = parseInt(result[0]);
        this.SimPaisCodigo = parseInt(result[1]);
        this.SimPaisNombre = result[2];
        this.SimPaisEstado = new Boolean(result[3]);

        return this;
    }

}
