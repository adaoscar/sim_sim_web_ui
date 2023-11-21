import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimVigenciaTable } from './sim.vigencia.table';

const routes: Routes = [
    {
        path: '',
        component: SimVigenciaTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimVigenciaRoutingModule { }
