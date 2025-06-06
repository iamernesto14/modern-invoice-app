// theme.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private theme: string = 'light-mode';

  constructor() {
    // Load theme from localStorage or default to light-mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.theme = savedTheme;
      this.applyTheme(savedTheme);
    } else {
      this.applyTheme(this.theme);
    }
  }

  getTheme(): string {
    return this.theme;
  }

  toggleTheme(): void {
    this.theme = this.theme === 'light-mode' ? 'dark-mode' : 'light-mode';
    this.applyTheme(this.theme);
    localStorage.setItem('theme', this.theme);
  }

  // Public method to apply the current theme
  setTheme(theme: string): void {
    this.theme = theme;
    this.applyTheme(theme);
    localStorage.setItem('theme', theme);
  }

  private applyTheme(theme: string): void {
    document.documentElement.classList.remove('light-mode', 'dark-mode');
    document.documentElement.classList.add(theme);
  }
}