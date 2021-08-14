<script>
import { computed,onMounted, watchEffect } from 'vue';
import { useStore } from "vuex";
import { useRoute } from 'vue-router';

import MovieCard from '@/components/MovieCard.vue';

export default {
  components: {
    MovieCard,
  },
  setup() {
    const genres =  {
      1: 'Action',
      2: 'Adventure',
      3: 'Animation',
      4: 'Comedy',
      5: 'Crime',
      6: 'Documentary',
      7: 'Drama',
      8: 'Family',
      9: 'Fantasy',
      10: 'History',
      11: 'Horror',
      12: 'Music',
      13: 'Mystery',
      14: 'Romance',
      15: 'Science Fiction',
      16: 'TV Movie',
      17: 'Thriller',
      18: 'War',
      19: 'Western'
    }
    const route = useRoute();
    const store = useStore();
    const movierArr = store.getters["Movie/movieArr"];
    const randomArr = [10,20,30,40,50,60];
    const id = route.params.id;
    onMounted(()=> {
      window.scrollTo(0, 0)
    });
    let movie = computed(() => movierArr.find((item) => item.id === Number(id)));
    
    const movieGenres = computed(
     () => movierArr.find((item) => item.id === Number(id)).genres.map( num => genres[num])
    )

    const suggestions = computed(() => randomArr.map( num =>movierArr[num]));

    const handClickFav = (id) => {
      store.dispatch("Movie/handSetFav",id);
    }
    
    watchEffect(() =>{
      movie = computed(() => movierArr.find((item) => item.id === Number(route.params.id)));
    })
    return {movie,handClickFav,movieGenres,suggestions};
  },
};
</script>
<template>
  <div>
    <div class="container movie-container" v-show="movie">
      <div class="movie-poster">
        <div 
          class="movie-poster-container"
          v-bind:style="{ backgroundImage: 'url(' + movie.image + ')' }"
        ></div>
        <div @click="handClickFav(movie.id)" class="movie-fav">
          <div v-show="!movie.fav">加入收藏</div>
          <div v-show="movie.fav" class="movie-fav-active">已收藏</div>
        </div>
      </div>
      <div class="movie-info">
        <h2 class="movie-info-title">{{movie.title}}</h2>
        <h3>{{movie.release_date}}</h3>
        <div class="movie-info-genres">
          Genres:
          <p
            v-for="genre in movieGenres"
            :key="genre"
            class="genre"
          >
            {{genre}}
          </p>
        </div>
        <p class="movie-info-description">{{movie.description}}</p>
      </div>
    </div>

    <div class="container">
        <div class="suggestions-container">
          <div class="suggestions-title">Related Suggestions</div>
          <div class="relate">
            <div class="card-container" v-for="movie in suggestions" :key="movie.title">
              <MovieCard
                :movie="movie"
                :handClickFav="handClickFav"
              />
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.movie-poster {
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: 8px;
}
.movie-poster-container {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 300px;
  height: 400px;
  border: 4px solid var(--card-bg);
  border-radius: 8px;
}
.movie-fav {
  color: var(--card-font);
  cursor: pointer;
  padding: 8px 0;
  &:hover {
    color: var(--theme);
  }
  .movie-fav-active {
    color: var(--theme);
  }
}

.movie-info {
  flex: 1;
  margin-left: 24px;
  text-align: left;
  background-color: var(--card-bg);
  padding: 24px;
  border-radius: 8px;
  color: var(--font);
  &-title {
    margin-bottom: 12px;
  }
  &-description {
    line-height: 1.6;
    letter-spacing: .75px;
  }
}
.movie-info-genres {
  margin: 8px 0 ;
}
.genre {
  display: inline-block;
  margin: 2px 4px;
  color: var(--theme);
  border-radius: 20px;
  padding: 2px 20px;
  background: rgba(65,184,131,.25);
  font-size: 12px;
}
.suggestions-container {
  width: 100%;
  background-color: var(--card-bg);
  margin-bottom: 60px;
  border-radius: 8px;
  text-align: left;
  .suggestions-title {
    padding: 24px;
    padding-bottom: 0;
    color: var(--font);
  }
}

@media screen and (max-width: 720px) {
  .movie-container {
    flex-direction: column;
  }
  .movie-poster-container {
    width: 100%;
  }
  .movie-info {
    margin: 12px 0;
  }
}

.relate {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.card-container {
  width: 33%;
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
