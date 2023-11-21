import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimUsuarioTable } from './sim.usuario.table';

const routes: Routes = [
    {
        path: '',
        component: SimUsuarioTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimUsuarioRoutingModule { }
