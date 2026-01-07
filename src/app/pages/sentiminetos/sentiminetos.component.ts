import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import {
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import { ContentData, ContentItem } from '../../shared/navbar/model/model';
import { HttpClient } from '@angular/common/http';

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


@Component({
  selector: 'app-sentiminetos',
  imports: [NavbarComponent],
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

      // 🔁 si sale de la pantalla, vuelve arriba
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
  items = signal<ContentItem[]>([]);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<ContentData>('assets/data/conten2.json')
      .subscribe(data => this.items.set(data.items));
  }

  // anillo
  showProposal = false;

  onRingTap() {
    this.showProposal = true;
  }

  closeProposal() {
    this.showProposal = false;
  }

accept() {
  this.showProposal = false;
  this.explodeHearts();
}

floatingHearts = signal<FloatingHeart[]>([]);
private heartId = 0;

explodeHearts() {
  const amount = 30;

  const newHearts: FloatingHeart[] = Array.from({ length: amount }).map(() => ({
    id: this.heartId++,
    x: Math.random() * 100,
    duration: 2000 + Math.random() * 2000
  }));

  this.floatingHearts.update(h => [...h, ...newHearts]);

  setTimeout(() => {
    this.floatingHearts.set([]);
  }, 4500);
}





}
