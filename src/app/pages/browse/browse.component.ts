import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieService } from '../../shared/services/movie/movie.service';
import { MovieCarouselComponent } from "../../shared/components/movie-carousel/movie-carousel.component";
import { IVideoContent } from '../../shared/models/video-content.interface';
import { forkJoin, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [HeaderComponent, BannerComponent, MovieCarouselComponent, CommonModule],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss'
})
export class BrowseComponent implements OnInit {

  authService = inject(AuthService);
  movieService = inject(MovieService);

  name = JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
  userProfileImg = JSON.parse(sessionStorage.getItem("loggedInUser")!).picture;
  email = JSON.parse(sessionStorage.getItem("loggedInUser")!).email;

  bannerDetails$ = new Observable<any>();

  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  rateMovies: IVideoContent[] = [];
  nowPlaying: IVideoContent[] = [];
  upComing: IVideoContent[] = [];
  popular: IVideoContent[] = [];
  topRated: IVideoContent[] = [];

  source = [
    this.movieService.getMovies(),
    // this.movieService.getTvShows(),
    // this.movieService.getRatedMovies(),
    this.movieService.getNowPlayingMovies(),
    this.movieService.getUpcomingMovies(),
    this.movieService.getPopularMovies(),
    this.movieService.getTopRated()
  ];

  ngOnInit(): void {
    forkJoin(this.source)
    .pipe(
      map(([movies, /*tvShows,*/ /*rateMovies,*/ nowPlaying, upComing, popular, topRated]) => {
        this.bannerDetails$ = this.movieService.getBannerDetail(movies.results[0].id);
        return {movies, /*tvShows,*/ /*rateMovies,*/ nowPlaying, upComing, popular, topRated}
    })
    ).subscribe((res:any) => {
      console.log(res)
      // this.movies = res.movies.results as IVideoContent[];
      // this.tvShows = res.tvShows.results as IVideoContent[];
      // this.rateMovies = res.rateMovies.results as IVideoContent[];
      this.nowPlaying = res.nowPlaying.results as IVideoContent[];
      this.upComing = res.upComing.results as IVideoContent[];
      this.popular = res.popular.results as IVideoContent[];
      this.topRated =  res.topRated.results as IVideoContent[];
    })
  }

  singOut() {
    sessionStorage.removeItem("loggedInUser")
    this.authService.signOut();
  }
}
