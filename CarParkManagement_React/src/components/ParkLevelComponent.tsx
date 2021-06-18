import React, { Fragment } from "react";
import { ParkRowComponent } from "./ParkRowComponent";
import { ParkingLevel } from "../models/ParkModels";

export const ParkLevelComponent = (props: {
  parkLevel: ParkingLevel;
  key: string;
}) => {
  const { parkLevel } = props;
  return (
    <React.Fragment>
      <strong>Park number : {parkLevel.level}</strong>
      {parkLevel.parkingRows.map((parkingRow, i) => {
        return (
          <div>
            <ParkRowComponent
              custom-park-row={parkingRow.level + "_" + i}
              key={parkingRow.level + "_" + i}
              parkingRow={parkingRow}
            ></ParkRowComponent>
          </div>
        );
      })}
    </React.Fragment>
  );
};
