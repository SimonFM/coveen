<template>
  <b-table
    :data="results"
    :loading="isLoading"
    :opened-detailed="openedDetails"
    detailed
    detail-key="Country"
    show-detail-icon
    paginated
    pagination-position="bottom"
    narrowed
    sticky-header
    default-sort-direction="asc"
    default-sort="rank"
  >
    <b-table-column field="rank" label="Rank" sortable sticky numeric v-slot="props">
      {{ props.row.rank }}
    </b-table-column>
    <b-table-column field="Country" label="Country" sortable sticky v-slot="props">
      {{ props.row.Country }}
    </b-table-column>
    <b-table-column field="TotalConfirmed" label="Total Confirmed" sortable sticky numeric v-slot="props">
      <span class="tag is-warning">
        {{ props.row.TotalConfirmed }}
      </span>
    </b-table-column>
    <b-table-column field="NewConfirmed" label="New Confirmed" sortable sticky numeric v-slot="props">
      <span class="tag is-success">
        {{ props.row.NewConfirmed }}
      </span>
    </b-table-column>
    <b-table-column field="NewDeaths" label="New Deaths" sortable sticky numeric v-slot="props">
      <span class="tag is-danger">
        {{ props.row.NewDeaths }}
      </span>
    </b-table-column>
    <b-table-column field="TotalDeaths" label="Total Deaths" sortable sticky numeric v-slot="props">
      {{ props.row.TotalDeaths }}
    </b-table-column>
    <b-table-column field="NewRecovered" label="New Recovered" sortable sticky numeric v-slot="props">
      <span class="tag is-info">
        {{ props.row.NewRecovered }}
      </span>
    </b-table-column>
    <b-table-column field="TotalRecovered" label="Total Recovered" sortable sticky numeric v-slot="props">
      {{ props.row.TotalRecovered }}
    </b-table-column>
    <template slot="detail" slot-scope="props">
      <article class="media">
        <div class="media-content">
          <div class="content">
            <div class="columns" v-for="(infoList, i) of [newInfomation(props.row), totalInformation(props.row)]" :key="i">
              <div v-for="(info, j) of infoList" :key="j" class="column">
                <b-skeleton v-if="isLoading" :value="isLoading" />
                <b-tag v-else :type="info.get('type')" size="is-medium">{{ `${info.get("label")}: ${info.get("value")}` }} </b-tag>
              </div>
            </div>
          </div>
        </div>
      </article>
    </template>
  </b-table>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Location } from "@/models/location";
import { formatNumber } from "@/utils/string";
import { Label } from "@/models/label";

@Component
export default class CountryList extends Vue {
  @Prop({
    type: Array,
    required: true,
    default: () => []
  })
  results?: Array<Location>;
  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  isLoading?: boolean;

  openedDetails: Array<number> = [];

  newInfomation(country?: Location): Label[] {
    const confirmed = new Label();
    confirmed.text = "New Confirmed";
    confirmed.value = formatNumber(country?.NewConfirmed);

    const deaths = new Label();
    deaths.text = "New Deaths";
    deaths.value = formatNumber(country?.NewDeaths);

    const recoveries = new Label();
    recoveries.text = "New Recoveries";
    recoveries.value = formatNumber(country?.NewRecovered);

    return [confirmed, deaths, recoveries];
  }

  totalInformation(country?: Location): Label[] {
    const confirmed = new Label();
    confirmed.text = "Total Confirmed";
    confirmed.value = formatNumber(country?.TotalConfirmed);

    const deaths = new Label();
    deaths.text = "Total Deaths";
    deaths.value = formatNumber(country?.TotalDeaths);

    const recoveries = new Label();
    recoveries.text = "Total Recoveries";
    recoveries.value = formatNumber(country?.TotalRecovered);

    return [confirmed, deaths, recoveries];
  }
}
</script>
