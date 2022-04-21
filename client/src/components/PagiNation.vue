<script>
import { mapActions, mapState } from "pinia";
import { useJikanStore } from "../stores/jikan";
export default {
  methods: {
    ...mapActions(useJikanStore, ["showAnime"]),
  },
  computed: {
    ...mapState(useJikanStore, ["count"]),
  },
};
</script>

<template>
  <div class="container">
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-end">
        <li class="page-item" v-for="(el, i) in count">
          <router-link
            class="page-link"
            :to="{ path: '/anime', query: { page: i + 1 } }"
            @click.prevent="showAnime({ page: i + 1 })"
            >{{ i + 1 }}</router-link
          >
        </li>
      </ul>
    </nav>
  </div>
</template>
