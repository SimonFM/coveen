import { COVID19Obj } from "@/models/covid19Obj";
import { Summary } from "@/models/summary";
import { Location } from "@/models/location";

export class GlobalSummary implements COVID19Obj {
  Global?: Summary;
  Countries: Location[] = [];
  Message = "";
  Date?: string;

  dateCreated: Date = new Date();
}
