import { InstrumentType } from "./instrument-type";

export interface User{
  username:string;
  token:string;
  photoUrl: string;
  instrumentType:InstrumentType;
}
