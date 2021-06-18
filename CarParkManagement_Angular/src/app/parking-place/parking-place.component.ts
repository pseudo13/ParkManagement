import { ParkManagementService } from "./../park-management.service";
import { Component, OnInit, Input } from "@angular/core";
import { ParkingPlace } from "../models/ParkingPlace";

@Component({
  selector: "app-parking-place",
  templateUrl: "./parking-place.component.html",
  styleUrls: ["./parking-place.component.scss"]
})
export class ParkingPlaceComponent implements OnInit {
  @Input() place: ParkingPlace;

  constructor(private parkService: ParkManagementService) {
    this.parkService.onNotifyParkPlaceStateChanged.subscribe(param => {
      if (
        this.place.level == param.level &&
        this.place.posX == param.row &&
        this.place.posY == param.column
      ) {
        this.place.occupied = param.occupied;
      }
    });
  }

  ngOnInit() {}
}
