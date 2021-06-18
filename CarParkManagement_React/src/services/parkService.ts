import { ParkingPlace } from "../models/ParkModels";
import { Subject } from "rxjs";

const subject = new Subject<{ place: ParkingPlace }>();

export const parkService = {
  toggleParkPlaceState: (place: ParkingPlace) => subject.next({ place }),
  getParkPlaceState: () => subject.asObservable()
};
