<script>
import { mapActions } from "pinia";
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
    ...mapActions(useJikanStore, ["addProfile"]),
    imgHandle: function (e) {
      const img = e.target.files;
      this.profile.imageUrl = img[0];
    },
  },
};
</script>

<template>
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
                <input class="form-control" type="file" @change="imgHandle" />
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
</template>
