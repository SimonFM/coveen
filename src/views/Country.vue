<template>
  <div class="country container">
    <section class="card">
      <div class="card-header" role="button" aria-controls="contentIdForA11y3">
        <p class="card-header-title">{{ `${this.title} - ${this.date}` }}</p>
      </div>
      <div class="card-content">
        <div class="content">{{ this.content }}</div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item">More Info</a>
        <a class="card-footer-item">Edit</a>
        <a class="card-footer-item" @click="fetchCountry('ireland')">Reload</a>
      </footer>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import { Location } from "@/models/location";
import { format, parseISO } from "date-fns";

//https://github.com/vuejs/vue-class-component/blob/master/example/src/App.vue
@Component({
  computed: mapGetters(["selectedLocation"]),
  methods: mapActions(["fetchCountry", "clearSelectedLocation"])
})
export default class Home extends Vue {
  selectedLocation?: Location;

  created() {
    this.fetchCountry("ireland");
  }

  get title(): string {
    if (!this.selectedLocation || !this.selectedLocation.Country) {
      return "No Country Selected";
    }
    return this.selectedLocation.Country;
  }

  get content(): string {
    if (!this.selectedLocation) {
      return "Nothing to show...";
    }
    return `${this.selectedLocation.Confirmed} - Deaths: ${this.selectedLocation.Deaths} - Recovered ${this.selectedLocation.Recovered}`;
  }

  get date(): string {
    if (!this.selectedLocation || !this.selectedLocation.Date) {
      return "";
    }
    return format(parseISO(this.selectedLocation.Date), "MM/dd/yyyy");
  }

  fetchCountry!: (CountryCode: string) => void;
  clearSelectedLocation!: () => void;
}
</script>
