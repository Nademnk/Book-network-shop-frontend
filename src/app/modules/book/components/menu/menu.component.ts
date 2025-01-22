import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {
    // Ensure this logic only runs in the browser
    if (isPlatformBrowser(this.platformId)) {
      const linkColor = document.querySelectorAll('.nav-link');
      linkColor.forEach((link) => {
        const href = link.getAttribute('href') || '';
        if (window.location.href.endsWith(href)) {
          link.classList.add('active');
        }
        link.addEventListener('click', () => {
          linkColor.forEach((l) => l.classList.remove('active'));
          link.classList.add('active');
        });
      });
    }
  }

  logout(){
      localStorage.removeItem('token');
      window.location.reload();
  }
}
