import { RootState, LocationsState } from "./state";
import { Location } from "@/models/location";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import CountryAPI from "@/api/country";
import { GlobalSummary } from "@/api/global";
import { dialogBus } from "@/bus/bus";
// const testData = require("@/assets/summary.json");

const state: LocationsState = {
  selectedLocation: undefined,
  locations: [],
  globalSummary: undefined,
  loadingGlobalSummary: false
};

const getters: GetterTree<LocationsState, RootState> = {
  selectedLocation: state => state.selectedLocation,
  globalSummary: state => state.globalSummary,
  isLoadingGlobalSummary: state => state.loadingGlobalSummary
};

const actions: ActionTree<LocationsState, RootState> = {
  fetchCountry({ commit }, countryCode: string) {
    CountryAPI.fetchCountry(countryCode)
      .then(response => {
        if (response.success) {
          commit("setSelectedLocation", response.data as Location);
        } else {
          dialogBus.$emit("show", {
            message: "Unable to load the selected country, please try again",
            type: "is-danger"
          });
        }
      })
      .catch(() => {
        dialogBus.$emit("show", {
          message: "Unable to load the selected country, please try again",
          type: "is-danger"
        });
        commit("clearSelectedLocation");
      });
  },
  clearSelectedLocation({ commit }) {
    commit("setSelectedLocation", null);
  },
  fetchGlobalSummary({ commit }) {
    commit("startLoadingGlobalSummary");
    commit("clearGlobalSummary");
    // const summary = testData as GlobalSummary;
    // commit("setGlobalSummary", summary);
    // commit("stopLoadingGlobalSummary");
    CountryAPI.fetchGlobalSummary()
      .then(response => {
        if (response.success) {
          commit("setGlobalSummary", response.data as GlobalSummary);
        } else {
          dialogBus.$emit("show", {
            message: "Unable to load Countries list, please try again later",
            type: "is-danger"
          });
        }
      })
      .catch(() => {
        dialogBus.$emit("show", {
          message: "Unable to load Countries list, please try again later",
          type: "is-danger"
        });
        commit("clearGlobalSummary");
      })
      .finally(() => {
        commit("stopLoadingGlobalSummary");
      });
  },
  clearGlobalSummary({ commit }) {
    commit("setSelectedLocation", null);
  }
};

const mutations: MutationTree<LocationsState> = {
  setSelectedLocation(state, location: Location) {
    state.selectedLocation = location;
  },
  startLoadingGlobalSummary(state) {
    state.loadingGlobalSummary = true;
  },
  stopLoadingGlobalSummary(state) {
    state.loadingGlobalSummary = false;
  },
  clearSelectedLocation(state) {
    state.selectedLocation = undefined;
  },
  setGlobalSummary(state, globalSummary: GlobalSummary) {
    if (globalSummary && globalSummary.Countries) {
      const sortedValues: Location[] = globalSummary.Countries.sort((a: Location, b: Location) => {
        return b.TotalConfirmed - a.TotalConfirmed;
      });
      for (let i = 0; i < sortedValues.length; i++) {
        sortedValues[i].rank = i + 1;
      }
      globalSummary.Countries = sortedValues;
    }
    state.globalSummary = globalSummary;
  },
  clearGlobalSummary(state) {
    state.selectedLocation = undefined;
  }
};

/*eslint-disable */
const namespaced = false;
export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
/*enable  */