import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieService } from '../../shared/services/movie/movie.service';
import { MovieCarouselComponent } from "../../shared/components/movie-carousel/movie-carousel.component";

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [HeaderComponent, BannerComponent, MovieCarouselComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss'
})
export class BrowseComponent implements OnInit {

  authService = inject(AuthService);
  movieService = inject(MovieService);

  name = JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
  userProfileImg = JSON.parse(sessionStorage.getItem("loggedInUser")!).picture;
  email = JSON.parse(sessionStorage.getItem("loggedInUser")!).email;

  ngOnInit(): void {
    this.movieService.getMovies()
      .subscribe(res => {
        console.log(res);
      })
  }

  singOut() {
    sessionStorage.removeItem("loggedInUser")
    this.authService.signOut();
  }
}
