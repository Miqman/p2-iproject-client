<script>
import { mapActions, mapState } from "pinia";
import { useJikanStore } from "../stores/jikan";
import NavBar from "../components/NavBar.vue";
import FooterNav from "../components/FooterNav.vue";

export default {
  data() {
    return {};
  },
  components: {
    NavBar,
    FooterNav,
  },
  methods: {
    ...mapActions(useJikanStore, ["getAnimeGenre", "getPopular", "showAnime"]),
  },
  computed: {
    ...mapState(useJikanStore, ["popular"]),
  },
  created() {
    this.getPopular();
  },
};
</script>

<template>
  <div class="container-fluid">
    <nav-bar></nav-bar>
    <div class="container">
      <div
        id="carouselExampleCaptions"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="text-topimg d-none d-md-block">
              <h5>Minfonime</h5>
              <p style="font-size: 40px">Best Information of Anime</p>
            </div>
            <div class="btn-topimg d-none d-md-block">
              <router-link class="btn btn-primary" to="/anime"
                >Mulai</router-link
              >
            </div>
            <div class="hero"></div>
            <img src="../assets/gifCover.gif" class="d-block w-100" alt="..." />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <div class="container">
      <h1>Popular Anime</h1>
      <div class="cards-wrapper">
        <div
          class="card"
          style="width: 14rem"
          v-for="el in popular"
          :key="el.id"
        >
          <img
            :src="el.entry.images.jpg.image_url"
            class="card-img-top"
            height="200"
            style="object-fit: cover"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">{{ el.entry.title }}</h5>
            <h6>
              Score
              <p class="card-text"></p>
            </h6>

            <a href="#" class="btn btn-primary">Detail</a>
          </div>
        </div>
      </div>
    </div>

    <footer-nav></footer-nav>
  </div>
</template>
