import { COVID19Obj } from "@/models/covid19Obj";

export class COVID19Response {
  status?: number;
  success = false;
  message?: string;
  data?: COVID19Obj;
  date?: Date;
}
