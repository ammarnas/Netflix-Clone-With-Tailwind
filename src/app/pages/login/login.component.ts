declare var google: any;
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  private router = inject(Router);

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '22632047741-hp6fqmual45k7t5cmlgdskpu55sng7pv.apps.googleusercontent.com',
      callback: (resp: any) =>{
        this.handleLogin(resp);
      }
});

  google.accounts.id.renderButton(document.getElementById("google-btn"), {
    theme: 'filled_blue',
    size: 'large',
    shape: 'rectangle',
    width: 350
  })
  }

  handleLogin(response: any){
    if(response){
      // decode token
      const payload = this.decodeToken(response.credential)
      // store in session
      sessionStorage.setItem("loggedInUser", JSON.stringify(payload));
      // redirect to home/browse
      this.router.navigate(['browse']);
    }
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]))
  }
}
