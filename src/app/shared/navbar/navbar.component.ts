import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'navbar-component',
    templateUrl: './navbar.component.html',
    styleUrls: [ './navbar.component.css']
})
export class NavbarComponent {

    @Output() volver = new EventEmitter<any>();

    fecha: string;

    constructor(private router: Router) {
        this.fecha = moment().format('DD-MM-YYYY');
    }

    onPrincipal() {
        this.router.navigateByUrl('/SIM');
        this.volver.emit(true);
    }
}