export class SimAplicacionModel {
    public SimAplicacionId: number = 0;
    public SimAplicacionCodigo: number;
    public SimAplicacionNombre: string;
    public SimAplicacionEstado: Boolean = true;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimAplicacionId = json.SimAplicacionId;
            this.SimAplicacionCodigo = json.SimAplicacionCodigo;
            this.SimAplicacionNombre = json.SimAplicacionNombre;
            this.SimAplicacionEstado = json.SimAplicacionEstado;
        }
    }

    static clone(row: SimAplicacionModel): SimAplicacionModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimAplicacionModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimAplicacionId: dato.SimAplicacionId,
              SimAplicacionCodigo: dato.SimAplicacionCodigo,
              SimAplicacionNombre: dato.SimAplicacionNombre,
              SimAplicacionEstado: dato.SimAplicacionEstado

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimAplicacionId}`;
        result += `${separator}${this.SimAplicacionCodigo}`;
        result += `${separator}${this.SimAplicacionNombre}`;
        result += `${separator}${this.SimAplicacionEstado}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimAplicacionModel {
        const result = value.split(separator);

        this.SimAplicacionId = parseInt(result[0]);
        this.SimAplicacionCodigo = parseInt(result[1]);
        this.SimAplicacionNombre = result[2];
        this.SimAplicacionEstado = new Boolean(result[3]);

        return this;
    }

}
