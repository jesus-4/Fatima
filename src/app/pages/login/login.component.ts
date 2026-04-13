import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  expandedUser = signal<string | null>(null);
  password = signal('');
  showHelp = signal(false);
  error = signal('');

  constructor(private auth: AuthService, private router: Router) {}

  toggleUser(user: string) {
    if (this.expandedUser() === user) {
      this.expandedUser.set(null);
    } else {
      this.expandedUser.set(user);
      this.password.set('');
      this.error.set('');
    }
  }

  login(user: string) {
    if (this.auth.login(user, this.password())) {
      // Login exitoso - redirect happens in service
    } else {
      this.error.set('Contraseña incorrecta');
    }
  }

  toggleHelp() {
    this.showHelp.update(v => !v);
  }
}