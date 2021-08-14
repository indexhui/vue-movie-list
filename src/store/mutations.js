export default {
  handOpenState(state, bool) {
    state.isOpen = bool;
  },
  handThemeState(state, bool) {
    state.isDark = bool;
    let trans = () => {
      document.documentElement.classList.add("transition");
      window.setTimeout(() => {
        document.documentElement.classList.remove("transition");
      }, 1000);
    };
    trans();
    if (state.isDark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  },
};
