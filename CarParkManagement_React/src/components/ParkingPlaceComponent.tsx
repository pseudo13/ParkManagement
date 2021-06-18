import { ParkingPlace } from "../models/ParkModels";
import React from "react";
import { parkService } from "../services/parkService";

type ParkingPlaceProps = {
  place: ParkingPlace;
  key: string;
};

type OccopiedState = {
  occupied: boolean;
};

export class ParkingPlaceComponent extends React.Component<
  ParkingPlaceProps,
  OccopiedState
> {
  place: ParkingPlace;

  subscriptions: any;
  constructor(props: ParkingPlaceProps) {
    super(props);
    this.place = this.props.place;
    this.state = {
      occupied: false
    };
  }
  componentDidMount() {
    this.subscriptions = parkService.getParkPlaceState().subscribe(param => {
      const { place } = param;

      if (
        this.place.level == place.level &&
        this.place.columnIndex == place.columnIndex &&
        this.place.rowIndex == place.rowIndex
      ) {
        this.setState({ occupied: place.occupied });
      }
    });
  }

  componentWillMount() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  render() {
    return (
      <span
        className={[
          "park-place",
          this.state.occupied ? "occupied" : "open"
        ].join(" ")}
      >
        {this.place.rowIndex + "_" + this.place.columnIndex}
      </span>
    );
  }
}
