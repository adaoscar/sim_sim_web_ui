import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimTipoDelitoTable } from './sim.tipodelito.table';

const routes: Routes = [
    {
        path: '',
        component: SimTipoDelitoTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimTipoDelitoRoutingModule { }
