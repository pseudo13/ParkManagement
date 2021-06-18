export class ParkingPlace {
  level: number;
  posX: number;
  posY: number;
  occupied?: boolean = false;

  constructor(x, y, l, o = false) {
    this.level = l;
    this.posX = x;
    this.posY = y;
    this.occupied = o;
  }
}

export class ParkingRow {
  constructor(rowIndex: number, rowCount: number, level: number) {
    this.level = level;
    this.rows = Array(rowCount)
      .fill({})
      .map((x, i) => new ParkingPlace(rowIndex, i, this.level));
  }
  level: number;
  rows: ParkingPlace[];
}
