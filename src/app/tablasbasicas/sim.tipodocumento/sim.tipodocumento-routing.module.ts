import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimTipoDocumentoTable } from './sim.tipodocumento.table';

const routes: Routes = [
    {
        path: '',
        component: SimTipoDocumentoTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimTipoDocumentoRoutingModule { }
