import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Coordinates } from '../models/coordinates';
import { OverpassBar } from '../models/overpass-bar';
import { Bar } from '../models/bar';
import { Beer } from '../models/beer';

@Injectable()
export class BarProvider {

  private overpassUrl = 'http://overpass-api.de/api/interpreter?data=[out:json]';

  constructor(public http: Http) { }

  public getBars(coords: Coordinates, size: number, beers: Beer[]): Observable<Bar[]> {
    let url = `${this.overpassUrl};node(${coords.printBox(size)})`;
    beers.forEach(beer => {
      let capitalizedBeerName = beer.name.charAt(0).toUpperCase() + beer.name.slice(1).toLowerCase();
      url += `['brewery'~'${capitalizedBeerName}']`;
    });
    url += ';out;';
    return this.http.get(url)
      .map(this.getBarExtractor(coords))
      .catch(this.handleError);
  }


  private getBarExtractor(coords: Coordinates): (Response) => Bar[] {
    return (res: Response) => {
      let body = res.json();
      if (!body.elements) {
        return [];
      }
      return body.elements
        .map((el: OverpassBar) => new Bar(el, coords))
        .sort((a, b) => a.distance - b.distance);
    }
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

}
