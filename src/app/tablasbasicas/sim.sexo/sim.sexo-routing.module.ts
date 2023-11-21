import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimSexoTable } from './sim.sexo.table';

const routes: Routes = [
    {
        path: '',
        component: SimSexoTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimSexoRoutingModule { }
