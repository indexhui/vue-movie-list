<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const isOpen = computed(() => {
      return store.getters.isOpen
    })
    const handClickMenu = () => {
      store.dispatch("handMenuOpen")
    };
    return { handClickMenu ,isOpen };
  },
};

</script>
<template>
    <a :class="['menu-btn',{open:isOpen}]" @click="handClickMenu">
      <div class="ham"></div>
      <div class="ham"></div>
      <div class="ham"></div>
    </a>
</template>

<style lang="scss" scoped>
  .menu-btn {
    width: 32px;
    cursor: pointer;
    z-index: 10;
    position: fixed;
    top: 50px;
    right: 50px;
    z-index: 20;
    &.open {
      .ham:nth-child(1) {
        transform: rotate(45deg) translate(1px, 10px);
      }
      .ham:nth-child(2) {
        visibility: hidden;
      }
      .ham:nth-child(3) {
        transform: rotate(-45deg) translate(1px, -10px);
      }
    }
  }
  .menu-btn>.ham {
    width: 32px;
    height: 3px;
    margin: 5px auto;
    transition: all 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    background-color: #42b983;
  }
  
</style>