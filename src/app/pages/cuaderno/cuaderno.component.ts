import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { trigger, transition, style, animate, query, group } from '@angular/animations';
import { FloresComponent } from '../flores/flores.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
export interface CuadernoEntry {
  foto: string;
  texto: string;
}

@Component({
  selector: 'app-cuaderno',
  standalone: true,
  imports: [CommonModule, FloresComponent, NavbarComponent],
  templateUrl: './cuaderno.component.html',
  styleUrl: './cuaderno.component.css',
  animations: [
    trigger('slideAnim', [
      transition(':increment', [
        group([
          query(':enter', [
            style({ transform: 'translateX(100%)', opacity: 0 }),
            animate('400ms cubic-bezier(0.4,0,0.2,1)',
              style({ transform: 'translateX(0)', opacity: 1 }))
          ], { optional: true }),
          query(':leave', [
            animate('400ms cubic-bezier(0.4,0,0.2,1)',
              style({ transform: 'translateX(-100%)', opacity: 0 }))
          ], { optional: true })
        ])
      ]),
      transition(':decrement', [
        group([
          query(':enter', [
            style({ transform: 'translateX(-100%)', opacity: 0 }),
            animate('400ms cubic-bezier(0.4,0,0.2,1)',
              style({ transform: 'translateX(0)', opacity: 1 }))
          ], { optional: true }),
          query(':leave', [
            animate('400ms cubic-bezier(0.4,0,0.2,1)',
              style({ transform: 'translateX(100%)', opacity: 0 }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class CuadernoComponent {
  entries = signal<CuadernoEntry[]>([]);
  paginaActual = signal(0);

  constructor(private http: HttpClient) {
    this.http.get<CuadernoEntry[]>('assets/data/cuaderno.json')
      .subscribe({
        next: data => this.entries.set(data),
        error: err => console.error('Error cargando cuaderno.json:', err)
      });
  }

  get entradaActual(): CuadernoEntry | null {
    const e = this.entries();
    return e.length ? e[this.paginaActual()] : null;
  }

  // convierte \n en <br> para mostrar bien en el HTML
  formatearTexto(texto: string): string {
    return texto
      .split('\n\n')
      .map(parrafo => `<p>${parrafo.replace(/\n/g, '<br>')}</p>`)
      .join('');
  }

  get total(): number { return this.entries().length; }
  get actual(): number { return this.paginaActual(); }

  siguiente() {
    if (this.paginaActual() < this.total - 1)
      this.paginaActual.update(p => p + 1);
  }

  anterior() {
    if (this.paginaActual() > 0)
      this.paginaActual.update(p => p - 1);
  }

  tieneImagen(entry: CuadernoEntry): boolean {
    return !!(entry.foto && entry.foto.trim() !== '');
  }

  @HostListener('window:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') this.siguiente();
    if (e.key === 'ArrowLeft') this.anterior();
  }
}