export class SimEstadoDocumentoModel {
    public SimEstadoDocumentoId: number = 0;
    public SimEstadoDocumentoCodigo: number;
    public SimEstadoDocumentoNombre: string;
    public SimEstadoDocumentoEstado: Boolean = true;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimEstadoDocumentoId = json.SimEstadoDocumentoId;
            this.SimEstadoDocumentoCodigo = json.SimEstadoDocumentoCodigo;
            this.SimEstadoDocumentoNombre = json.SimEstadoDocumentoNombre;
            this.SimEstadoDocumentoEstado = json.SimEstadoDocumentoEstado;
        }
    }

    static clone(row: SimEstadoDocumentoModel): SimEstadoDocumentoModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimEstadoDocumentoModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimEstadoDocumentoId: dato.SimEstadoDocumentoId,
              SimEstadoDocumentoCodigo: dato.SimEstadoDocumentoCodigo,
              SimEstadoDocumentoNombre: dato.SimEstadoDocumentoNombre,
              SimEstadoDocumentoEstado: dato.SimEstadoDocumentoEstado

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimEstadoDocumentoId}`;
        result += `${separator}${this.SimEstadoDocumentoCodigo}`;
        result += `${separator}${this.SimEstadoDocumentoNombre}`;
        result += `${separator}${this.SimEstadoDocumentoEstado}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimEstadoDocumentoModel {
        const result = value.split(separator);

        this.SimEstadoDocumentoId = parseInt(result[0]);
        this.SimEstadoDocumentoCodigo = parseInt(result[1]);
        this.SimEstadoDocumentoNombre = result[2];
        this.SimEstadoDocumentoEstado = new Boolean(result[3]);

        return this;
    }

}
