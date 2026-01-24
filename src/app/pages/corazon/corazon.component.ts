import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, NgZone   } from '@angular/core';

@Component({
  selector: 'app-corazon',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './corazon.component.html',
  styleUrl: './corazon.component.css'
})
export class CorazonComponent implements AfterViewInit {

  items = Array.from({ length: 40 }).map((_, i) => i);

  private startTime = performance.now();

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.animate();
  }

  animate() {
    this.ngZone.runOutsideAngular(() => {
      const words = document.querySelectorAll('.love-word');

      const now = performance.now();
      const elapsed = (now - this.startTime) / 1000 * 0.3; // sec

      words.forEach((el: any, i) => {
        const phase = (i / words.length) * Math.PI * 2;
        const t = elapsed + phase;

        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t)
                  - 5 * Math.cos(2*t)
                  - 2 * Math.cos(3*t)
                  - Math.cos(4*t);

        el.style.transform = `
          translate(calc(50vw + ${x * 8}px),
                    calc(40vh - ${y * 8}px))
        `;
      });

      requestAnimationFrame(() => this.animate());
    });
  }
}
