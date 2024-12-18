import { Component, OnInit, Input } from '@angular/core';
import { AuthServiceService } from '../../../../auth/services/auth-service.service';

interface NavLink {
  label: string,
  path: string
}

@Component({
  selector: 'app-header',
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.css'
})

export class HeaderComponentComponent {
  @Input() userName: string | null = null;
  @Input() navLinks: NavLink[] = [];
  @Input() role :string | null = null;

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.userName = this.authService.getUsername();
    this.role = this.authService.getRole()
  }


  showMobileMenu = false;

  toggleMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  isActive(link: any) {
    // Lógica para resaltar el enlace activo
    return window.location.pathname === link.path;
  }


}

