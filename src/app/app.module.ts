import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './app.shared.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateService } from '@ngx-translate/core';

import { httpInterceptorProviders  } from './_helpers';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { getPaginatorIntl } from './components/paginator.i18n.provider';
import { BlockUIModule } from 'ng-block-ui';

import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { LoginComponent } from './login/login.component';
import { LoginDialog } from './login/login.dialog';
import { LOGIN_CambioClave_Dialog } from './login/login.cambioclave/login.cambioclave.dialog';
import { LOGIN_RecuperarClave_Dialog } from './login/login.recuperarclave/login.recuperarclave.dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginDialog,
    LOGIN_CambioClave_Dialog,
    LOGIN_RecuperarClave_Dialog,
    PaginaPrincipalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    BlockUIModule.forRoot(),
  ],
  entryComponents: [
    PaginaPrincipalComponent,
    LoginDialog,
    LOGIN_CambioClave_Dialog,
    LOGIN_RecuperarClave_Dialog
  ],
  providers: [ 
    httpInterceptorProviders,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MatPaginatorIntl, useFactory: getPaginatorIntl, deps: [TranslateService]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
