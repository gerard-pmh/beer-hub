import { Pipe, PipeTransform } from '@angular/core';
import { convertUnit } from 'geolib';

@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {

  transform(value: number | string) {
    let distanceInMeter: number =
      typeof value === 'string'
      ? parseFloat(value)
      : value;

    if (distanceInMeter > 100) {
      return convertUnit('km', distanceInMeter, 1) + ' km';
    }

    return distanceInMeter + ' m';
  }

}
