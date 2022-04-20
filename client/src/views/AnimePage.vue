<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useJikanStore } from "../stores/jikan";
import NavBar from "../components/NavBar.vue";

export default {
  components: {
    NavBar,
  },

  methods: {
    ...mapActions(useJikanStore, ["showAnime", "btnFavorite", "showDetail"]),
  },
  computed: {
    ...mapState(useJikanStore, ["allAnime"]),
    ...mapWritableState(useJikanStore, ["isLogin"]),
  },
  created() {
    this.showAnime();
    this.showDetail(this.$route.params.id);
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
                class="btn btn-primary me-2"
                @click.prevent="$router.push('/detail/' + el.mal_id)"
                >Detail</a
              >
              <a
                class="btn btn-outline-success"
                href=""
                @click.prevent="btnFavorite(el.mal_id)"
                v-if="isLogin === true"
                >add favorite</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
