export class SimDiasFestivosModel {
    public SimDiasFestivosId: number = 0;
    public SimDiasFestivosFecha: Date;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.SimDiasFestivosId = json.SimDiasFestivosId;
            this.SimDiasFestivosFecha = json.SimDiasFestivosFecha;
        }
    }

    static clone(row: SimDiasFestivosModel): SimDiasFestivosModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimDiasFestivosModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              SimDiasFestivosId: dato.SimDiasFestivosId,
              SimDiasFestivosFecha: dato.SimDiasFestivosFecha

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimDiasFestivosId}`;
        result += `${separator}${this.SimDiasFestivosFecha}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimDiasFestivosModel {
        const result = value.split(separator);

        this.SimDiasFestivosId = parseInt(result[0]);
        this.SimDiasFestivosFecha = new Date(result[1]);

        return this;
    }

}
