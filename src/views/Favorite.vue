
<script>
import { onMounted,computed } from "vue";
import { useStore } from "vuex";

import MovieCard from '@/components/MovieCard.vue';

export default {
  components: {
    MovieCard,
  },
  setup() {
    const store = useStore();
    onMounted(()=> {
      window.scrollTo(0, 0)
    });
    const movies = computed(() => {
      const movies = store.getters["Movie/movieArr"];
      return movies.filter(movie => movie.fav === true)
    });
    const favLength = computed(() => {
      const movies = store.getters["Movie/movieArr"];
      return movies.filter(movie => movie.fav === true).length
    });
    const handClickFav = (id) => {
      store.dispatch("Movie/handSetFav",id)
    }
    return {movies ,favLength,handClickFav}
  }
}
</script>


<template>
  <h2>收藏清單</h2>
  <div class="container">
    <div class="hint" v-show="!favLength">
      <h4>還沒有收藏的電影</h4>
      <router-link to="/" class="back">返回首頁</router-link>
    </div>
    <transition-group name="fade">
      <div class="card-container" v-for="movie in movies" :key="movie.title">
        <!-- {{movie.title}} -->
          <MovieCard
            :movie="movie"
            :handClickFav="handClickFav"
          />
      </div>
    </transition-group>
  </div>  
</template>


<style scoped>

.hint {
  text-align: center;
  margin: 0 auto;
}
.back {
  font-size: 24px;
}
.back:hover {
  color: var(--theme);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
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