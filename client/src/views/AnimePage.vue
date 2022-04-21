<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useJikanStore } from "../stores/jikan";
import NavBar from "../components/NavBar.vue";
import PagiNationVue from "../components/PagiNation.vue";

export default {
  data() {
    return {};
  },
  components: {
    NavBar,
    PagiNationVue,
  },

  methods: {
    ...mapActions(useJikanStore, ["showAnime", "btnFavorite", "showDetail"]),
  },
  computed: {
    ...mapState(useJikanStore, ["allAnime"]),
    ...mapWritableState(useJikanStore, ["isLogin", "q"]),
  },
  created() {
    this.showAnime(this.$route.query);
    // this.showDetail(this.$route.params.id);
  },
};
</script>

<template>
  <nav-bar></nav-bar>
  <div class="container-fluid">
    <div class="container mt-4">
      <div class="row height d-flex justify-content-center align-items-center">
        <div class="col-md-6">
          <div class="form">
            <i class="fa fa-search"
              ><img
                src="../assets/logoSearch.png"
                alt=""
                width="15"
                height="15"
                style="margin-bottom: 12px"
            /></i>
            <input
              type="text"
              class="form-control form-input"
              placeholder="Search by name"
              v-model="q"
            />

            <span class="left-pan"
              ><button class="btn btn-sm" @click.prevent="showAnime({ q: q })">
                Search
              </button></span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <h1>List Anime {{ q }}</h1>
      <div class="row">
        <div class="col-3" v-for="el in allAnime" :key="el.id">
          <div class="card-group">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <pagi-nation-vue></pagi-nation-vue>
    </div>
  </div>
</template>

<style scoped>
.form {
  position: relative;
}

.form .fa-search {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #9ca3af;
}

.form span {
  position: absolute;
  right: 17px;
  top: 13px;
  padding: 2px;
  border-left: 1px solid #d1d5db;
}

.left-pan {
  padding-left: 7px;
}

.left-pan i {
  padding-left: 10px;
}

.form-input {
  height: 55px;
  text-indent: 33px;
  border-radius: 10px;
}

.form-input:focus {
  box-shadow: none;
  border: none;
}
</style>
