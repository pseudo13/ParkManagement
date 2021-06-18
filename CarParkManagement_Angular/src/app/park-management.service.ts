import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { ParkingPlace } from "./models/ParkingPlace";

export enum ParkingLevel {
  "ONE" = "ONE",
  "TWO" = "TWO",
  "THREE" = "THREE"
}

@Injectable({
  providedIn: "root"
})
export class ParkManagementService implements OnInit {
  onNotifyCarEntering = new Subject<number>();
  onNotifyLevelState = new Subject<{ level: number; full: boolean }>();

  onCarLeaving = new Subject<number>();
  onCarEntering = new Subject();

  parkDisplay: string;

  onNotifyParkPlaceStateChanged = new Subject<{
    level: number;
    row: number;
    column: number;
    occupied: boolean;
  }>();

  parkLevelFullStates = {};

  constructor() {
    this.parkLevelFullStates[ParkingLevel.ONE] = false;
    this.parkLevelFullStates[ParkingLevel.TWO] = false;
    this.parkLevelFullStates[ParkingLevel.THREE] = false;
    this.onCarEntering.subscribe(() => {
      if (!this.parkLevelFullStates[ParkingLevel.ONE]) {
        this.onNotifyCarEntering.next(0);
      } else if (!this.parkLevelFullStates[ParkingLevel.TWO]) {
        this.onNotifyCarEntering.next(1);
      } else if (!this.parkLevelFullStates[ParkingLevel.THREE]) {
        this.onNotifyCarEntering.next(2);
      } else {
        this.parkDisplay = "Park is full. Please wait !!!";
      }
    });

    this.onNotifyLevelState.subscribe(param => {
      this.parkDisplay = "Park is free. Please come in !!!";
      switch (param.level) {
        case 0:
          this.parkLevelFullStates[ParkingLevel.ONE] = param.full;
          break;
        case 1:
          this.parkLevelFullStates[ParkingLevel.TWO] = param.full;
          break;
        case 2:
          this.parkLevelFullStates[ParkingLevel.THREE] = param.full;
          break;
      }
    });
  }

  ngOnInit() {}
}
