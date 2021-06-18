import { ParkingPlaceComponent } from "./ParkingPlaceComponent";
import { Fragment } from "react";
import React from "react";
import { ParkingRow } from "../models/ParkModels";

export const ParkRowComponent = (props: {
  parkingRow: ParkingRow;
  key: string;
}) => {
  const { parkingRow } = props;
  return (
    <Fragment>
      {parkingRow.columns.map((column, i) => {
        return (
          <ParkingPlaceComponent
            custom-park-place={column.level + "_" + column.rowIndex + "_" + i}
            place={column}
            key={column.level + "_" + column.rowIndex + "_" + i}
          ></ParkingPlaceComponent>
        );
      })}
    </Fragment>
  );
};
