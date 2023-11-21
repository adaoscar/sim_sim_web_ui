export class SimGeneroModel {
    public SimGeneroId: number = 0;
    public SimGeneroCodigo: number;
    public SimGeneroNombre: string;
    public SimGeneroEstado: Boolean = true;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimGeneroId = json.SimGeneroId;
            this.SimGeneroCodigo = json.SimGeneroCodigo;
            this.SimGeneroNombre = json.SimGeneroNombre;
            this.SimGeneroEstado = json.SimGeneroEstado;
        }
    }

    static clone(row: SimGeneroModel): SimGeneroModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimGeneroModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimGeneroId: dato.SimGeneroId,
              SimGeneroCodigo: dato.SimGeneroCodigo,
              SimGeneroNombre: dato.SimGeneroNombre,
              SimGeneroEstado: dato.SimGeneroEstado

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimGeneroId}`;
        result += `${separator}${this.SimGeneroCodigo}`;
        result += `${separator}${this.SimGeneroNombre}`;
        result += `${separator}${this.SimGeneroEstado}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimGeneroModel {
        const result = value.split(separator);

        this.SimGeneroId = parseInt(result[0]);
        this.SimGeneroCodigo = parseInt(result[1]);
        this.SimGeneroNombre = result[2];
        this.SimGeneroEstado = new Boolean(result[3]);

        return this;
    }

}
