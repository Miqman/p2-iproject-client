import { defineStore } from "pinia";
import axios from "axios";

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
      profile: [],
      favData: [],
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

        console.log(file, "<<<<<<<");
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
      } catch (error) {
        console.log(error);
        console.log(error.response);
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
      }
    },

    async showAnime() {
      try {
        const res = await axios.get(`http://localhost:3000/anime`);
        // console.log(res.data.data.data, "<<<<<<<");

        this.allAnime = res.data.data.data;
        // console.log(res.data.data.data, "><><><><");
      } catch (error) {
        console.log(error);
        console.log(error.response);
      }
    },

    async showDetail(id) {
      try {
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

        // console.log(this.animeDetail);
        this.router.push(`/detail/${id}`);
      } catch (error) {
        console.log(error);
        console.log(error.response);
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
      } catch (error) {
        console.log(error);
        console.log(error.response);
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
      } catch (error) {
        console.log(error);
        console.log(error.response);
      }
    },
  },
});
