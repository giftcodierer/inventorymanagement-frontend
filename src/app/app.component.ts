import { Component } from "@angular/core";
import { RouterOutlet, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header.component";
import { FooterComponent } from "./footer.component";


@Component({
  selector: "app-root",
  standalone: true,
  imports: [
     CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
  ],

  template: `
    <app-header />
    <div class="content-page">
      <router-outlet />
    </div>
    <app-footer />
  `,
  styles: [
    `
      :host {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
      }
      .content-page {
        padding: 20px;
        flex-grow: 1;
      }
    `,
  ],
})
export class AppComponent {
  constructor() {}
}
