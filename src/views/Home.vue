<template>
  <div class="home container">
    <section>
      <div class="card">
        <div class="card-header" role="button" aria-controls="contentIdForA11y3">
          <p class="card-header-title">
            {{ `${"Global Summary"} - ${date}` }}
          </p>
        </div>
        <div class="card-content">
          <div class="content">
            <covid-summary class="global-summary" :summary="globalSummary" :is-loading="isLoadingGlobalSummary" />
          </div>
          <div class="content">
            <country-list :is-loading="isLoadingGlobalSummary" :results="results" />
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" @click="fetchGlobalSummary()">{{ "Reload" }}</a>
        </footer>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import { Location } from "@/models/location";
import { format, parseISO } from "date-fns";
import { GlobalSummary } from "@/api/global";
import CovidSummary from "@/components/CovidSummary.vue";
import CountryList from "@/components/CountryList.vue";

@Component({
  computed: mapGetters(["globalSummary", "isLoadingGlobalSummary"]),
  methods: mapActions(["fetchGlobalSummary"]),
  components: {
    CovidSummary,
    CountryList
  }
})
export default class Home extends Vue {
  globalSummary?: GlobalSummary;
  isLoadingGlobalSummary?: boolean;

  created() {
    this.fetchGlobalSummary();
  }

  get results(): Array<Location> {
    return this.globalSummary?.Countries || [];
  }

  get date(): string {
    if (!this.globalSummary || !this.globalSummary.Date) {
      return "";
    }
    return format(parseISO(this.globalSummary.Date), "dd/MM/yyyy hh:mm");
  }

  fetchGlobalSummary!: () => void;
  clearGlobalSummary!: () => void;
}
</script>
