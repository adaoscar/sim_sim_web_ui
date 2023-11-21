export class SimMotivoNoViabilidadModel {
    public SimMotivoNoViabilidadId: number = 0;
    public SimMotivoNoViabilidadCodigo: number;
    public SimMotivoNoViabilidadNombre: string;
    public SimMotivoNoViabilidadEstado: Boolean = true;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimMotivoNoViabilidadId = json.SimMotivoNoViabilidadId;
            this.SimMotivoNoViabilidadCodigo = json.SimMotivoNoViabilidadCodigo;
            this.SimMotivoNoViabilidadNombre = json.SimMotivoNoViabilidadNombre;
            this.SimMotivoNoViabilidadEstado = json.SimMotivoNoViabilidadEstado;
        }
    }

    static clone(row: SimMotivoNoViabilidadModel): SimMotivoNoViabilidadModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimMotivoNoViabilidadModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimMotivoNoViabilidadId: dato.SimMotivoNoViabilidadId,
              SimMotivoNoViabilidadCodigo: dato.SimMotivoNoViabilidadCodigo,
              SimMotivoNoViabilidadNombre: dato.SimMotivoNoViabilidadNombre,
              SimMotivoNoViabilidadEstado: dato.SimMotivoNoViabilidadEstado

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimMotivoNoViabilidadId}`;
        result += `${separator}${this.SimMotivoNoViabilidadCodigo}`;
        result += `${separator}${this.SimMotivoNoViabilidadNombre}`;
        result += `${separator}${this.SimMotivoNoViabilidadEstado}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimMotivoNoViabilidadModel {
        const result = value.split(separator);

        this.SimMotivoNoViabilidadId = parseInt(result[0]);
        this.SimMotivoNoViabilidadCodigo = parseInt(result[1]);
        this.SimMotivoNoViabilidadNombre = result[2];
        this.SimMotivoNoViabilidadEstado = new Boolean(result[3]);

        return this;
    }

}
