<script>
export default {
  props: {
    movie: {
      type: Object,
      default: {},
    },
    handClickFav: {
      type: Function,
      default: ()=>{},
    }
  },
  setup(props) {
    return {props};
  }
}
</script>
<template>
<div class="card">
    <router-link :to="`/movie/${movie.id}`">
      <div 
        class="card-poster"
        v-bind:style="{ backgroundImage: 'url(' + props.movie.image + ')' }"
      >
        <div class="card-title">{{props.movie.title}}</div>
      </div>
    </router-link>
    <div class="card-action">
      <div @click="handClickFav(movie.id)" class="card-fav">
        <div v-show ="!movie.fav">
          加入收藏
        </div>
        <div v-show ="movie.fav" class="card-fav-active">
          已收藏
        </div>
      </div>
      <div class="card-detail">
        <router-link :to="`/movie/${movie.id}`">詳細資訊</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  background:var(--card-bg);
  height: 300px;
  width: 100%;
  padding: 6px;
  border-radius: 8px;
  margin: 20px;
  margin-bottom: 40px;
  &:hover {
    border-radius: 8px 8px 0px 0px;
    .card-poster {
      height: 100%;
      border-radius: 4px 4px 0px 0px;
    }
    .card-action {
      opacity: 1;
      position: absolute;
      display: flex;
      justify-content: space-between;
      height: 32px;
      bottom: -32px;
      width: 100%;
      left: 0px;
      border-radius: 0px 0px 4px 4px;
      background-color: var(--card-bg);
      color: var(--card-font);
      transition: opacity .2s ease;
      .card-fav,.card-detail {
        cursor: pointer;
        width: 50%;
        color: var(--font);
        font-weight: 400;
        text-align: center;
        &:hover {
          color: var(--theme);
        }
        &:a{
          color: var(--card-font);
        }
      }
      .card-fav-active {
        color: var(--theme);
      }
    }
  }
  &-action {
    opacity: 0;
    transition: all 0s ease;
  }
  &-poster {
    display: flex;
    flex-direction: column-reverse;
    background: linear-gradient(359.35deg, rgba(0, 0, 0, 0.75) 18.64%, rgba(0, 0, 0, 0) 99.71%); 
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
  }
  &-title {
    text-align: left;
    flex-direction: column-reverse;
    display: flex;
    background: linear-gradient(359.35deg, rgba(0, 0, 0, 0.75) 18.64%, rgba(0, 0, 0, 0) 99.71%);
    padding: 8px 8px;
    padding-bottom: 16px;
    color: #fff;
    height: 50%;
    font-weight: 900;
  }
}
</style>

