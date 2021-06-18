import React, { useState, useEffect } from "react";
import { ParkLevelComponent } from "./components/ParkLevelComponent";
import { ParkingLevel, ParkingPlace } from "./models/ParkModels";
import { parkService } from "./services/parkService";

function App() {
  const parkingLevels: ParkingLevel[] = Array(...Array(3)).map(
    (_, i) => new ParkingLevel(i, 4)
  );

  let intervallId: number;

  const [displayMessage, setDisplayMessage] = useState({
    displayMessage: "Park is free. Please come in."
  });

  useEffect(() => {
    window.addEventListener("message", handleIframeTask);
  }, []);

  const handleIframeTask = (e: any) => {
    if (e.data === "START_SIMULATING") {
      simulateCars();
    } else if (e.data == "STOP_SIMULATING") {
      stopSimulating();
    }
  };

  const simulateCars = () => {
    intervallId = window.setInterval(() => {
      let rand = Math.random() * 10;
      if (rand <= 7) {
        carEnter();
      } else {
        carLeaves();
      }
    }, 500);
  };

  const parkState: any = {};

  const stopSimulating = () => {
    clearInterval(intervallId);
  };

  const carEnter = () => {
    for (let i = 0; i < parkingLevels.length; i++) {
      var levelColumns = (parkState[i] = parkingLevels[i].parkingRows
        .map(r => r.columns.map(rr => rr))
        .flat());
      let freeColumn: ParkingPlace | undefined = levelColumns.find(
        c => !c.occupied
      );
      if (freeColumn) {
        freeColumn.occupied = true;
        parkService.toggleParkPlaceState(freeColumn);

        let allColumns: ParkingPlace[] = parkingLevels
          .map(pl => pl.parkingRows.map(pr => pr.columns.map(pc => pc)))
          .flat()
          .flat();
        let freeColumnsAfter = allColumns.filter(c => !c.occupied);
        //console.log(freeColumn);
        if (freeColumnsAfter.length == 0) {
          //alert("Park is full. Please wait.");
          setDisplayMessage({ displayMessage: "Park is full. Please wait." });
        }
        break;
      }
    }
    //(parkState);
  };

  const carLeaves = () => {
    let allColumns: ParkingPlace[] = parkingLevels
      .map(pl => pl.parkingRows.map(pr => pr.columns.map(pc => pc)))
      .flat()
      .flat();
    let occupiedColumns = allColumns.filter(c => c.occupied);
    console.log(allColumns, occupiedColumns);
    try {
      let rand = Math.floor(Math.random() * occupiedColumns.length);
      let randomPlace = occupiedColumns[rand];
      randomPlace.occupied = false;
      parkService.toggleParkPlaceState(randomPlace);
      setDisplayMessage({ displayMessage: "Park is free. Please come in." });
    } catch (error) {}
  };

  return (
    <div className="App">
      <button onClick={simulateCars}>Start simulating cars</button>
      <button onClick={stopSimulating}>Stop simulationg cars</button>
      <h3>{displayMessage.displayMessage}</h3>
      <hr />
      {parkingLevels.map((l, i) => {
        return (
          <div className="park-level" key={i}>
            <ParkLevelComponent
              custom-park-level={i}
              parkLevel={l}
              key={i.toString()}
            ></ParkLevelComponent>
          </div>
        );
      })}
    </div>
  );
}

export default App;
