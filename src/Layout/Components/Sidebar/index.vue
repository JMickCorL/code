<template>
  <el-menu
    class="sidebar"
    mode="vertical"
    :show-timeout="200"
    :default-active="$route.path"
    :collapse="true"
  >
    <sidebar-item :routes="routes(permissionRoutes)"/>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex';
import SidebarItem from './SidebarItem';

export default {
  components: { SidebarItem },
  computed: {
    ...mapState({
      permissionRoutes: (state) => state.permission.addRoutes,
    }),
  },
  methods: {
    routes(permissionRoutes) {
      return permissionRoutes.filter((item) => !item.hidden && item.children);
    },
  },
};
</script>

<style lang="scss">
.scrollbar-wrapper {
  overflow-x: hidden;
  height: 100%;
  .el-scrollbar {
    height: 100% !important;
  }
  .el-scrollbar__view {
    height: 100%;
  }
}

.sidebar {
  height: 100% !important;
  width: 80px;
  background-color: #fafdff;
}
</style>
