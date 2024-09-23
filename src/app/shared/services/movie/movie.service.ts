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
    Authorization: 'Bearer Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjIzMGQyZTE1ODIyYThhMjdmZWQwYWExYjYxYjZjNyIsIm5iZiI6MTcyNzExNDE4NS45NjI4NjQsInN1YiI6IjY2ZWIxZjU4YjY2NzQ2ZGQ3OTBiNDA2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RHLRq9FO_IQ7JiVHlOP0lOvwauJT4gYmblBkOVLRsKo'
  }
}
// API KEY = 5f230d2e15822a8a27fed0aa1b61b6c7
@Injectable({
  providedIn: 'root'
})

export class MovieService {

  http = inject(HttpClient);
  url = 'https://api.themoviedb.org/3';

  getMovies() {
    return this.http.get<any>(`${this.url}/discover/movie`, options);
  }

  getTvShows() {
    return this.http.get(`${this.url}/discover/tv`, options)
  }

  getRatedMovies() {
    return this.http.get(`${this.url}/guest_session/guest_session_id/rated/movies`, options)
  }

  getBannerImage(id: number) {
    return this.http.get(`${this.url}/movie/${id}/images`, options)
  }

  getBannerVideo(id: number) {
    return this.http.get(`${this.url}/movie/${id}/videos`, options);
  }

  getBannerDetail(id: number) {
    return this.http.get(`${this.url}/movie/${id}`, options);
  }

  getNowPlayingMovies() {
    return this.http.get(`${this.url}/movie/now_playing`, options)
  }

  getPopularMovies() {
    return this.http.get(`${this.url}/movie/popular`, options)
  }

  getTopRated() {
    return this.http.get(`${this.url}/movie/top_rated`, options)
  }

  getUpcomingMovies() {
    return this.http.get(`${this.url}/movie/upcoming`, options)
  }
}
