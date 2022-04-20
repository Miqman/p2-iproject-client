<script>
import { mapActions, mapState } from "pinia";
import { useJikanStore } from "../stores/jikan";

export default {
  data() {
    return {
      profile: {
        name: "",
        bio: "",
        imageUrl: "",
      },
    };
  },
  methods: {
    ...mapActions(useJikanStore, [
      "getAnimeGenre",
      "getPopular",
      "showAnime",
      "addProfile",
    ]),
  },
  computed: {
    ...mapState(useJikanStore, ["popular", "allAnime"]),
  },
  created() {
    this.getPopular();
    this.showAnime();
  },
};
</script>

<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">Navbar</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
          </ul>
          <ul class="d-flex navbar-nav">
            <li class="nav-item">
              <a href="" class="nav-link">Masuk</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
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
              <a class="btn btn-primary" href="">Mulai</a>
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
          style="width: 15rem"
          v-for="el in popular"
          :key="el.id"
        >
          <img
            :src="el.entry.images.jpg.image_url"
            class="card-img-top"
            style="object-fit: scale-down"
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
    <div class="container">
      <h1>All Anime</h1>
      <div class="row">
        <div class="col-3" v-for="el in allAnime" :key="el.id">
          <div class="card">
            <img
              :src="el.images.jpg.image_url"
              class="card-img-top"
              style="height: 150px; object-fit: cover"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">{{ el.title }}</h5>
              <h6>
                Score
                <p class="card-text"></p>
              </h6>

              <a href="#" class="btn btn-primary">Detail</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bootstrap 5 Contact Form Snippet -->

    <div class="container px-5 my-5">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card border-0 rounded-3 shadow-lg">
            <div class="card-body p-4">
              <div class="text-center">
                <div class="h1 fw-light">Profile Form</div>
                <p class="mb-4 text-muted">Fill your information here</p>
              </div>

              <form id="profileForm">
                <!-- Name Input -->
                <div class="form-floating mb-3">
                  <input
                    class="form-control"
                    id="name"
                    type="text"
                    placeholder="Name"
                    v-model="profile.name"
                  />
                  <label for="name">Name</label>
                </div>

                <!-- Bio Input -->
                <div class="form-floating mb-3">
                  <input
                    class="form-control"
                    id="biodata"
                    type="text"
                    placeholder="Biodata"
                    v-model="profile.bio"
                  />
                  <label for="biodata">Biodata</label>
                </div>
                <!-- uploadImg -->
                <div class="mb-3">
                  <label for="formFile" class="form-label"
                    >file type jpg/png</label
                  >
                  <input
                    class="form-control"
                    type="file"
                    name="imageUrl"
                    @input="(event) => (profile.imageUrl = event.target.value)"
                  />
                </div>

                <!-- Submit button -->
                <div class="d-grid">
                  <button
                    class="btn btn-primary btn-lg"
                    id="submitButton"
                    type="submit"
                    @click.prevent="addProfile(profile)"
                  >
                    Submit
                  </button>
                </div>
              </form>
              <!-- End of contact form -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Footer -->
    <footer class="text-center text-lg-start bg-light text-muted">
      <!-- Section: Social media -->
      <section
        class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
      >
        <div class="container">
          <!-- Left -->
          <div class="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
          <!-- Left -->

          <!-- Right -->
          <div>
            <a href="" class="me-4 text-reset">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="" class="me-4 text-reset">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="" class="me-4 text-reset">
              <i class="fab fa-google"></i>
            </a>
            <a href="" class="me-4 text-reset">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="" class="me-4 text-reset">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="" class="me-4 text-reset">
              <i class="fab fa-github"></i>
            </a>
          </div>
          <!-- Right -->
        </div>
      </section>
      <!-- Section: Social media -->

      <!-- Copyright -->
      <div
        class="text-center p-4"
        style="background-color: rgba(0, 0, 0, 0.05)"
      >
        © 2021 Copyright:
        <a class="text-reset fw-bold" href="">miqman.com</a>
      </div>

      <!-- Copyright -->
    </footer>
    <!-- Footer -->
  </div>
</template>
