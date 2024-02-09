import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Show, SearchResultShow } from './types';

// Should be on server's DB, here for POC purposes  
const keyLocalStorage = 'seriesAppTechTest';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(private http: HttpClient) { }

  // There was no search by genre in the API itself, so I had to do this
  private makeUniqueGenres(shows: Show[]): string[] {
    let genres = new Array<string>;
    for(let i = 0; i < shows.length; i++) {      
      for (let j = 0; j < shows[i].genres.length; j++) {
        if (!genres.includes(shows[i].genres[j])) {
          genres.push(shows[i].genres[j]);
        }
      }
    }
    return genres;
  }

  private sanitizeQueryResults(results: SearchResultShow[]): Show[] {
    let returnShows: Show[] = [];
    results.forEach(showResult => {
      returnShows.push(showResult.show);
    });
    return returnShows;
  }

  private getSeriesByPage(page: number =  0): Observable<Show[]> {
    const url = (page === 0) ? environment.baseUrl : `${environment.baseUrl}?page=${page}`;
    return this.http.get<Show[]>(url);
  }

  private getSeriesByQuery(term: string): Observable<SearchResultShow[]> {
    return this.http.get<SearchResultShow[]>(`${environment.baseSearchUrl}?q=${term}`);
  }
  
  getSeriesBySearchTerm(term: string): Observable<{ shows: Show[], genres: string[] }> {
    return new Observable(observer => {
      let shows: Show[];
      let genres: string[];

      this.getSeriesByQuery(term).subscribe((apiResponse) => {
        shows = this.sanitizeQueryResults(apiResponse);
        genres = this.makeUniqueGenres(shows);
        observer.next({ shows, genres });
        observer.complete();
    });
    });
  }

  getSeriesByGenre(page: number =  0): Observable<{ shows: Show[], genres: string[] }> {
    return new Observable(observer => {
      let shows: Show[];
      let genres: string[];

      this.getSeriesByPage(page).subscribe((apiResponse) => {
          shows = apiResponse;
          genres = this.makeUniqueGenres(shows);
          observer.next({ shows, genres });
          observer.complete();
      });
  });
  }

  getSeriesDetails(id: number): Observable<Show> {
    return this.http.get<Show>(`${environment.baseUrl}/${id}`);
  }

  getFavorites(): Show[] {
    return JSON.parse(localStorage.getItem(keyLocalStorage) || '[]') as Show[];
  }

  // This is POC on localStorage
  addSeriesFavorites(show: Show): boolean {
    const favs = JSON.parse(localStorage.getItem(keyLocalStorage) || '[]') as Show[];
    let isAdded = false;
    favs.forEach(favorite => {
      if(favorite.id === show.id) {
        isAdded = true;
        return;
      }
    });
    if(!isAdded) {
      favs.push(show);
      localStorage.setItem(keyLocalStorage, JSON.stringify(favs));
      return true;
    } else {
      return false;
    }
  }

  deleteSeriesFavorites(id: number) {
    const favs = JSON.parse(localStorage.getItem(keyLocalStorage) || '[]') as Show[];    
    let tmpShows: Show[] = [];
    favs.forEach(favorite => {
      if(favorite.id !== id) {
        tmpShows.push(favorite);
      }
    });
    localStorage.setItem(keyLocalStorage, JSON.stringify(tmpShows));
  }

  // Favorites should be on server's DB, here for POC purposes.
  // Also, this implementation requires unlimited REST API access.
  // Did not want to get banned from the public API. :-D
  // Left here for show, POC implementation is below

  /* getFavorites(): Observable<Show[]> {
    const ids = this.getSeriesFavorites();    
    const observables = ids.map(id => this.getSeriesDetails(id));
    
    return forkJoin(observables).pipe(      
      map((shows: Show[]) => {        
        return shows;
      })
    );
  } 

  getSeriesFavorites(): number[] {
    return JSON.parse(localStorage.getItem(keyLocalStorage) || '[]');
  }

  addSeriesFavorites(id: number) {
    const favs = JSON.parse(localStorage.getItem(keyLocalStorage) || '[]');
    favs.push(id);
    localStorage.setItem(keyLocalStorage, JSON.stringify(favs));
  } */





}
