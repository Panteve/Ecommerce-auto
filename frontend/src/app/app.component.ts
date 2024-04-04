import { Component, Inject } from '@angular/core';
import { RouterLink, RouterOutlet} from '@angular/router'
import { DOCUMENT, NgOptimizedImage } from '@angular/common';;

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterLink, NgOptimizedImage]
})
export class AppComponent {

  isloggedIn: boolean;

  constructor(@Inject(DOCUMENT) private document: Document) {
    // Acceder a localStorage de manera segura
    const localStorage = this.document.defaultView?.localStorage;

    // Verificar si localStorage está disponible
    if (localStorage) {
      // Recuperar el estado de 'isloggedIn' del almacenamiento local al inicializar el componente
      const storedValue = localStorage.getItem('isloggedIn');
      this.isloggedIn = storedValue !== null ? JSON.parse(storedValue) : false;
    } else {
      // Si localStorage no está disponible, inicializar 'isloggedIn' como falso
      this.isloggedIn = false;
    }
  }

  signIn() {
    this.isloggedIn = true
    const localStorage = this.document.defaultView?.localStorage;
    if (localStorage) {
      localStorage.setItem('isloggedIn', JSON.stringify(this.isloggedIn));
    }
  }

  logout() {
    // Cambiar el estado de 'isloggedIn' y guardar en el almacenamiento local
    this.isloggedIn = false;
    const localStorage = this.document.defaultView?.localStorage;
    if (localStorage) {
      localStorage.setItem('isloggedIn', JSON.stringify(this.isloggedIn));
    }
  }
}
