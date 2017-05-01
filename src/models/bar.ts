import { Beer } from './beer';

export class Bar {

  public name: string;
  public type: string;
  public beers: Beer[];

  constructor(opBar: OverpassBar) {
    this.name = opBar.tags.name;
    this.type = opBar.tags.amenity;
    this.beers = opBar.tags.brewery.split(';').map(beerName => new Beer(beerName));
  }

}

class OverpassBar {
  lat: number;
  lon: number;
  tags: OverpassTag;
}

class OverpassTag {
  amenity;
  brewery;
  name;
}
