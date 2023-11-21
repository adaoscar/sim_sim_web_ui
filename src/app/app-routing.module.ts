import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { AuthGuard } from './_helpers';

const routes: Routes = [
  {
    path: '',
    component: PaginaPrincipalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'index',
    component: PaginaPrincipalComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'RecuperarClave',
    component: LoginComponent,
  },
  {  
    path: 'SIM', 
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'SIM'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
