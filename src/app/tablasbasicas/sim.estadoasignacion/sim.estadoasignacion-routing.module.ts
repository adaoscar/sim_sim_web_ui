import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimEstadoAsignacionTable } from './sim.estadoasignacion.table';

const routes: Routes = [
    {
        path: '',
        component: SimEstadoAsignacionTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimEstadoAsignacionRoutingModule { }
