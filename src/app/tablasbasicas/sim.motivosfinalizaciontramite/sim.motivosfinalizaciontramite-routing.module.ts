import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimMotivosFinalizacionTramiteTable } from './sim.motivosfinalizaciontramite.table';

const routes: Routes = [
    {
        path: '',
        component: SimMotivosFinalizacionTramiteTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimMotivosFinalizacionTramiteRoutingModule { }
