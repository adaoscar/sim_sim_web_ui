import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimConsultarAuditoriaTable } from './sim.consultarauditoria.table';

const routes: Routes = [
    {
        path: '',
        component: SimConsultarAuditoriaTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimConsultarAuditoriaRoutingModule { }
