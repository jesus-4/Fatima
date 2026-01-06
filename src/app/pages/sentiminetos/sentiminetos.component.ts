import { Component, OnDestroy } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import {
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';

interface Star {
  x: number;
  y: number;
  speed: number;
  size: number;
}


@Component({
  selector: 'app-sentiminetos',
  imports: [NavbarComponent],
  standalone: true,
  templateUrl: './sentiminetos.component.html',
  styleUrl: './sentiminetos.component.css'
})
export class SentiminetosComponent implements AfterViewInit, OnDestroy {

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
}
