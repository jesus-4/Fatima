import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import {
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import { ContentData, ContentItem } from '../../shared/navbar/model/model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Star {
  x: number;
  y: number;
  speed: number;
  size: number;
}

interface FloatingHeart {
  id: number;
  x: number;
  duration: number;
}

export interface DiarioEntry {
  fecha: string;
  titulo: string;
  texto: string;
  imagenes?: string[];
}

interface DiarioEntryEnriquecida extends DiarioEntry {
  dia: number;
  diaSemana: string;
  dateObj: Date;
}

interface MesGrupo {
  mes: string;
  anio: number;
  items: DiarioEntryEnriquecida[];
}

@Component({
  selector: 'app-sentiminetos',
  imports: [NavbarComponent, CommonModule],
  standalone: true,
  templateUrl: './sentiminetos.component.html',
  styleUrl: './sentiminetos.component.css'
})
export class SentiminetosComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild('starsCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private stars: Star[] = [];
  private animationId!: number;
  private width = window.innerWidth;
  private height = window.innerHeight;

  // ── Canvas / estrellas ──────────────────────────────────────────

  ngAfterViewInit(): void {
    this.initCanvas();
    this.createStars(120);
    this.animate();
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.onResize);
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    canvas.width = this.width;
    canvas.height = this.height;
  }

  private createStars(count: number) {
    this.stars = Array.from({ length: count }).map(() => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.4 + 0.1
    }));
  }

  private animate = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (const star of this.stars) {
      star.y += star.speed;
      if (star.y > this.height) {
        star.y = 0;
        star.x = Math.random() * this.width;
      }
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.5 + 0.3})`;
      this.ctx.fill();
    }

    this.animationId = requestAnimationFrame(this.animate);
  };

  private onResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.initCanvas();
  };

  // ── HTTP ────────────────────────────────────────────────────────

  items = signal<ContentItem[]>([]);
  entries = signal<DiarioEntry[]>([]);
  
  constructor(private http: HttpClient) {}

  entradasAgrupadas: MesGrupo[] = [];

  ngOnInit() {
  this.http
    .get<ContentData>('assets/data/conten2.json')
    .subscribe(data => this.items.set(data.items));

  this.http
    .get<DiarioEntry[]>('assets/data/diario.json')
    .subscribe({
      next: data => {
        console.log('JSON cargado:', data);        // ¿llega algo?
        console.log('Es array:', Array.isArray(data)); // ¿es array?
        this.entries.set(data);
        this.entradasAgrupadas = this.calcularGrupos();
      },
      error: err => console.error('Error cargando JSON:', err) // ¿hay error?
    });
  }

  // ── Anillo ──────────────────────────────────────────────────────

  showProposal = false;
  onRingTap()    { this.showProposal = true; }
  closeProposal(){ this.showProposal = false; }

  accept() {
    this.showProposal = false;
    this.explodeHearts();
  }

  // ── Corazones flotantes ─────────────────────────────────────────

  floatingHearts = signal<FloatingHeart[]>([]);
  private heartId = 0;

  explodeHearts() {
    const newHearts: FloatingHeart[] = Array.from({ length: 30 }).map(() => ({
      id: this.heartId++,
      x: Math.random() * 100,
      duration: 2000 + Math.random() * 2000
    }));
    this.floatingHearts.update(h => [...h, ...newHearts]);
    setTimeout(() => this.floatingHearts.set([]), 4500);
  }

  // ── Diario ──────────────────────────────────────────────────────

  private calcularGrupos(): MesGrupo[] {
    const entries = this.entries();
    const grupos = new Map<string, MesGrupo>();

    for (const entry of entries) {
    const limpia = entry.fecha.replace(/\bde\b/gi, '').replace(/\s+/g, ' ').trim();
    const partes = limpia.split(' ');
    const dia    = parseInt(partes[0]);
    const mesStr = partes[1]?.toLowerCase();
    const anio   = parseInt(partes[2]);
    const mes    = this.MESES.indexOf(mesStr);

    if (isNaN(dia) || isNaN(anio) || mes === -1) {
      console.warn(`Fecha inválida: "${entry.fecha}"`);
      continue;
    }

    const dateObj = new Date(anio, mes, dia);
    const key     = `${anio}-${String(mes).padStart(2, '0')}`;

    if (!grupos.has(key)) {
      grupos.set(key, { mes: this.MESES[mes], anio, items: [] });
    }

    grupos.get(key)!.items.push({
      ...entry,
      dia,
      diaSemana: this.DIAS_SEMANA[dateObj.getDay()],
      dateObj
    });
  }

  return [...grupos.values()].sort((a, b) => {
    const ka = `${a.anio}-${String(this.MESES.indexOf(a.mes)).padStart(2, '0')}`;
    const kb = `${b.anio}-${String(this.MESES.indexOf(b.mes)).padStart(2, '0')}`;
    return ka.localeCompare(kb);
  });
}


  private readonly MESES = [
    'enero','febrero','marzo','abril','mayo','junio',
    'julio','agosto','septiembre','octubre','noviembre','diciembre'
  ];

  private readonly DIAS_SEMANA = [
    'domingo','lunes','martes','miércoles','jueves','viernes','sábado'
  ];

  entradaAbierta: DiarioEntry | null = null;

  abrirModal(entry: DiarioEntry) { this.entradaAbierta = entry; }
  cerrarModal()                   { this.entradaAbierta = null; }

get entradosPorMes(): MesGrupo[] {
  const grupos = new Map<string, MesGrupo>();

  for (const entry of this.entries()) {
    // Eliminar "de" y espacios extra, dejar solo "dia mes anio"
    const limpia = entry.fecha.replace(/\bde\b/gi, '').replace(/\s+/g, ' ').trim();
    const partes = limpia.split(' ');
    const dia    = parseInt(partes[0]);
    const mesStr = partes[1]?.toLowerCase();
    const anio   = parseInt(partes[2]);
    const mes    = this.MESES.indexOf(mesStr);

    if (isNaN(dia) || isNaN(anio) || mes === -1) {
      console.warn(`Fecha inválida: "${entry.fecha}"`);
      continue;
    }

    const dateObj = new Date(anio, mes, dia);
    const key     = `${anio}-${String(mes).padStart(2, '0')}`;

    if (!grupos.has(key)) {
      grupos.set(key, { mes: this.MESES[mes], anio, items: [] });
    }

    grupos.get(key)!.items.push({
      ...entry,
      dia,
      diaSemana: this.DIAS_SEMANA[dateObj.getDay()],
      dateObj
    });
  }

  return [...grupos.values()].sort((a, b) => {
    const ka = `${a.anio}-${String(this.MESES.indexOf(a.mes)).padStart(2, '0')}`;
    const kb = `${b.anio}-${String(this.MESES.indexOf(b.mes)).padStart(2, '0')}`;
    return ka.localeCompare(kb);
  });
}
}
