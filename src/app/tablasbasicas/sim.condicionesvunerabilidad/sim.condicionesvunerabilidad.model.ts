export class SimCondicionesVunerabilidadModel {
    public SimCondicionesVunerabilidadId: number = 0;
    public SimCondicionesVunerabilidadCodigo: number;
    public SimCondicionesVunerabilidadNombre: string;
    public SimCondicionesVunerabilidadEstado: Boolean = true;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimCondicionesVunerabilidadId = json.SimCondicionesVunerabilidadId;
            this.SimCondicionesVunerabilidadCodigo = json.SimCondicionesVunerabilidadCodigo;
            this.SimCondicionesVunerabilidadNombre = json.SimCondicionesVunerabilidadNombre;
            this.SimCondicionesVunerabilidadEstado = json.SimCondicionesVunerabilidadEstado;
        }
    }

    static clone(row: SimCondicionesVunerabilidadModel): SimCondicionesVunerabilidadModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimCondicionesVunerabilidadModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimCondicionesVunerabilidadId: dato.SimCondicionesVunerabilidadId,
              SimCondicionesVunerabilidadCodigo: dato.SimCondicionesVunerabilidadCodigo,
              SimCondicionesVunerabilidadNombre: dato.SimCondicionesVunerabilidadNombre,
              SimCondicionesVunerabilidadEstado: dato.SimCondicionesVunerabilidadEstado

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimCondicionesVunerabilidadId}`;
        result += `${separator}${this.SimCondicionesVunerabilidadCodigo}`;
        result += `${separator}${this.SimCondicionesVunerabilidadNombre}`;
        result += `${separator}${this.SimCondicionesVunerabilidadEstado}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimCondicionesVunerabilidadModel {
        const result = value.split(separator);

        this.SimCondicionesVunerabilidadId = parseInt(result[0]);
        this.SimCondicionesVunerabilidadCodigo = parseInt(result[1]);
        this.SimCondicionesVunerabilidadNombre = result[2];
        this.SimCondicionesVunerabilidadEstado = new Boolean(result[3]);

        return this;
    }

}
