export default {
  handMenuOpen(context) {
    const bool = !context.state.isOpen;
    context.commit("handOpenState", bool);
  },
  handThemeToggle(context) {
    const bool = !context.state.isDark;
    context.commit("handThemeState", bool);
  },
};
