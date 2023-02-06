import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private _url: string = 'https://pokeapi.co/api/v2/';
  private _pokemon: string = 'pokemon';
  
  constructor(
    private _http: HttpClient 
    ) { }

    get apiListAllPokemons():Observable<any>{
      return this._http.get<any>(`${this._url}${this._pokemon}?offset=0&limit=151`)
        .pipe(
          tap( res => res),
          tap( res => {
            res.results.map( (resPokemons: any) => {

              this.apiGetPokemon(resPokemons.url).subscribe({
                next: (res => {
                  resPokemons.status = res;
                })
              })
            })
          })
        )
    }

    public apiGetPokemon(url: string):Observable<any>{
      
     return this._http.get<any>(url).pipe(
        map(
          res => res
        )
      )
    }
}


// salvar em session storage e depois disponibilizar pra aplicação. 

//para isso funcionar sem muita consulta na aplicação, tem que ser feito nesse arquivo. tanto o cache do request, quanto o get da api;