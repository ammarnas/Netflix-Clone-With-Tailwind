import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

const options = {
  params: {
    include_adults: 'false',
    include_videos: 'false',
    language: 'en-US',
    page: '1',
    sort_by: 'popularity.desc'
  },
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjIzMGQyZTE1ODIyYThhMjdmZWQwYWExYjYxYjZjNyIsIm5iZiI6MTcyNjg5NjU3NS4xMDQxODYsInN1YiI6IjY2ZWIxZjU4YjY2NzQ2ZGQ3OTBiNDA2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.80d54sjXmXiK-0iCudEalBmQGH1eWbQ1pC_hU6Fzct8 '
  }
}
// API KEY = 5f230d2e15822a8a27fed0aa1b61b6c7
@Injectable({
  providedIn: 'root'
})

export class MovieService {

  http = inject(HttpClient);
  url = 'https://api.themoviedb.org/3/discover/movie';

  getMovies() {
    return this.http.get<any>(this.url, options);
  }
}
