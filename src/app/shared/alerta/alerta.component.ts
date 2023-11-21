import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'alerta-component',
    templateUrl: './alerta.component.html',
    styleUrls: ['./alerta.component.css']
})
export class AlertaComponent {

    tipo: string = 'informativa';
    titulo: string = 'Sin asignar';
    mensaje: string = 'Disculpe las molestias';

    constructor(public dialogRef: MatDialogRef<AlertaComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.tipo = data.tipo;
        this.titulo = data.titulo;
        this.mensaje = data.mensaje;
        this.dialogRef.disableClose = this.setDisable();
    }

    onSubmit(tipo) {
        this.dialogRef.close({
            data: tipo
        });
    }

    getEstilos(): any {
        switch (this.tipo) {
            case 'informativa': return { icono: 'check_circle', color: '#3772ff', padding: '7%', botones: false, cancel: false };
            case 'exito': return { icono: 'check_circle', color: '#069169', padding: '2%', botones: true, cancel: false };
            case 'error': return { icono: 'cancel', color: '#a80521', padding: '2%', botones: true, cancel: true };
            case 'mantenimiento': return { icono: 'error', color: '#ffab00', padding: '7%', botones: false, cancel: false };
            case 'advertencia': return { icono: 'sentiment_very_dissatisfied', color: '#ffab00', padding: '2%', botones: true, cancel: false };
            case 'salida': return { icono: 'error', color: '#ffab00', padding: '2%', botones: true, cancel: true };
        };
    }

    getBoton(): string {
        switch (this.tipo) {
            case 'exito': return 'alertasBotones.aceptar';
            case 'error': return 'alertasBotones.aceptar';
            case 'advertencia': return 'alertasBotones.regresar';
            case 'salida': return 'alertasBotones.continuar';
            default: return 'alertasBotones.aceptar';
        };
    }

    setDisable(): boolean {
        switch (this.tipo) {
            case 'informativa': return false;
            case 'exito': return false;
            case 'error': return true;
            case 'mantenimiento': return false;
            case 'advertencia': return true;
            case 'salida': return  true;
        };
    }
}