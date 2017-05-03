export class Coordinates {

  constructor(
    public latitude: number,
    public longitude: number
  ) { }

  public printBox(size: number): string {
    let s = this.latitude - size;
    let w = this.longitude - size;
    let n = this.latitude + size;
    let e = this.longitude + size;
    return `${s},${w},${n},${e}`;
  }

}
