export class SimMunicipioModel {
    public SimMunicipioId: number = 0;
    public SimDepartamentoId: number;
    public SimMunicipioCodigo: number;
    public SiceqAutoridadJudicialId: number;
    public SimMunicipioEstado: Boolean = true;
    public SimDepartamento: any = {};
    public SiceqAutoridadJudicial: any = {};
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimMunicipioId = json.SimMunicipioId;
            this.SimDepartamentoId = json.SimDepartamentoId;
            this.SimMunicipioCodigo = json.SimMunicipioCodigo;
            this.SiceqAutoridadJudicialId = json.SiceqAutoridadJudicialId;
            this.SimMunicipioEstado = json.SimMunicipioEstado;
            this.SimDepartamento = json.SimDepartamento;
            this.SiceqAutoridadJudicial = json.SiceqAutoridadJudicial;
        }
    }

    static clone(row: SimMunicipioModel): SimMunicipioModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;
        delete rowCloned.SimDepartamento;
        delete rowCloned.SiceqAutoridadJudicial;

        return rowCloned;
    }

    static cloneExcel(data: SimMunicipioModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimMunicipioId: dato.SimMunicipioId,
              SimDepartamentoId: dato.SimDepartamentoId,
              SimMunicipioCodigo: dato.SimMunicipioCodigo,
              SiceqAutoridadJudicialId: dato.SiceqAutoridadJudicialId,
              SimMunicipioEstado: dato.SimMunicipioEstado,
              SimDepartamento:  dato.SimDepartamento,
              SiceqAutoridadJudicial:  dato.SiceqAutoridadJudicial

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimMunicipioId}`;
        result += `${separator}${this.SimDepartamentoId}`;
        result += `${separator}${this.SimMunicipioCodigo}`;
        result += `${separator}${this.SiceqAutoridadJudicialId}`;
        result += `${separator}${this.SimMunicipioEstado}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimMunicipioModel {
        const result = value.split(separator);

        this.SimMunicipioId = parseInt(result[0]);
        this.SimDepartamentoId = parseInt(result[1]);
        this.SimMunicipioCodigo = parseInt(result[2]);
        this.SiceqAutoridadJudicialId = parseInt(result[3]);
        this.SimMunicipioEstado = new Boolean(result[4]);

        return this;
    }

}
