import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-abeja',
  imports: [],
  standalone: true,
  templateUrl: './abeja.component.html',
  styleUrl: './abeja.component.css'
})
export class AbejaComponent {
  @Input() scale = 0.35;
  @Input() x = 50;   // porcentaje horizontal
  @Input() y = 50;   // porcentaje vertical
  @Input() orbit = false;

  smallBees = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5
  }));

}
