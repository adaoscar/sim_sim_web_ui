export class SimTipoDocumentoModel {
    public SimTipoDocumentoId: number = 0;
    public SimTipoDocumentoCodigo: string;
    public SimTipoDocumentoNombre: string;
    public SimTipoDocumentoEstado: Boolean = true;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimTipoDocumentoId = json.SimTipoDocumentoId;
            this.SimTipoDocumentoCodigo = json.SimTipoDocumentoCodigo;
            this.SimTipoDocumentoNombre = json.SimTipoDocumentoNombre;
            this.SimTipoDocumentoEstado = json.SimTipoDocumentoEstado;
        }
    }

    static clone(row: SimTipoDocumentoModel): SimTipoDocumentoModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimTipoDocumentoModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimTipoDocumentoId: dato.SimTipoDocumentoId,
              SimTipoDocumentoCodigo: dato.SimTipoDocumentoCodigo,
              SimTipoDocumentoNombre: dato.SimTipoDocumentoNombre,
              SimTipoDocumentoEstado: dato.SimTipoDocumentoEstado

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimTipoDocumentoId}`;
        result += `${separator}${this.SimTipoDocumentoCodigo}`;
        result += `${separator}${this.SimTipoDocumentoNombre}`;
        result += `${separator}${this.SimTipoDocumentoEstado}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimTipoDocumentoModel {
        const result = value.split(separator);

        this.SimTipoDocumentoId = parseInt(result[0]);
        this.SimTipoDocumentoCodigo = result[1];
        this.SimTipoDocumentoNombre = result[2];
        this.SimTipoDocumentoEstado = new Boolean(result[3]);

        return this;
    }

}
