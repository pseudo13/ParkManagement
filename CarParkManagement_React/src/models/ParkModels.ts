export class ParkingPlace {
  level: number;
  columnIndex: number;
  rowIndex: number;
  occupied: boolean = false;

  constructor(l: number, r: number, c: number, o = false) {
    this.level = l;
    this.rowIndex = r;
    this.columnIndex = c;
    this.occupied = o;
  }
}

export class ParkingRow {
  constructor(level: number, rowIndex: number) {
    this.level = level;
    this.columns = Array(9)
      .fill({})
      .map((x, i) => new ParkingPlace(this.level, rowIndex, i));
  }
  level: number;
  columns: ParkingPlace[];
}

export class ParkingLevel {
  parkingRows: ParkingRow[] = [];
  level: number;
  constructor(level: number, rows: number) {
    this.level = level;
    for (let i = 0; i < rows; i++) {
      this.parkingRows.push(new ParkingRow(this.level, i));
    }
  }
}
