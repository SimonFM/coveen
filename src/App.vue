<template>
  <div id="app">
    <router-view />
    <app-dialog />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import AppDialog from "@/components/AppDialog.vue";

@Component({
  components: {
    AppDialog
  }
})
export default class App extends Vue {}
</script>
