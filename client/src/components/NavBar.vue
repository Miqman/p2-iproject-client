<script>
import { mapWritableState } from "pinia";
import { useJikanStore } from "../stores/jikan";

export default {
  methods: {
    btnLogout() {
      // this.$gAuth.signOut();
      localStorage.clear();
      this.$router.push("/login");
    },
  },

  computed: {
    ...mapWritableState(useJikanStore, ["isLogin"]),
  },
};
</script>

<template>
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
            <router-link class="nav-link active" aria-current="page" to="/"
              >Home</router-link
            >
          </li>
          <li class="nav-item" v-if="isLogin === true">
            <router-link class="nav-link active" to="/profile"
              >Profile</router-link
            >
          </li>
        </ul>
        <ul class="d-flex navbar-nav">
          <li class="nav-item" v-if="isLogin === false">
            <router-link class="nav-link active" to="/login">Masuk</router-link>
          </li>
          <li class="nav-item" v-if="isLogin === true">
            <a href="" class="nav-link" @click.prevent="btnLogout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
