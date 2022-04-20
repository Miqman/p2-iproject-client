<script>
import { mapActions, mapState } from "pinia";
import { useJikanStore } from "../stores/jikan";

export default {
  methods: {
    ...mapActions(useJikanStore, ["showDetail"]),
  },
  computed: {
    ...mapState(useJikanStore, ["animeDetail"]),
  },
  created() {
    this.showDetail(this.$route.params.id);
  },
};
</script>

<template>
  <p>{{ animeDetail }}</p>
</template>
