import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  public isOpen: boolean = false;

  private filteredPokemons: any;
  private filteredPokemonsSession: any;
  private retrieveFilteredPokemons: any = sessionStorage.getItem('tempData');

  public allPokemons: any;
  public allPokemonsSession: any;
  public retrieveAllPokemons: any = sessionStorage.getItem('tempPoke');
  

  public test : any  = JSON.parse(this.retrieveAllPokemons);

  public pokeSearch: string = '';

  public isLoading: boolean = false;
  public isApiError: boolean = false;

  constructor(
    private _pokeApiService: PokeApiService
    ) { }

ngOnInit(): void {
  this._pokeApiService.apiListAllPokemons
    .subscribe({
      next: (
          (res:any) => { 
              this.filteredPokemons = res.results;
              this.allPokemons = this.filteredPokemons;
              this.isLoading = true;
              this.saveToSession(this.filteredPokemons, this.allPokemons);
          }
        ),
      error: () => {
        this.isApiError = true;
      }
    }); 

//   this.dataRefresh();
}

    getSearch(event: string) {
      const filter = this.filteredPokemons.filter( (res: any) => {
        return !res.name.indexOf(event.toLocaleLowerCase());
      })
      this.allPokemons = filter;
    }

    saveToSession(filtered: any, all:any) {
      sessionStorage.setItem('tempData', JSON.stringify(filtered));
      sessionStorage.setItem('tempPoke', JSON.stringify(all));
    }

    retrieveData(){
      this.filteredPokemonsSession = JSON.parse(this.retrieveFilteredPokemons);
      this.allPokemonsSession  = JSON.parse(this.retrieveAllPokemons);
    }
    dataRefresh(){
      if(this.retrieveFilteredPokemons && this.retrieveAllPokemons) {

        this.retrieveData();
        this.filteredPokemons = this.filteredPokemonsSession;

        this.allPokemons = this.filteredPokemons;

        this.isLoading = true;

      } else {
        this._pokeApiService.apiListAllPokemons
          .subscribe({
            next: (
                (res:any) => {
                    this.filteredPokemons = res.results;
                    this.allPokemons = this.filteredPokemons;
                    this.isLoading = true;
                    this.saveToSession(this.filteredPokemons, this.allPokemons);
                    console.log('pegou da api');
                }
              ),
            error: () => {
              this.isApiError = true;
            }
        }); 
      }
    }
    
}




// ngOnInit(): void {
//   this._pokeApiService.apiListAllPokemons
//     .subscribe({
//       next: (
//           (res:any) => { 
//               this.filteredPokemons = res.results;
//               this.allPokemons = this.filteredPokemons;
//               this.isLoading = true;
//               this.saveToSession(this.filteredPokemons, this.allPokemons);
//           }
//         ),
//       error: () => {
//         this.isApiError = true;
//       }
//     }); 

//   this.dataRefresh();
// }