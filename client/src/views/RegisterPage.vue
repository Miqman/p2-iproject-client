<script>
import { mapActions, mapState } from "pinia";
import { useJikanStore } from "../stores/jikan";

export default {
  data() {
    return {
      register: {
        username: "",
        email: "",
        password: "",
      },
    };
  },

  methods: {
    ...mapActions(useJikanStore, ["registerHandle", "quoteRandom"]),
  },
  computed: {
    ...mapState(useJikanStore, ["quote"]),
  },
  created() {
    this.quoteRandom();
  },
};
</script>

<template>
  <div class="body-div">
    <div class="container px-4 py-5 mx-auto">
      <div class="card card0">
        <div class="d-flex flex-lg-row flex-column-reverse">
          <div class="card card1">
            <div class="row justify-content-center my-auto">
              <div class="col-md-8 col-10 my-5">
                <div class="row justify-content-center px-3 mb-3">
                  <img id="logo" src="../assets/logo.png" />
                </div>
                <h3 class="mb-5 text-center heading">Register</h3>
                <h6 class="msg-info">Please Register to your account</h6>
                <div class="form-group">
                  <label class="form-control-label text-muted">Username</label>
                  <input
                    type="text"
                    id="email"
                    class="form-control"
                    v-model="register.username"
                  />
                </div>
                <div class="form-group">
                  <label class="form-control-label text-muted">Email</label>
                  <input
                    type="text"
                    id="email"
                    class="form-control"
                    v-model="register.email"
                  />
                </div>
                <div class="form-group">
                  <label class="form-control-label text-muted">Password</label>
                  <input
                    type="password"
                    id="psw"
                    class="form-control"
                    v-model="register.password"
                  />
                </div>
                <div class="row justify-content-center my-3 px-3">
                  <button
                    class="btn-block btn-color"
                    @click.prevent="registerHandle(register)"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
            <div class="bottom text-center mb-5">
              <p href="#" class="sm-text mx-auto mb-3">have an account?</p>
              <button
                class="btn btn-white ml-2"
                @click.prevent="this.$router.push('/login')"
              >
                Login
              </button>
            </div>
          </div>
          <div class="card card2">
            <div
              class="my-auto mx-md-5 px-md-5 right"
              style="text-align: justify; text-justify: inter-word"
            >
              <h3 class="text-white">Quotes of the day is</h3>
              <small class="text-white">{{ quote.indo }}</small>
              <h5 class="text-white">by: {{ quote.character }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body-div {
  color: #000;
  overflow-x: hidden;
  height: 100%;
  background-image: url("../assets/bg.jpg");
  background-repeat: no-repeat;
}

input,
textarea {
  background-color: #f3e5f5;
  border-radius: 50px !important;
  padding: 12px 15px 12px 15px !important;
  width: 100%;
  box-sizing: border-box;
  border: none !important;
  border: 1px solid #f3e5f5 !important;
  font-size: 16px !important;
  color: #000 !important;
  font-weight: 400;
}

input:focus,
textarea:focus {
  -moz-box-shadow: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  border: 1px solid #d500f9 !important;
  outline-width: 0;
  font-weight: 400;
}

button:focus {
  -moz-box-shadow: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  outline-width: 0;
}

.card {
  border-radius: 0;
  border: none;
}

.card1 {
  width: 50%;
  padding: 40px 30px 10px 30px;
}

.card2 {
  width: 50%;
  background-image: linear-gradient(to right, #ffd54f, #d500f9);
}

#logo {
  width: 200px;
  height: 200px;
}

.heading {
  margin-bottom: 60px !important;
}

::placeholder {
  color: #000 !important;
  opacity: 1;
}

:-ms-input-placeholder {
  color: #000 !important;
}

::-ms-input-placeholder {
  color: #000 !important;
}

.form-control-label {
  font-size: 12px;
  margin-left: 15px;
}

.msg-info {
  padding-left: 15px;
  margin-bottom: 30px;
}

.btn-color {
  border-radius: 50px;
  color: #fff;
  background-image: linear-gradient(to right, #ffd54f, #d500f9);
  padding: 15px;
  cursor: pointer;
  border: none !important;
  margin-top: 40px;
}

.btn-color:hover {
  color: #fff;
  background-image: linear-gradient(to right, #d500f9, #ffd54f);
}

.btn-white {
  border-radius: 50px;
  color: #d500f9;
  background-color: #fff;
  padding: 8px 40px;
  cursor: pointer;
  border: 2px solid #d500f9 !important;
}

.btn-white:hover {
  color: #fff;
  background-image: linear-gradient(to right, #ffd54f, #d500f9);
}

a {
  color: #000;
}

a:hover {
  color: #000;
}

.bottom {
  width: 100%;
  margin-top: 50px !important;
}

.sm-text {
  font-size: 15px;
}

@media screen and (max-width: 992px) {
  .card1 {
    width: 100%;
    padding: 40px 30px 10px 30px;
  }

  .card2 {
    width: 100%;
  }

  .right {
    margin-top: 100px !important;
    margin-bottom: 100px !important;
  }
}

@media screen and (max-width: 768px) {
  .container {
    padding: 10px !important;
  }

  .card2 {
    padding: 50px;
  }

  .right {
    margin-top: 50px !important;
    margin-bottom: 50px !important;
  }
}
</style>
