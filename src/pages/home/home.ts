import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { BarProvider } from '../../providers/bar-provider';
import { Coordinates } from '../../models/coordinates';
import { Beer } from '../../models/beer';
import { Bar } from '../../models/bar';



// A configurer en m par l'utilisateur
let size = 0.01;



@Component({
  templateUrl: 'home.html'
})
export class HomePage {

  public beer: Beer = new Beer('');
  public bars: Bar[] = [];
  public loading: boolean = false;

  constructor(
    private geolocation: Geolocation,
    private barProvider: BarProvider
  ) { }

  onInput() {
    if (this.beer.name.length > 2) {
      this.loading = true;
      this.geolocation.getCurrentPosition().then(res => {
        this.barProvider.getBars(
          new Coordinates(res.coords.latitude, res.coords.longitude),
          size,
          [this.beer]
        ).subscribe(bars => {
          this.bars = bars;
          this.loading = false;
        });
      }).catch(error => {
        this.loading = false;
        // alerte toast sur le GPS
      });
    }
  }

}
