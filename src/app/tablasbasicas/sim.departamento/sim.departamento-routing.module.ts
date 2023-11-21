import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimDepartamentoTable } from './sim.departamento.table';

const routes: Routes = [
    {
        path: '',
        component: SimDepartamentoTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimDepartamentoRoutingModule { }
