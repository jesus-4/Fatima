import { Component, inject, OnInit, signal, ElementRef, ViewChild } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { HttpClient } from '@angular/common/http';
import { ContentData, ContentItem } from '../../shared/navbar/model/model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface FloatingHeart {
  id: number;
  x: number;
  duration: number;
}

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, CommonModule],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  // @ViewChild('audioRef') audioRef!: ElementRef<HTMLAudioElement>;
  songs = [
    {
      title: 'Beautiful Things',
      src: 'assets/music/Benson Boone - Beautiful Things.mp3'
    },
    {
      title: 'On Melancholy Hill',
      src: 'assets/music/Gorillaz - On Melancholy Hill.mp3'
    },
    {
      title: 'Limon Y Sal',
      src: 'assets/music/Julieta Venegas - Limon Y Sal.mp3'
    },
    {
      title: 'Si Tu Me Quisieras ',
      src: 'assets/music/Mon Laferte - Si Tu Me Quisieras .mp3'
    },
    {
      title: 'No Te Apartes De Mí.',
      src: 'assets/music/Vicentico Ft. Valeria Bertuccelli - No Te Apartes De Mí. - Rober Lizárraga.mp3'
    },
    {
      title: 'Si no estas.',
      src: 'assets/music/iñigo quintero - Si No Estás (Letra Oficial) - iñigo quintero.mp3'
    },
    {
      title: 'Te amo.',
      src: 'assets/music/todo va a estar muy muy bien porque te amo.mp3'
    }
  ];

  currentSongIndex: number | null = null;
  isPlaying = false;

  cardAbierta = false;
  private router = inject(Router);

  items = signal<ContentItem[]>([]);

  constructor(private http: HttpClient) {}

  ngOnInit() {

  this.setStartMessage();

  this.http
    .get<ContentData>('assets/data/content.json')
    .subscribe(data => this.items.set(data.items));
  }

  started = false;

  startExperience(answer: boolean) {
    this.started = true;
    this.playSongSegment(5, 133, 50);
  }




  getCarouselTransform(index: number, total: number): string {
    const angle = 360 / total;
    return `rotateY(${index * angle}deg) translateZ(var(--radio))`;
  }
  cardAbiertaId: number | null = null;

  toggleCard(id: number) {
    this.cardAbiertaId = this.cardAbiertaId === id ? null : id;
  }


  floatingHearts = signal<FloatingHeart[]>([]);
  private heartId = 0;

  explodeHearts() {
    const amount = 25;

    const newHearts: FloatingHeart[] = Array.from({ length: amount }).map(() => ({
      id: this.heartId++,
      x: Math.random() * 100,
      duration: 2000 + Math.random() * 2000
    }));

    this.floatingHearts.update(h => [...h, ...newHearts]);

    // limpiar después de la animación
    setTimeout(() => {
      this.floatingHearts.set([]);
    }, 4500);
  }

  @ViewChild('audioRef', { static: true })
  audioRef!: ElementRef<HTMLAudioElement>;

  playSong(index: number) {
    const audio = this.audioRef.nativeElement;

    // misma canción → play / pause
    if (this.currentSongIndex === index) {
      if (this.isPlaying) {
        audio.pause();
        this.isPlaying = false;
      } else {
        audio.play();
        this.isPlaying = true;
      }
      return;
    }

    // canción distinta
    this.currentSongIndex = index;
    audio.src = this.songs[index].src;
    audio.load();
    audio.play();
    this.isPlaying = true;
  }

  pauseSong() {
    this.audioRef.nativeElement.pause();
    this.isPlaying = false;
  }

playSongSegment(index: number, startAt: number, duration: number) {
  const audio = this.audioRef.nativeElement;

  this.currentSongIndex = index;
  audio.src = this.songs[index].src;
  audio.load();

  audio.onloadedmetadata = () => {
    audio.currentTime = startAt; // segundo donde empieza
    audio.play();
    this.isPlaying = true;

    // detener luego de X segundos
    setTimeout(() => {
      audio.pause();
      this.isPlaying = false;
    }, duration * 1000);
  };
}

//flork
loveOpen = false;

toggleLoveCard() {
  this.loveOpen = !this.loveOpen;
}


startMessage = '';


setStartMessage() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // Enero = 0

  // 16 de junio → aniversario
  if (day === 16 && month === 6) {
    this.startMessage = '💍 Feliz aniversario, amor de mi vida 💖\n\n' +
    'No estas sola, no tenes que sentirte sola, ni hacer las cosas sola si no queres, yo siempre voy a estar aunque no sea la mejor opcion. Nunca te voy a negar mi ayuda y mi presencia.'+'\n\n sueño con un futuro con vos \n uno lleno de sonrisas y risas \n bailando en la cocina \n cantando en la ruta \n viviendo la vida juntos \n\n te amo con todo mi ser';
    return;
  }

  // 16 de cualquier mes → cumple mes
  if (day === 16) {
    this.startMessage = '💞 Feliz cumple mes mi amor 💞 \n\n' +
    'No estas sola, no tenes que sentirte sola, ni hacer las cosas sola si no queres, yo siempre voy a estar aunque no sea la mejor opcion. Nunca te voy a negar mi ayuda y mi presencia.'+'\n\n sueño con un futuro con vos \n uno lleno de sonrisas y risas \n bailando en la cocina \n cantando en la ruta \n viviendo la vida juntos \n\n te amo con todo mi ser';
    return;
  }

  // mensaje normal cualquier otro día
  this.startMessage =
    'Te extraño mucho todo el tiempo, me muero por verte :( \n\n' +
    'No estas sola, no tenes que sentirte sola, ni hacer las cosas sola si no queres, yo siempre voy a estar aunque no sea la mejor opcion. Nunca te voy a negar mi ayuda y mi presencia.'+'\n\n sueño con un futuro con vos \n uno lleno de sonrisas y risas \n bailando en la cocina \n cantando en la ruta \n viviendo la vida juntos \n\n te amo con todo mi ser';
}


}
