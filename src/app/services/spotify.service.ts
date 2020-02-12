import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Spotify service listo');

  }


  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQDtNcpHp3twlELqKS39cHbey8IzHesTos7twTL4qr4yre8HsLcxFI8nmSm0m6u_WpIwWhfiuIGHvmFH4xo'
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {

    return this.getQuery('browse/new-releases')
      .pipe(map(data => {
        return data['albums'].items;
      }));
  }



  getArtists(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&market=US&limit=15`)
      .pipe(map(data => {
        return data['artists'].items;
      }));
  }

  getArtist(id: string) {
    return this.getQuery(`artists/${id}`)
      /* .pipe(map(data => {
        return data['artists'].items;
      })) */;
  }


  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
      .pipe(map(data => {
        return data['tracks'];
      }));
  }
}