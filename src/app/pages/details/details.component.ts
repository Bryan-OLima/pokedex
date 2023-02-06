import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';

  public pokemon: any;

  public isLoading: boolean = false;
  public isApiError: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _pokeService: PokeApiService
  ) {
  }

  ngOnInit(): void {  
    this.getPokemon();
  }

 getPokemon(){
    const id = this._activatedRoute.snapshot.params['id'];
    const pokemon = this._pokeService.apiGetPokemon(`${this.urlPokemon}/${id}`);
    const name = this._pokeService.apiGetPokemon(`${this.urlName}/${id}`);

    return forkJoin([pokemon, name]).subscribe({
      next: (
        res => {
          this.pokemon = res;
          this.isLoading = true;
        }
      ),

      error: () => {
        this.isApiError = true;
      }
    })
  }
}
