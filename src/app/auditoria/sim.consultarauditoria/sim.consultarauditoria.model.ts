import { SimUsuarioModel } from "src/app/seguridad/sim.usuario/sim.usuario.model";

export class SimConsultarAuditoriaModel {
    public SimConsultarAuditoriaId: number = 0;
    public SimUsuarioId: number;
    public SimConsultarAuditoriaRol: string;
    public SimConsultarAuditoriaFechaIngreso: Date;
    public SimConsultarAuditoriaAplicacion: string;
    public SimConsultarAuditoriaModulo: string;
    public SimConsultarAuditoriaFuncionalidad: string;
    public SimConsultarAuditoriaAccion: string;
    public SimConsultarAuditoriaRegistroActual: string;
    public SimConsultarAuditoriaRegistroModificado: string;
    public SimConsultarAuditoriaUsuarioIP: string;
    public SimConsultarAuditoriaRegistrodeIngresoExitoso: boolean;
    public SimConsultarAuditoriaRegistrodeIngresoFallido: boolean;
    public SimConsultarAuditoriaIngresoExitosoFuncionalidad: string;
    public SimConsultarAuditoriaIngresofallidaFuncionalidad: string;
    public SimUsuario: SimUsuarioModel;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;
   
   

    constructor(json: any = null) {
        if (json !== null) {
            this.SimConsultarAuditoriaId = json.SimConsultarAuditoriaId;
            this.SimUsuarioId = json.SimUsuarioId;
            this.SimUsuario = json.Usuario;
            this.SimConsultarAuditoriaRol = json.SimConsultarAuditoriaRol;
            this.SimConsultarAuditoriaFechaIngreso = json.SimConsultarAuditoriaFechaIngreso;
            this.SimConsultarAuditoriaAplicacion = json.SimConsultarAuditoriaAplicacion;
            this.SimConsultarAuditoriaModulo = json.SimConsultarAuditoriaModulo;
            this.SimConsultarAuditoriaFuncionalidad = json.SimConsultarAuditoriaFuncionalidad;
            this.SimConsultarAuditoriaAccion = json.SimConsultarAuditoriaAccion;
            this.SimConsultarAuditoriaRegistroActual = json.SimConsultarAuditoriaRegistroActual;
            this.SimConsultarAuditoriaUsuarioIP= json.SimConsultarAuditoriaUsuarioIP;
            this.SimConsultarAuditoriaRegistrodeIngresoExitoso = json.SimConsultarAuditoriaRegistrodeIngresoExitoso;
            this.SimConsultarAuditoriaRegistrodeIngresoFallido= json.SimConsultarAuditoriaRegistrodeIngresoFallido;
            this.SimConsultarAuditoriaIngresoExitosoFuncionalidad = json.SimConsultarAuditoriaIngresoExitosoFuncionalidad;
            this.SimConsultarAuditoriaIngresofallidaFuncionalidad = json.SimConsultarAuditoriaIngresofallidaFuncionalidad;
            
        }
    }

    static clone(row: SimConsultarAuditoriaModel): SimConsultarAuditoriaModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: SimConsultarAuditoriaModel[]): any[] {
       let dataExcel: any[] = [];
       data.forEach(dato => {
           let registro = {

              SimConsultarAuditoriaId: dato.SimConsultarAuditoriaId,
              SimUsuarioId: dato.SimUsuarioId,
              SimConsultarAuditoriaRol: dato.SimConsultarAuditoriaRol,
              SimConsultarAuditoriaFechaIngreso: dato.SimConsultarAuditoriaFechaIngreso,
              SimConsultarAuditoriaAplicacion: dato.SimConsultarAuditoriaAplicacion,
              SimConsultarAuditoriaModulo: dato.SimConsultarAuditoriaModulo,
              SimConsultarAuditoriaFuncionalidad: dato.SimConsultarAuditoriaFuncionalidad,
              SimConsultarAuditoriaAccion: dato.SimConsultarAuditoriaAccion,
              SimConsultarAuditoriaRegistroActual: dato.SimConsultarAuditoriaRegistroActual,
              SimConsultarAuditoriaRegistroModificado: dato.SimConsultarAuditoriaRegistroModificado,
              SimConsultarAuditoriaUsuarioIP: dato.SimConsultarAuditoriaUsuarioIP,
              SimConsultarAuditoriaRegistrodeIngresoExitoso: dato.SimConsultarAuditoriaRegistrodeIngresoExitoso,
              SimConsultarAuditoriaRegistrodeIngresoFallido: dato.SimConsultarAuditoriaRegistrodeIngresoFallido,
              SimConsultarAuditoriaIngresoExitosoFuncionalidad: dato.SimConsultarAuditoriaIngresoExitosoFuncionalidad,
              SimConsultarAuditoriaIngresofallidaFuncionalidad: dato.SimConsultarAuditoriaIngresofallidaFuncionalidad,
        
            };
            dataExcel.push(registro);
       });
       return dataExcel;
    }

    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.SimConsultarAuditoriaId}`;
        result += `${separator}${this.SimUsuarioId}`;
        result += `${separator}${this.SimConsultarAuditoriaRol}`;
        result += `${separator}${this.SimConsultarAuditoriaFechaIngreso}`;
        result += `${separator}${this.SimConsultarAuditoriaAplicacion}`;
        result += `${separator}${this.SimConsultarAuditoriaModulo}`;
        result += `${separator}${this.SimConsultarAuditoriaFuncionalidad}`;
        result += `${separator}${this.SimConsultarAuditoriaAccion}`;
        result += `${separator}${this.SimConsultarAuditoriaRegistroActual}`;
        result += `${separator}${this.SimConsultarAuditoriaRegistroModificado}`;
        result += `${separator}${this.SimConsultarAuditoriaUsuarioIP}`;
        result += `${separator}${this.SimConsultarAuditoriaRegistrodeIngresoExitoso}`;
        result += `${separator}${this.SimConsultarAuditoriaRegistrodeIngresoFallido}`;
        result += `${separator}${this.SimConsultarAuditoriaIngresoExitosoFuncionalidad}`;
        result += `${separator}${this.SimConsultarAuditoriaIngresofallidaFuncionalidad}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): SimConsultarAuditoriaModel {
        const result = value.split(separator);

        this.SimConsultarAuditoriaId = parseInt(result[0]);
        this.SimUsuarioId = parseFloat(result[1]);
        this.SimConsultarAuditoriaRol = result[2];
        this.SimConsultarAuditoriaFechaIngreso = new Date(result[3]);
        this.SimConsultarAuditoriaAplicacion = result[4];
        this.SimConsultarAuditoriaModulo = result[5];
        this.SimConsultarAuditoriaFuncionalidad = result[6];
        this.SimConsultarAuditoriaAccion = result[7];
        this.SimConsultarAuditoriaRegistroActual = result[8];
        this.SimConsultarAuditoriaRegistroModificado = result[9];
        this.SimConsultarAuditoriaUsuarioIP= (result[10]);
        this.SimConsultarAuditoriaRegistrodeIngresoExitoso= Boolean(result[11]);
        this.SimConsultarAuditoriaRegistrodeIngresoFallido= Boolean(result[12]);
        this.SimConsultarAuditoriaIngresoExitosoFuncionalidad = result[13];
        this.SimConsultarAuditoriaIngresofallidaFuncionalidad= result[14];
        return this;
    }

}
