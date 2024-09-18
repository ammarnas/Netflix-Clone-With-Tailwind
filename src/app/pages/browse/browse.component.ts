import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss'
})
export class BrowseComponent {
  authService = inject(AuthService);
  name = JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
  userProfileImg = JSON.parse(sessionStorage.getItem("loggedInUser")!).picture;
  email = JSON.parse(sessionStorage.getItem("loggedInUser")!).email;
  singOut() {
    sessionStorage.removeItem("loggedInUser")
    this.authService.signOut();
  }
}
