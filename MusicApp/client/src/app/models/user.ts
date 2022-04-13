import { InstrumentType } from "./instrument-type";

export interface User{
  username:string;
  token:string;
  instrumentType:InstrumentType;
}
