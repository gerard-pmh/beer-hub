import { Component } from '@angular/core';
import { BarProvider } from '../../providers/bar-provider';
import { Beer } from '../../models/beer';
import { Bar } from '../../models/bar';



// A extraire du GPS
let coords = {
  latitude: 48.85,
  longitude: 2.35
}
// A configurer en m par l'utilisateur
let size = 0.05;



@Component({
  templateUrl: 'home.html'
})
export class HomePage {

  public beer: Beer;
  public bars: Bar[] = [];

  constructor(
      private barProvider: BarProvider
  ) {
    this.beer = new Beer('');
  }

  onInput() {
    this.barProvider.getBars(coords, size, [this.beer]).subscribe(bars => {
      this.bars = bars;
    })
  }

}
