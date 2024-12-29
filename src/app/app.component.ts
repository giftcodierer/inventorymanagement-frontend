import { Component } from "@angular/core";
import { RouterOutlet, RouterModule, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header.component";
import { FooterComponent } from "./footer.component";
import { AuthService } from "./services/auth.service";


@Component({
  selector: "app-root",
  standalone: true,
  imports: [
     CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
  ],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
