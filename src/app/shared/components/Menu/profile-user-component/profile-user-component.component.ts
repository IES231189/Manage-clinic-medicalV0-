import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../../auth/services/auth-service.service';

@Component({
  selector: 'app-profile-user-component',
  templateUrl: './profile-user-component.component.html',
  styleUrls: ['./profile-user-component.component.css']
})
export class ProfileUserComponentComponent implements OnInit {
  userName: string | null = null;
  role: string | null = null;

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    // Obtén el nombre de usuario y rol desde el servicio
    this.userName = this.authService.getUsername();
    this.role = this.authService.getRole();
  }
}

