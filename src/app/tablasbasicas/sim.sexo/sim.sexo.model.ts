export class SimSexoModel {
    public SimSexoId: number = 0;
    public SimSexoCodigo: number;
    public SimSexoNombre: string;
    public SimSexoEstado: Boolean = true;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimSexoId = json.SimSexoId;
            this.SimSexoCodigo = json.SimSexoCodigo;
            this.SimSexoNombre = json.SimSexoNombre;
            this.SimSexoEstado = json.SimSexoEstado;
        }
    }

    static clone(row: SimSexoModel): SimSexoModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimSexoModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimSexoId: dato.SimSexoId,
              SimSexoCodigo: dato.SimSexoCodigo,
              SimSexoNombre: dato.SimSexoNombre,
              SimSexoEstado: dato.SimSexoEstado

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimSexoId}`;
        result += `${separator}${this.SimSexoCodigo}`;
        result += `${separator}${this.SimSexoNombre}`;
        result += `${separator}${this.SimSexoEstado}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimSexoModel {
        const result = value.split(separator);

        this.SimSexoId = parseInt(result[0]);
        this.SimSexoCodigo = parseInt(result[1]);
        this.SimSexoNombre = result[2];
        this.SimSexoEstado = new Boolean(result[3]);

        return this;
    }

}
