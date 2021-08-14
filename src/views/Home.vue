<script>
import { onMounted,computed,ref } from "vue";
import { useStore } from "vuex";

import MovieCard from '@/components/MovieCard.vue';

export default {
  components: {
    MovieCard,
  },
  setup() {
    const store = useStore();
    const searchKeyword = ref('');
    onMounted(()=> {
      window.scrollTo(0, 0)
    });
    const movies = computed(() => {
      const movieArr = store.getters["Movie/movieArr"];
      let key = searchKeyword.value;
      if (searchKeyword) {
        return movieArr.filter(movie => movie.title.toLowerCase().trim().match(key.toLowerCase().trim()));
      } else {
        return movies
      }
    });
    const handClickFav = (id) => {
      store.dispatch("Movie/handSetFav",id)
    }
    return {movies,handClickFav,searchKeyword}
  }
}
</script>

<template>
  <div class="home">
    <div class="container input-container">
      <input class="search" type="text" v-model="searchKeyword" placeholder="//  search">
    </div>
    <div class="container">
      <div class="card-container" v-for="movie in movies" :key="movie.title">
        <MovieCard
          :movie="movie"
          :handClickFav="handClickFav"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-container {
  margin: 0 auto;
  margin-top: 20px;
  .search {
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    height: 40px;
    font-size: 12px;
    border: 0px solid blue;
    border-radius: 8px;
    padding: 0 1em;
    font-size: 18px;
    color: var(--theme) ;
    background-color: var(--input-bg) ;
  }
  ::placeholder {
    color: var(--theme) ;
    color: rgba(65,184,131,.45);
  }
  input:focus{
    outline: none;
    color: var(--theme) ;
  }
}

.card-container {
  width: 33.33%;
  display: flex;
  justify-content: center;
}

@media screen and (max-width: 900px) {
  .card-container {
   width: 50%;
  }
}

@media screen and (max-width: 720px) {
  .card-container {
   width: 100%;
  }
}
</style>