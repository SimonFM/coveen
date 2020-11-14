import { GlobalSummary } from "@/api/global";
import { Location } from "@/models/location";

export interface RootState {
  version: string;
  _vm: object;
}

export interface LocationsState {
  selectedLocation?: Location;
  locations: Array<Location>;
  globalSummary?: GlobalSummary;

  loadingGlobalSummary: boolean;
}
