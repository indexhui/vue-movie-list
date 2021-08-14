import axios from "axios";
export default {
  namespaced: true,
  state: {
    movieArr: [],
    isLoad: false,
    storageKey: "movies",
  },
  actions: {
    handleInit({ commit }) {
      let local = JSON.parse(localStorage.getItem("movies")) || [];
      if (local.length) {
        console.log("取得local");
        commit("init", JSON.parse(localStorage.getItem("movies")));
      } else {
        axios
          .get("https://movie-list.alphacamp.io/api/v1/movies/")
          .then((res) => {
            const movies = res.data.results.map((movie) => ({
              ...movie,
              image: `https://movie-list.alphacamp.io/posters/${movie.image}`,
              fav: false,
            }));
            commit("init", movies);
          });
      }
    },
    handSetFav(context, id) {
      context.commit("setFav", id);
    },
    handSaveLocalStorage(context) {
      context.commit("saveLocalStorage");
    },
  },
  mutations: {
    init(state, payload) {
      state.movieArr = payload;
      // console.log(state.movieArr);
    },
    setFav(state, id) {
      state.movieArr.forEach((movie) => {
        if (movie.id === id) {
          movie.fav = !movie.fav;
        }
      });
    },
    saveLocalStorage(state) {
      let local = JSON.parse(localStorage.getItem("movies")) || [];
      if (state.movieArr.length) {
        console.log("存2", local.length);
        localStorage.setItem("movies", JSON.stringify(state.movieArr));
      }
    },
  },
  getters: {
    isLoad(state) {
      return state.isLoad;
    },
    movieArr(state) {
      return state.movieArr;
    },
  },
};
