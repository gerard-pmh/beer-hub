import { Component } from '@angular/core';
import { BarProvider } from '../../providers/bar-provider';
import { Coordinates } from '../../models/coordinates';
import { Beer } from '../../models/beer';
import { Bar } from '../../models/bar';



// A extraire du GPS
let coords = new Coordinates(48.85, 2.35);
// A configurer en m par l'utilisateur
let size = 0.05;



@Component({
  templateUrl: 'home.html'
})
export class HomePage {

  public beer: Beer = new Beer('');
  public bars: Bar[] = [];
  public loading: boolean = false;

  constructor(
      private barProvider: BarProvider
  ) { }

  onInput() {
    if (this.beer.name.length > 2) {
      this.loading = true;
      this.barProvider.getBars(coords, size, [this.beer]).subscribe(bars => {
        this.bars = bars;
        this.loading = false;
      });
    }
  }

}
