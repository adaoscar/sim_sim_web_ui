export class SimOrientacionSexualModel {
    public SimOrientacionSexualId: number = 0;
    public SimOrientacionSexualCodigo: number;
    public SimOrientacionSexualNombre: string;
    public SimOrientacionSexualEstado: Boolean = true;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimOrientacionSexualId = json.SimOrientacionSexualId;
            this.SimOrientacionSexualCodigo = json.SimOrientacionSexualCodigo;
            this.SimOrientacionSexualNombre = json.SimOrientacionSexualNombre;
            this.SimOrientacionSexualEstado = json.SimOrientacionSexualEstado;
        }
    }

    static clone(row: SimOrientacionSexualModel): SimOrientacionSexualModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimOrientacionSexualModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimOrientacionSexualId: dato.SimOrientacionSexualId,
              SimOrientacionSexualCodigo: dato.SimOrientacionSexualCodigo,
              SimOrientacionSexualNombre: dato.SimOrientacionSexualNombre,
              SimOrientacionSexualEstado: dato.SimOrientacionSexualEstado

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimOrientacionSexualId}`;
        result += `${separator}${this.SimOrientacionSexualCodigo}`;
        result += `${separator}${this.SimOrientacionSexualNombre}`;
        result += `${separator}${this.SimOrientacionSexualEstado}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimOrientacionSexualModel {
        const result = value.split(separator);

        this.SimOrientacionSexualId = parseInt(result[0]);
        this.SimOrientacionSexualCodigo = parseInt(result[1]);
        this.SimOrientacionSexualNombre = result[2];
        this.SimOrientacionSexualEstado = new Boolean(result[3]);

        return this;
    }

}
