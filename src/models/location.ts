import { COVID19Obj } from "@/models/covid19Obj";

export class Location implements COVID19Obj {
  Country?: string;
  CountryCode?: string;
  Slug?: string;
  Lat?: number;
  Lon?: number;
  Confirmed?: number;
  NewConfirmed = -1;
  TotalConfirmed = -1;
  Deaths?: number;
  NewDeaths = -1;
  TotalDeaths = -1;
  Recovered?: number;
  NewRecovered = -1;
  TotalRecovered = -1;
  Active?: number;
  Date?: string;
  rank = -1;

  dateCreated: Date = new Date();
}
