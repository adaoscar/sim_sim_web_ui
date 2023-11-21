import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.scss', '../login/assets/css/font-awesome.min.css', '../login/assets/css/bootstrap.min.css',
    '../login/assets/css/supersized.css', '../login/assets/css/mj-style.css', '../login/assets/css/media-queries.css',
  ]
})
export class PaginaPrincipalComponent {

  loginAplicativo(aplicativo: string) {
    if(aplicativo=="SICAAC")
      window.location.href = `${environment.urls[aplicativo]}`;
    else
      window.location.href = `${environment.urls[aplicativo]}/login`;
  }

}
