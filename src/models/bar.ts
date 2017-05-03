import { getDistanceSimple } from 'geolib';
import { Coordinates } from './coordinates';
import { OverpassBar } from './overpass-bar';
import { Beer } from './beer';

export class Bar {

  public name: string;
  public type: string;
  public coords: Coordinates;
  public distance: number;
  public beers: Beer[];

  constructor(opBar: OverpassBar, refCoords: Coordinates) {
    this.name = opBar.tags.name;
    this.type = opBar.tags.amenity;
    switch(opBar.tags.amenity) {
      case 'bar':
        this.type = 'bar';
        break;
      case 'pub':
        this.type = 'pub';
        break;
      case 'cafe':
        this.type = 'café';
        break;
      case 'restaurant':
        this.type = 'restaurant';
        break;
      default:
        this.type = '';
        break;
    }
    this.beers = opBar.tags.brewery.split(';').map(beerName => new Beer(beerName));
    this.coords = new Coordinates(opBar.lat, opBar.lon);
    this.distance = getDistanceSimple(refCoords, this.coords, 1);
  }

}
