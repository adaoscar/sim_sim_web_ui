export class SimMedioComunicacionModel {
    public SimMedioComunicacionId: number = 0;
    public SimMedioComunicacionCodigo: number;
    public SimMedioComunicacionNombre: string;
    public SimMedioComunicacionEstado: Boolean = true;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimMedioComunicacionId = json.SimMedioComunicacionId;
            this.SimMedioComunicacionCodigo = json.SimMedioComunicacionCodigo;
            this.SimMedioComunicacionNombre = json.SimMedioComunicacionNombre;
            this.SimMedioComunicacionEstado = json.SimMedioComunicacionEstado;
        }
    }

    static clone(row: SimMedioComunicacionModel): SimMedioComunicacionModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimMedioComunicacionModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimMedioComunicacionId: dato.SimMedioComunicacionId,
              SimMedioComunicacionCodigo: dato.SimMedioComunicacionCodigo,
              SimMedioComunicacionNombre: dato.SimMedioComunicacionNombre,
              SimMedioComunicacionEstado: dato.SimMedioComunicacionEstado

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimMedioComunicacionId}`;
        result += `${separator}${this.SimMedioComunicacionCodigo}`;
        result += `${separator}${this.SimMedioComunicacionNombre}`;
        result += `${separator}${this.SimMedioComunicacionEstado}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimMedioComunicacionModel {
        const result = value.split(separator);

        this.SimMedioComunicacionId = parseInt(result[0]);
        this.SimMedioComunicacionCodigo = parseInt(result[1]);
        this.SimMedioComunicacionNombre = result[2];
        this.SimMedioComunicacionEstado = new Boolean(result[3]);

        return this;
    }

}
