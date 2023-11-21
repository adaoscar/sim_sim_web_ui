import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimCondicionesVunerabilidadTable } from './sim.condicionesvunerabilidad.table';

const routes: Routes = [
    {
        path: '',
        component: SimCondicionesVunerabilidadTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimCondicionesVunerabilidadRoutingModule { }
