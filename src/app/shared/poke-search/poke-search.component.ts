import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'poke-search',
  templateUrl: './poke-search.component.html',
  styleUrls: ['./poke-search.component.scss']
})
export class PokeSearchComponent {

  @Output() emitSearch: EventEmitter<any> = new EventEmitter();

  pokeSearch(value: string) {
    value.trim();
    this.emitSearch.emit(value);
  }
}
