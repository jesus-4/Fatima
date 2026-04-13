import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser = signal<User | null>(null);
  
  constructor(private router: Router) {
    const stored = localStorage.getItem('user');
    if (stored) {
      this.currentUser.set(JSON.parse(stored));
    }
  }

  user = this.currentUser.asReadonly();

  login(userId: string, password: string): boolean {
    const validUsers: Record<string, { passwords: string[], user: User }> = {
      'F': { 
        passwords: ['legend', 'Heat waves'], 
        user: { id: 'F', name: 'F' } 
      },
      'J': { 
        passwords: ['en otra vida'], 
        user: { id: 'J', name: 'J' } 
      }
    };

    const config = validUsers[userId];
    if (config && config.passwords.map(p => p.toLowerCase()).includes(password.toLowerCase())) {
      localStorage.setItem('user', JSON.stringify(config.user));
      this.currentUser.set(config.user);
      this.router.navigate(['/home']);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }
}