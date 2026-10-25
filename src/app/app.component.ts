import { Component } from '@angular/core';
import { ReceptaLlistaComponent } from './components/recepta-llista/recepta-llista.component';

@Component({
  selector: 'app-root',
  imports: [ReceptaLlistaComponent],
  template: `<app-recepta-llista></app-recepta-llista>`,
  styleUrl: './app.component.scss'
})
export class App {
  title = 'ioc-angular-receptari';
}

