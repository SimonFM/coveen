<template>
  <div class="global-content">
    <div class="columns" v-for="(labels, i) of [totalInformation, newInfomation]" :key="i">
      <div v-for="(label, j) of labels" :key="j" class="column">
        <b-skeleton v-if="isLoading" :value="isLoading" />
        <b-tag v-else :type="label.type" size="is-large">{{ `${label.text}: ${label.value}` }} </b-tag>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { GlobalSummary } from "@/api/global";
import { formatNumber } from "@/utils/string";
import { Label } from "@/models/label";

@Component
export default class CovidSummary extends Vue {
  @Prop({ type: Object, required: false }) summary?: GlobalSummary;
  @Prop({ type: Boolean, required: false }) isLoading?: boolean;

  get newInfomation(): Label[] {
    const confirmed = new Label();
    confirmed.text = "New Confirmed";
    confirmed.value = formatNumber(this.summary?.Global?.NewConfirmed);

    const deaths = new Label();
    deaths.text = "New Deaths";
    deaths.value = formatNumber(this.summary?.Global?.NewDeaths);

    const recoveries = new Label();
    recoveries.text = "New Recoveries";
    recoveries.value = formatNumber(this.summary?.Global?.NewRecovered);

    return [confirmed, deaths, recoveries];
  }

  get totalInformation(): Label[] {
    const confirmed = new Label();
    confirmed.text = "Total Confirmed";
    confirmed.value = formatNumber(this.summary?.Global?.TotalConfirmed);

    const deaths = new Label();
    deaths.text = "Total Deaths";
    deaths.value = formatNumber(this.summary?.Global?.TotalDeaths);

    const recoveries = new Label();
    recoveries.text = "Total Recoveries";
    recoveries.value = formatNumber(this.summary?.Global?.TotalRecovered);

    return [confirmed, deaths, recoveries];
  }
}
</script>
