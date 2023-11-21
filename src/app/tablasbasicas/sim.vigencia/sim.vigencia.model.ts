export class SimVigenciaModel {
    public SimVigenciaId: number = 0;
    public SimVigenciaCodigo: number;
    public SimVigenciaNombre: string;
    public SimVigenciaEstado: Boolean = true;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimVigenciaId = json.SimVigenciaId;
            this.SimVigenciaCodigo = json.SimVigenciaCodigo;
            this.SimVigenciaNombre = json.SimVigenciaNombre;
            this.SimVigenciaEstado = json.SimVigenciaEstado;
        }
    }

    static clone(row: SimVigenciaModel): SimVigenciaModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimVigenciaModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimVigenciaId: dato.SimVigenciaId,
              SimVigenciaCodigo: dato.SimVigenciaCodigo,
              SimVigenciaNombre: dato.SimVigenciaNombre,
              SimVigenciaEstado: dato.SimVigenciaEstado

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimVigenciaId}`;
        result += `${separator}${this.SimVigenciaCodigo}`;
        result += `${separator}${this.SimVigenciaNombre}`;
        result += `${separator}${this.SimVigenciaEstado}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimVigenciaModel {
        const result = value.split(separator);

        this.SimVigenciaId = parseInt(result[0]);
        this.SimVigenciaCodigo = parseInt(result[1]);
        this.SimVigenciaNombre = result[2];
        this.SimVigenciaEstado = new Boolean(result[3]);

        return this;
    }

}
