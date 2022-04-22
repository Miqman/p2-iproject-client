import { defineStore } from "pinia";
import axios from "axios";

// http://localhost:3000
// http://localhost:3000/
// https://minfonime.herokuapp.com/
// http://localhost:3000
let baseUrl = "http://localhost:3000";
export const useJikanStore = defineStore({
  id: "jikan",
  state() {
    return {
      action: [],
      popular: [],
      allAnime: [],
      animeDetail: [],
      genres: "",
      newProducer: "",
      user: "",
      count: 0,
      profile: [],
      favData: [],
      q: "",

      quote: [],
      isProfile: false,
      isLogin: false,
    };
  },
  getters: {},
  actions: {
    async addProfile(data) {
      console.log(data, "=========");
      try {
        let file = new FormData();
        file.append("name", data.name);
        file.append("bio", data.bio);
        file.append("imageUrl", data.imageUrl);

        // console.log(file, "<<<<<<<");
        const res = await axios({
          method: "post",
          url: `http://localhost:3000/profileAdd`,
          data: file,
          headers: {
            access_token: localStorage.access_token,
          },
        });

        this.showProfile();
        this.router.push("/profile");

        // console.log(res, "<<<<<");
      } catch (error) {
        console.log(error);
        console.log(error.response);
        Swal.fire({
          title: error.response.statusText,
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },

    async showProfile() {
      try {
        const res = await axios({
          method: "get",
          url: `http://localhost:3000/profile`,
          headers: {
            access_token: localStorage.access_token,
          },
        });

        // console.log(res, "=======");
        if (res.data.data) {
          this.profile = res.data.data;
          this.isProfile = false;
        } else {
          this.isProfile = true;
          this.profile = [];
        }
      } catch (error) {
        console.log(error);
        console.log(error.response);
        Swal.fire({
          title: error.response.statusText,
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },

    async loginHandle(login) {
      // console.log(login, "<<<<<<<<<");
      try {
        const res = await axios.post(`${baseUrl}/login`, login);
        // console.log(res);
        localStorage.access_token = res.data.access_token;
        localStorage.id = res.data.id;
        localStorage.name = res.data.username;

        this.user = localStorage.name;
        this.isLogin = true;
        this.router.push("/");
        Swal.fire({
          title: res.statusText,
          icon: "success login",
          showConfirmButton: "Ok",
        });
      } catch (error) {
        console.log(error);
        console.log(error.response);
        Swal.fire({
          title: error.response.statusText,
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },

    async registerHandle(regist) {
      // console.log(regist, "<<<<<<<<<");
      try {
        const res = await axios.post(`${baseUrl}/register`, regist);
        // console.log(res);

        this.router.push("/login");
        Swal.fire({
          title: res.statusText,
          icon: "success register",
          showConfirmButton: "Ok",
        });
      } catch (error) {
        console.log(error);
        console.log(error.response);
        Swal.fire({
          title: error.response.statusText,
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },

    async getAnimeGenre() {
      try {
        const res = await axios.get("https://api.jikan.moe/v4/anime?genres=1");

        this.action = res.data.data;

        // console.log(res.data.data);
        // console.log(res);
      } catch (error) {
        console.log(error);
        console.log(error.response);
        Swal.fire({
          title: error.response.statusText,
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },
    async getPopular() {
      try {
        const res = await axios.get("http://localhost:3000/popular");

        this.popular = res.data.data;

        // console.log(res.data.data, "<<<<<");
        // console.log(res);
      } catch (error) {
        console.log(error);
        console.log(error.response);
        Swal.fire({
          title: error.response.statusText,
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },

    async showAnime(dQuery) {
      try {
        const { page, q } = dQuery;

        const res = await axios.get(`http://localhost:3000/anime`, {
          params: { page, q },
        });

        this.allAnime = res.data.pagination.data;
        // console.log(
        //   res.data.pagination.pagination.last_visible_page,
        //   "><><><><"
        // );
        // console.log(res.data.pagination.data, "=======");
        this.count = Math.ceil(
          +res.data.pagination.pagination.last_visible_page / 25
        );
      } catch (error) {
        console.log(error);
        console.log(error.response);
        Swal.fire({
          title: error.response.statusText,
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },

    async showDetail(id) {
      try {
        console.log(id, "<<<<<<<");
        const res = await axios({
          method: "get",
          url: `${baseUrl}/anime/${id}`,
          headers: {
            access_token: localStorage.access_token,
          },
        });

        this.animeDetail = res.data.data;
        let jenis = res.data.data.genres;
        jenis = jenis.map((el) => el.name);
        this.genres = jenis.join(", ");

        let producer = res.data.data.producers;
        producer = producer.map((el) => el.name);
        this.newProducer = producer.join(", ");

        // console.log(this.animeDetail, "<><><><><>");
        this.router.push(`/detail/${id}`);
        Swal.fire({
          title: res.statusText,
          icon: "success",
          showConfirmButton: "Ok",
        });
      } catch (error) {
        console.log(error);
        console.log(error.response);
        Swal.fire({
          title: error.response.statusText,
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },

    async btnFavorite(id) {
      try {
        const res = await axios({
          method: "post",
          url: `${baseUrl}/fav/${id}`,
          headers: {
            access_token: localStorage.access_token,
          },
        });

        this.router.push("/profile");
        Swal.fire({
          title: res.statusText,
          icon: "success",
          showConfirmButton: "Ok",
        });
      } catch (error) {
        console.log(error);
        console.log(error.response);
        Swal.fire({
          title: error.response.statusText,
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },

    async showFav() {
      try {
        const res = await axios({
          method: "get",
          url: `http://localhost:3000/fav`,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.favData = res.data.data;
        // console.log(this.favData, "<<<<<<<<");
        Swal.fire({
          title: res.statusText,
          icon: "success",
          showConfirmButton: "Ok",
        });
      } catch (error) {
        console.log(error);
        console.log(error.response);
        Swal.fire({
          title: error.response.statusText,
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },

    async btnDelete(id) {
      // console.log(id, "<><><><><>");
      try {
        const res = await axios({
          method: "delete",
          url: `http://localhost:3000/delete/${id}`,
          headers: {
            access_token: localStorage.access_token,
          },
        });

        this.showProfile();
        this.showFav();
        this.router.push("/profile");

        Swal.fire({
          title: res.statusText,
          icon: "success",
          showConfirmButton: "Ok",
        });
      } catch (error) {
        console.log(error);
        console.log(error.response);
        Swal.fire({
          title: error.response.data.message,
          text: error.response.data.statusCode,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },

    async quoteRandom() {
      try {
        const res = await axios({
          method: "get",
          url: `https://katanime.vercel.app/api/getrandom`,
        });

        this.quote = res.data.result[0];
        // console.log(res.data.result, "><><><><");
      } catch (error) {
        console.log(error);
        console.log(error.response);
      }
    },

    async multiUpload(data) {
      try {
        let file = new FormData();
        for (let i = 0; i < data.length; i++) {
          file.append("imageUrl", data[i]);
          console.log(data[i], "<<<<<<");
        }
        console.log(file, "<<<<<<");
        const res = await axios({
          method: "post",
          url: `http://localhost:3000/multifile`,
          data: file,
          headers: {
            access_token: localStorage.access_token,
          },
        });
      } catch (error) {
        console.log(error);
        console.log(error.response);
      }
    },
  },
});
