import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimTipoSesionTable } from './sim.tiposesion.table';

const routes: Routes = [
    {
        path: '',
        component: SimTipoSesionTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimTipoSesionRoutingModule { }
