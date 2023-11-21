import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'SIM_Usuarios',
        loadChildren: () => import('./sim.usuario/sim.usuario.module').then(mod => mod.SimUsuarioModule)
    },
    {
        path: 'SIM_Roles',
        loadChildren: () => import('./sim.rol/sim.rol.module').then(mod => mod.SimRolModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SeguridadRoutingModule { }
