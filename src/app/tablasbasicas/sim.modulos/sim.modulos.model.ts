export class SimModulosModel {
    public SimModulosId: number = 0;
    public SimModulosCodigo: number;
    public SimModulosNombre: string;
    public SimModulosEstado: Boolean = true;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimModulosId = json.SimModulosId;
            this.SimModulosCodigo = json.SimModulosCodigo;
            this.SimModulosNombre = json.SimModulosNombre;
            this.SimModulosEstado = json.SimModulosEstado;
        }
    }

    static clone(row: SimModulosModel): SimModulosModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimModulosModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimModulosId: dato.SimModulosId,
              SimModulosCodigo: dato.SimModulosCodigo,
              SimModulosNombre: dato.SimModulosNombre,
              SimModulosEstado: dato.SimModulosEstado

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimModulosId}`;
        result += `${separator}${this.SimModulosCodigo}`;
        result += `${separator}${this.SimModulosNombre}`;
        result += `${separator}${this.SimModulosEstado}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimModulosModel {
        const result = value.split(separator);

        this.SimModulosId = parseInt(result[0]);
        this.SimModulosCodigo = parseInt(result[1]);
        this.SimModulosNombre = result[2];
        this.SimModulosEstado = new Boolean(result[3]);

        return this;
    }

}
