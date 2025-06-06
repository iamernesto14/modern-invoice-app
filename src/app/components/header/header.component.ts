// header.component.ts
import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  currentTheme: string;

  constructor(private themeService: ThemeService) {
    this.currentTheme = this.themeService.getTheme();
  }

  ngOnInit() {
    // Use public setTheme method instead of private applyTheme
    this.themeService.setTheme(this.currentTheme);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.currentTheme = this.themeService.getTheme();
  }
}