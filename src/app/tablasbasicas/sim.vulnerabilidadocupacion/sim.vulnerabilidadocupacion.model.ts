export class SimVulnerabilidadOcupacionModel {
    public SimVulnerabilidadOcupacionId: number = 0;
    public SimVulnerabilidadOcupacionCodigo: number;
    public SimVulnerabilidadOcupacionNombre: string;
    public SimVulnerabilidadOcupacionEstado: Boolean = true;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimVulnerabilidadOcupacionId = json.SimVulnerabilidadOcupacionId;
            this.SimVulnerabilidadOcupacionCodigo = json.SimVulnerabilidadOcupacionCodigo;
            this.SimVulnerabilidadOcupacionNombre = json.SimVulnerabilidadOcupacionNombre;
            this.SimVulnerabilidadOcupacionEstado = json.SimVulnerabilidadOcupacionEstado;
        }
    }

    static clone(row: SimVulnerabilidadOcupacionModel): SimVulnerabilidadOcupacionModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimVulnerabilidadOcupacionModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimVulnerabilidadOcupacionId: dato.SimVulnerabilidadOcupacionId,
              SimVulnerabilidadOcupacionCodigo: dato.SimVulnerabilidadOcupacionCodigo,
              SimVulnerabilidadOcupacionNombre: dato.SimVulnerabilidadOcupacionNombre,
              SimVulnerabilidadOcupacionEstado: dato.SimVulnerabilidadOcupacionEstado

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimVulnerabilidadOcupacionId}`;
        result += `${separator}${this.SimVulnerabilidadOcupacionCodigo}`;
        result += `${separator}${this.SimVulnerabilidadOcupacionNombre}`;
        result += `${separator}${this.SimVulnerabilidadOcupacionEstado}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimVulnerabilidadOcupacionModel {
        const result = value.split(separator);

        this.SimVulnerabilidadOcupacionId = parseInt(result[0]);
        this.SimVulnerabilidadOcupacionCodigo = parseInt(result[1]);
        this.SimVulnerabilidadOcupacionNombre = result[2];
        this.SimVulnerabilidadOcupacionEstado = new Boolean(result[3]);

        return this;
    }

}
