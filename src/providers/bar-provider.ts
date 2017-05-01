import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Beer } from '../models/beer';
import { Bar } from '../models/bar';

@Injectable()
export class BarProvider {

  private overpassUrl = 'http://overpass-api.de/api/interpreter?data=[out:json]';

  constructor(public http: Http) { }

  public getBars(localization, size, beers: Beer[]): Observable<Bar[]> {
    let box = this.getBox(localization, size);
    let url = `${this.overpassUrl};node(${box})`;
    beers.forEach(beer => {
      let capitalizedBeerName = beer.name.charAt(0).toUpperCase() + beer.name.slice(1).toLowerCase();
      url += `['brewery'~'${capitalizedBeerName}']`;
    });
    url += ';out;';
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private getBox(coords, size): string {
    let s = coords.latitude - size;
    let w = coords.longitude - size;
    let n = coords.latitude + size;
    let e = coords.longitude + size;
    return `${s},${w},${n},${e}`;
  }

  private extractData(res: Response) {
    let body = res.json();
    // attention si pas elements
    return body.elements.map(el => new Bar(el));
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
