import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimRolComponent } from './sim.rol.component';

const routes: Routes = [
    {
        path: '',
        component: SimRolComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimRolRoutingModule { }
