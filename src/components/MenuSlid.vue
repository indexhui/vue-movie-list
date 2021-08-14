<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const isOpen = computed(() =>{
      return store.getters.isOpen;
    })
    const handClickMenu = () => {
      store.dispatch("handMenuOpen")
    };
    return { isOpen,handClickMenu};
  }
}
</script>
<template>
  <div :class="['menu',{open:isOpen}]">
    <ul class="menu-nav">
      <router-link to="/" @click="handClickMenu">Home</router-link>
      <router-link to="/favorite" @click="handClickMenu">Favorite</router-link>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.menu {
  position: fixed;
  top: 0;
  right: -350px;
  width: 350px;
  height: 100%;
  z-index: 10;
  display: flex;
  flex-direction: columns;
  align-items: center;
  justify-content: center;
  background-color: var(--card-bg);
  transition: right 0.3s;
  &.open {
    right: 0px;
  }

  a {
    font-weight: bold;
    text-align: left;
    font-size: 20px;
    padding: 12px;
    display: block;
    color: var(--font);

    &.router-link-exact-active {
      color: #42b983;
    }
  }

}
</style>
