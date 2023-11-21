import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_helpers';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'Auditoria',
        loadChildren: () => import('../auditoria/auditoria.module').then(mod => mod.AuditoriaModule),
        canActivate: [AuthGuard] 
      },
      {
        path: 'Seguridad',
        loadChildren: () => import('../seguridad/seguridad.module').then(mod => mod.SeguridadModule),
        canActivate: [AuthGuard] 
      },
      {
        path: 'TablasBasicas',
        loadChildren: () => import('../tablasbasicas/tablasbasicas.module').then(mod => mod.TablasBasicasModule),
        canActivate: [AuthGuard] 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
