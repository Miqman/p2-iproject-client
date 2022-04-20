import { defineStore } from "pinia";
import axios from "axios";
const bodyFormData = new FormData();

let baseUrl = "http://localhost:3000";
export const useJikanStore = defineStore({
  id: "jikan",
  state() {
    return {
      action: [],
      popular: [],
      allAnime: [],
      isLogin: false,
    };
  },
  getters: {},
  actions: {
    async addProfile(data) {
      console.log(data, "<<<<<<<<<<<");
      try {
        bodyFormData.append("imageUrl", data.imageUrl);
        bodyFormData.append("bio", data.bio);
        bodyFormData.append("name", data.name);
        const res = await axios.post(
          `http://localhost:3000/profileAdd`,
          { data: bodyFormData },
          {
            headers: {
              access_token: localStorage.access_token,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(res, "<<<<<");
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

        // console.log(res.data);
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
      } catch (error) {
        console.log(error);
        console.log(error.response);
      }
    },
  },
});
