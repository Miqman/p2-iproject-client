<script>
import { mapWritableState } from "pinia";
import { useJikanStore } from "./stores/jikan";

export default {
  computed: {
    ...mapWritableState(useJikanStore, ["isLogin", "user"]),
  },
  created() {
    const accesToken = localStorage.access_token;
    if (accesToken) {
      this.isLogin = true;
      this.user = localStorage.name;
    }
  },
};
</script>

<template>
  <router-view></router-view>
</template>

<style>
@import "@/assets/style.css";
</style>
