import { Component, signal, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import emailjs from '@emailjs/browser';

interface Game {
  id: number;
  name: string;
  image: string;
}

@Component({
  selector: 'app-propuestas',
  imports: [NavbarComponent, CommonModule],
  standalone: true,
  templateUrl: './propuestas.component.html',
  styleUrl: './propuestas.component.css'
})
export class PropuestasComponent implements OnInit {
  selectedGame = signal<Game | null>(null);
  sending = signal(false);
  sent = signal(false);
  games = signal<Game[]>([]);

  private SERVICE_ID  = 'service_net2f6c';
  private TEMPLATE_ID = 'template_jwil0ik';
  private PUBLIC_KEY  = 'aDgng_xGswHLklBrw';

  constructor(private http: HttpClient) {
    emailjs.init(this.PUBLIC_KEY);
  }

  ngOnInit() {
    this.http.get<Game[]>('assets/data/games.json')
      .subscribe(data => this.games.set(data));
  }

  selectGame(game: Game) {
    this.selectedGame.set(game);
  }

  async sendEmail() {
    const game = this.selectedGame();
    if (!game) return;

    this.sending.set(true);

    try {
      await emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, {
        to_email: 'claramontejesus@gmail.com',
        game_name: game.name,
        message: `Me gustaría jugar a ${game.name}`,
            });
      this.sent.set(true);
    } catch (err) {
      console.error('Error al enviar mail:', err);
      alert('Hubo un error al enviar. Intentá de nuevo.');
    } finally {
      this.sending.set(false);
    }
  }
}
