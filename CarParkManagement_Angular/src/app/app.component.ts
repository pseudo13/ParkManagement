import { ParkManagementService } from "./park-management.service";
import { Component, HostListener } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  @HostListener("window:message", ["$event"])
  onMessage(e) {
    this.handleIframeTask(e);
  }

  handleIframeTask(e: any) {
    if (e.data === "START_SIMULATING") {
      this.simulateCars();
    } else if (e.data == "STOP_SIMULATING") {
      this.stopSimulating();
    }
  }
  title = "CarParkManagement";
  intervallId;

  constructor(public parkService: ParkManagementService) {}

  simulateCars() {
    this.intervallId = window.setInterval(() => {
      let rand = Math.random() * 10;
      if (rand < 5) {
        this.carEnter();
      } else {
        this.carLeaves();
      }
    }, 1000);
  }

  stopSimulating() {
    clearInterval(this.intervallId);
  }

  carEnter() {
    this.parkService.onCarEntering.next();
  }

  carLeaves() {
    let level = Math.floor(Math.random() * 3);
    this.parkService.onCarLeaving.next(level);
  }
}
