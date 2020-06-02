<template>
  <div class="app-wrapper">
    <navbar />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <app-main class="app-main-container" />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './Components';

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-wrapper {
  position: unset;
  height: 100% !important;
  width: 100%;
  overflow-y: hidden;
}
.sidebar-container {
  height: 100% !important;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.main-container {
  background: rgb(212, 226, 240);
  position: absolute;
  left: 80px;
  top: 50px;
  width: calc(100% - 80px);
  height: calc(100% - 50px);
  overflow: hidden;
  .app-main-container {
    width: 100%;
    height: 100%;
  }
}
</style>
