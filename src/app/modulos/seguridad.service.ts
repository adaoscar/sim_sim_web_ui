import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlertaComponent } from '../shared/alerta/alerta.component';

@Injectable({ providedIn: 'root' })
export class SeguridadService {
    private currentHomeSubject: BehaviorSubject<boolean>;
    public currentHome: Observable<boolean>;

    private timeInactive: number = 0;

    constructor(public dialog: MatDialog) {
        this.currentHomeSubject = new BehaviorSubject<boolean>(false);
        this.currentHome = this.currentHomeSubject.asObservable();
    }

    public get currentHomeValue(): boolean {
        return this.currentHomeSubject.value;
    }

    setCurrentHome(estado: boolean) {
        this.currentHomeSubject.next(estado);
    }

    setCurrentTimeInactive() {
        setInterval(() => {
            this.timeInactive++;

            if (this.timeInactive === 1800) {
                sessionStorage.clear();
                localStorage.clear();
                
                const dialogRef = this.dialog.open(AlertaComponent, {
                    data: {
                         tipo: 'advertencia', 
                         titulo: 'Inactividad', 
                         mensaje: 'El sistema se cerrará por inactividad'
                    }
                });
     
                dialogRef.afterClosed().subscribe(result => {
                    this.onCerrarSesion();
                });
            };

        }, 1000)
    }

    reiniciarTiempoInactivo() {
        this.timeInactive = 0;
    }

    onCerrarSesion() {
        console.log('logged out');
        window.location.href = `${environment.urls.SIM}`;
    }
}