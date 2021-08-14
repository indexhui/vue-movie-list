<script>
import { onMounted,watchEffect,reactive  } from "vue";
import { useStore } from "vuex";

import MenuBtn from "./components/MenuBtn.vue";
import MenuSlid from "./components/MenuSlid.vue";
import ThemeSwitch from "./components/ThemeSwitch.vue";

export default {
  components: {
    MenuBtn,
    MenuSlid,
    ThemeSwitch,
  },
  setup() {
    const store = useStore();
    const init = () => {
      store.dispatch("Movie/handleInit");
    };
    onMounted(() => {
      store.dispatch("Auth/handSetToken", "Acbz1x3WQw4eq9qilpFjregn");
      init();
    });
    watchEffect(() => store.dispatch("Movie/handSaveLocalStorage"))
    return {};
  },
};
</script>
<template>
    <MenuSlid />
    <MenuBtn />
  <div id="nav">
    <div class="logo">
      <router-link to="/">
        <img class="logo-img" src="./assets/logo.png" alt="logo">
      </router-link>
    </div>
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/favorite">Favorite</router-link> -->
    <ThemeSwitch />
  </div>
  <router-view/>
</template>

<style lang="scss">

@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap");

/* color */
html {
  --body-bg: #F0F0F0;
  --card-bg: #fff;
  --input-bg: #DFDFDF;
  --font:#5E5E5E;
  --card-font:#5E5E5E;
  --theme: #41B883;
}
html[data-theme="dark"] {
  --body-bg: #232323;
  --card-bg: #000;
  --input-bg: #4A4A4A;
  --font:#EAEAEA;
  --card-font:#EAEAEA;
  --theme: #41B883;
}
/* reset */
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
}

::selection {
    background: #41B883; /* Safari */
}
::-moz-selection {
    background: #41B883; /* Firefox */
}

html.transition,
html.transition *,
html.transition *:before,
html.transition *:after {
  transition: all 450ms !important;
  transition-delay: 0 !important;
}

a,
a:hover,
a:focus {
  text-decoration: none;
}
a {
  color: var(--font);
  &:hover {
    color: var(--theme);
  }
}
input {
  padding: 0;
}
input:required {
  box-shadow: none;
}
input:invalid {
  box-shadow: none;
}

/* normal */
body {
  background-color: var(--body-bg);
  color: var(--font);
  font-family: "Noto Sans TC", "Noto Sans", sans-serif;
}

h1,h2,h3,h4 {
  color: var(--font);
}

#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  a {
    font-weight: bold;
    color: var(--font);

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .logo {
   position: absolute;
   left: 10%; 
   top: 50px;
  }
  .menu {
    height: 24px;
    width: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .ham {
      width: 32px;
      height: 2px;
      background-color: #42b983;
    }
  }
}

@media screen and (max-width: 720px) {
  .logo-img {
   width: 80px;
  }
}
.container {
  display: flex;
  flex-wrap: wrap;
  width: 75%;
  max-width: 980px;
  margin: 0 auto;
  margin-top: 40px;
}

@media screen and (max-width: 720px) {
  .container {
   width: 90%;
  }
}
</style>
