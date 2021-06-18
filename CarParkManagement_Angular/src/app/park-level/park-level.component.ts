import { ParkManagementService } from "./../park-management.service";
import { ParkingRow } from "./../models/ParkingPlace";
import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { ParkingPlace } from "../models/ParkingPlace";

@Component({
  selector: "app-park-level",
  templateUrl: "./park-level.component.html",
  styleUrls: ["./park-level.component.scss"]
})
export class ParkLevelComponent implements OnInit {
  constructor(
    private parkService: ParkManagementService,
    private cd: ChangeDetectorRef
  ) {}
  @Input() parkLevel;

  rows: ParkingRow[] = [];
  ngOnInit() {
    this.rows = [];
    for (let i = 0; i < 4; i++) {
      this.rows.push(new ParkingRow(i, 9, this.parkLevel));
    }

    this.parkService.onCarLeaving.subscribe(level => {
      if (level != this.parkLevel) return;
      let randomRowIndex = Math.floor(Math.random() * 4);
      let randomRow: ParkingRow = this.rows[randomRowIndex];
      if (randomRow) {
        let randomColIndex = Math.floor(Math.random() * 9);
        let randomCol: ParkingPlace = randomRow.rows[randomColIndex];
        if (randomCol) {
          if (randomCol.occupied) {
            this.parkService.onNotifyParkPlaceStateChanged.next({
              level: this.parkLevel,
              row: randomRowIndex,
              column: randomColIndex,
              occupied: false
            });
            this.parkService.onNotifyLevelState.next({
              level: this.parkLevel,
              full: false
            });
          }
        }
      }
    });

    this.parkService.onNotifyCarEntering.subscribe(level => {
      if (level !== this.parkLevel) return;
      for (let i = 0; i < 4; i++) {
        let existFreePlaceIndex = this.rows[i].rows.findIndex(r => !r.occupied);
        if (existFreePlaceIndex >= 0) {
          this.parkService.onNotifyParkPlaceStateChanged.next({
            level: this.parkLevel,
            row: i,
            column: existFreePlaceIndex,
            occupied: true
          });
          break;
        }
      }
      let isLevelFree = this.rows
        .map(r => r.rows.some(rr => !rr.occupied))
        .some(e => e);
      this.parkService.onNotifyLevelState.next({
        level: this.parkLevel,
        full: !isLevelFree
      });
    });
  }
}
