<template>
  <div
    style="
       {
        display: 'none';
      }
    "
  ></div>
</template>
<script>
import { dialogBus } from "@/bus/bus";
export default {
  created() {
    dialogBus.$on("show", payload => {
      if (!payload) {
        return;
      }
      this.$buefy.notification.open(payload);
    });
  },
};
</script>
