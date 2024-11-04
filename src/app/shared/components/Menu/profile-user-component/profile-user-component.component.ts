import { Component, OnInit , Input} from '@angular/core';
import { AuthServiceService } from '../../../../auth/services/auth-service.service';

@Component({
  selector: 'app-profile-user-component',
  templateUrl: './profile-user-component.component.html',
  styleUrl: './profile-user-component.component.css'
})
export class ProfileUserComponentComponent {
    @Input() userName:string | null = '';
    @Input() role :string  | null= '';

  constructor(private authService: AuthServiceService) { }
/*
  ngOnInit(): void {
    this.userName = this.authService.getUsername();
    if (this.authService.isAdmin()) {
      this.role = "admin";
    } else if (this.authService.isUser()) {
      this.role = "user"
    }
  }

*/

}
