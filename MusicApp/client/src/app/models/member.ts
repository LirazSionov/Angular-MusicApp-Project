import { Photo } from "./photo";

export interface Member {
  id:             number;
  username:       string;
  photoUrl:       string;
  instrumentType: string;
  upLoaded:       Date;
  lastApdate:     Date;
  cost:           string;
  introduction:   string;
  suitablFor:     string;
  city:           string;
  country:        string;
  photos:         Photo[];
}

