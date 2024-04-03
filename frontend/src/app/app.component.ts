import { Component, AfterViewInit  } from '@angular/core';
import { RouterLink, RouterOutlet, Router} from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterLink]
})
export class AppComponent {
  isloggedIn = false;
  showContent: boolean = false;

  constructor(
    private router: Router
  ){}

  isHomePage(): boolean {
    return this.router.url === '/';
  }


}

