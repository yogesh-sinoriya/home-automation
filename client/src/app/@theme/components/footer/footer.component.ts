import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created with ♥ by <b><a href="https://github.com/yogesh-sinoriya" target="_blank">Yogesh Sinoriya</a></b>
    </span>
    <div class="socials">
      <a href="https://github.com/yogesh-sinoriya" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.linkedin.com/in/yogeshsinoriya/" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
