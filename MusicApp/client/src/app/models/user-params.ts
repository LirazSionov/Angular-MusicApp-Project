import { InstrumentType } from "./instrument-type";
import { User } from "./user";
export class UserParams {
  instrumentType:InstrumentType;
  minCost=0;
  maxCost=20000;
  pageNumber=1;
  pageSize=5;
  orderBy="LastApdate";

  constructor({instrumentType}:User) {
    this.instrumentType=instrumentType;
  }
}
