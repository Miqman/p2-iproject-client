<script>
import { mapActions, mapState } from "pinia";
import { useJikanStore } from "../stores/jikan";
import NavBar from "../components/NavBar.vue";

export default {
  components: {
    NavBar,
  },

  methods: {
    ...mapActions(useJikanStore, ["showAnime"]),
  },
  computed: {
    ...mapState(useJikanStore, ["allAnime"]),
  },
  created() {
    this.showAnime();
  },
};
</script>

<template>
  <nav-bar></nav-bar>
  <div class="container-fluid">
    <div class="container">
      <h1>All Anime</h1>
      <div class="row">
        <div class="col-3" v-for="el in allAnime" :key="el.id">
          <div class="card">
            <img
              :src="el.images.jpg.image_url"
              class="card-img-top"
              height="180"
              style="object-fit: cover"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">{{ el.title }}</h5>
              <h6>
                Score
                <p class="card-text">{{ el.score }}</p>
              </h6>

              <a
                href=""
                class="btn btn-primary"
                @click.prevent="$router.push('/detail/' + el.mal_id)"
                >Detail</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
