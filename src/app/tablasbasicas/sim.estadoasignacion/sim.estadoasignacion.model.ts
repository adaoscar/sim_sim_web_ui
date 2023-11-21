export class SimEstadoAsignacionModel {
    public SimEstadoAsignacionId: number = 0;
    public SimEstadoAsignacionCodigo: number;
    public SimEstadoAsignacionNombre: string;
    public SimEstadoAsignacionEstado: Boolean = true;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimEstadoAsignacionId = json.SimEstadoAsignacionId;
            this.SimEstadoAsignacionCodigo = json.SimEstadoAsignacionCodigo;
            this.SimEstadoAsignacionNombre = json.SimEstadoAsignacionNombre;
            this.SimEstadoAsignacionEstado = json.SimEstadoAsignacionEstado;
        }
    }

    static clone(row: SimEstadoAsignacionModel): SimEstadoAsignacionModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimEstadoAsignacionModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimEstadoAsignacionId: dato.SimEstadoAsignacionId,
              SimEstadoAsignacionCodigo: dato.SimEstadoAsignacionCodigo,
              SimEstadoAsignacionNombre: dato.SimEstadoAsignacionNombre,
              SimEstadoAsignacionEstado: dato.SimEstadoAsignacionEstado

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimEstadoAsignacionId}`;
        result += `${separator}${this.SimEstadoAsignacionCodigo}`;
        result += `${separator}${this.SimEstadoAsignacionNombre}`;
        result += `${separator}${this.SimEstadoAsignacionEstado}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimEstadoAsignacionModel {
        const result = value.split(separator);

        this.SimEstadoAsignacionId = parseInt(result[0]);
        this.SimEstadoAsignacionCodigo = parseInt(result[1]);
        this.SimEstadoAsignacionNombre = result[2];
        this.SimEstadoAsignacionEstado = new Boolean(result[3]);

        return this;
    }

}
