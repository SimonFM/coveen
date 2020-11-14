import Vue from "vue";
import Vuex from "vuex";
import Locations from "@/store/modules/locations";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Locations
  }
});
