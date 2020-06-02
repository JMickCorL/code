<template>
  <div class="menu-wrapper">
    <template v-for="item in routesFilter()">
      <router-link :to="item.path + '/' + item.children[0].path" :key="item.children[0].name">
        <el-menu-item :index="item.path + '/' + item.children[0].path">
          <img draggable="false" :src="getSrc(item.meta.icon)" >
        </el-menu-item>
      </router-link>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import icon1 from '../../../assets/icon-1.png';
import icon2 from '../../../assets/icon-2.png';

export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState({
      permissionRoutes: (state) => state.permission.addRoutes,
      role: (state) => state.auth.user.role.id,
    }),
  },
  methods: {
    getSrc(path) {
      if (path === 'icon-1') {
        return icon1;
      }
      if (path === 'icon-2') {
        return icon2;
      }
      return null;
    },
    hasOneShowingChildren(children) {
      const showingChildren = children.filter((item) => !item.hidden);
      if (showingChildren.length === 1) {
        return true;
      }
      return false;
    },
    routesFilter() {
      return this.permissionRoutes.filter((item) => !item.hidden
      && item.children && (item.hiddenOnRole ? !item.hiddenOnRole.includes(this.role) : true));
    },
  },
};
</script>

<style lang="scss">
.menu-wrapper {
  height: 100% !important;
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0px;
}
.el-menu-item {
  width: 80px;
  height: 80px !important;
  padding-top: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
