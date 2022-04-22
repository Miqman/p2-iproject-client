<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useJikanStore } from "../stores/jikan";
import NavBar from "../components/NavBar.vue";

export default {
  data() {
    return {
      genrenih: "",
    };
  },
  components: {
    NavBar,
  },
  methods: {
    ...mapActions(useJikanStore, ["showDetail", "btnFavorite"]),
  },
  computed: {
    ...mapState(useJikanStore, ["animeDetail", "genres", "newProducer"]),
    ...mapWritableState(useJikanStore, ["isLogin"]),
  },
  created() {
    this.showDetail(this.$route.params.id);
  },
};
</script>

<template>
  <nav-bar></nav-bar>
  <div class="container-fluid">
    <div class="container d-flex justify-content-center mt-3">
      <div class="card" style="width: 20rem">
        <img
          :src="animeDetail.images.jpg.image_url"
          height="425"
          class="card-img-top"
          style="object-fit: cover"
          alt="..."
        />
        <div class="card-body">
          <h3 class="card-title">{{ animeDetail.title }}</h3>
          <p class="card-text">
            {{ animeDetail.title_japanese }}
          </p>
        </div>

        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <strong>Genre:</strong>
            <p>{{ genres }}</p>
          </li>
          <li class="list-group-item">
            <strong>Score:</strong>
            <p>{{ animeDetail.score }}</p>
          </li>
          <li class="list-group-item">
            <strong>Episode:</strong>
            <p>{{ animeDetail.episodes }}</p>
            {{ animeDetail.duration }}
          </li>
        </ul>
      </div>

      <div class="card ms-1" style="width: 40rem">
        <div class="card-header text-center">Featured</div>
        <div class="card-body">
          <h5 class="card-title">Synopsis</h5>
          <p class="card-text">
            {{ animeDetail.synopsis }}
          </p>
          <h5 class="card-title">Rank</h5>
          <p class="card-text">
            {{ animeDetail.rank }}
          </p>
          <h5 class="card-title">Producers</h5>
          <p class="card-text">
            {{ newProducer }}
          </p>
          <h5 class="card-title">Type</h5>
          <p class="card-text">
            {{ animeDetail.type }}
          </p>
          <h5 class="card-title">Trailer</h5>
          <p v-if="!animeDetail.trailer.embed_url" class="card-text">
            Trailer not found
          </p>
          <iframe
            width="500"
            height="285"
            :src="animeDetail.trailer.embed_url"
            frameborder="0"
            v-if="animeDetail.trailer.embed_url"
          ></iframe>
          <br />
          <a
            class="btn btn-outline-success"
            href=""
            @click.prevent="btnFavorite(animeDetail.mal_id)"
            v-if="isLogin === true"
            >add favorite</a
          >
        </div>
        <div class="card-footer text-muted text-center">
          {{ animeDetail.aired.string }}
        </div>
      </div>
    </div>
  </div>
</template>
