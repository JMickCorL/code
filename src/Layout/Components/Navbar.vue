<template>
  <el-menu class="navbar" mode="horizontal">
    <div class="left-container">
      <div class="brand">
        <img class="bg-img" draggable="false" src="@/assets/nav-logo.png" >
      </div>
    </div>
    <div class="mid-container">
      <div v-if="showLinkAppointment('normal')" class="btn-container">
        <el-tooltip
          class="item"
          effect="dark"
          content="Dar de alta paciente"
          placement="bottom"
        >
          <router-link :to="'/admin/patient/register'">
            <img class="bg-img" draggable="false" src="@/assets/add-user.png" >
          </router-link>
        </el-tooltip>
      </div>
      <div class="separator" v-if="displayIcon() && showLinkAppointment('subsequent')" />
      <div class="btn-container" v-if="displayIcon() && showLinkAppointment('subsequent')">
        <el-tooltip
          class="item"
          effect="dark"
          content="Cita subsecuente"
          placement="bottom"
        >
          <router-link :to="`/admin/appointments/subsequent/${patient}`">
            <img class="bg-img" draggable="false" src="@/assets/in-time.png" >
          </router-link>
        </el-tooltip>
      </div>
    </div>
    <div class="right-container">
      <div class="role">
        {{ role.name }}
      </div>
      <div class="username">
        {{ getName() }}
      </div>
      <el-dropdown trigger="click">
        <div style="display: contents">
          <div class="avatar-wrapper">
            <img class="user-avatar" :src="avatar" >
          </div>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/admin/account">
            <el-dropdown-item>
              Perfil
            </el-dropdown-item>
          </router-link>
          <router-link to="/admin/account/password">
            <el-dropdown-item>
              Contraseña
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">
              Cerrar Sesión
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>
<script>
import { mapState } from 'vuex';
import defaultImage from '../../assets/empty-user-icon.png';
import { originalURL } from '../../API';

export default {
  data() {
    return {
      baseURL: originalURL,
      patient: null,
      avatar: defaultImage,
    };
  },
  computed: {
    ...mapState({
      auth: (state) => state.auth,
      user: (state) => state.auth.user,
      role: (state) => state.auth.user.role,
    }),
    avatarSrc() {
      return this.user.avatar;
    },
  },
  methods: {
    getName() {
      const { firstName, lastName } = this.user;
      if (firstName && lastName) {
        return `${firstName} ${lastName}`;
      }
      return '';
    },
    async logout() {
      await this.$store.dispatch('auth/logOut');
      // eslint-disable-next-line
      location.reload();
    },
    displayIcon() {
      const route = this.$route.path;
      if (route.includes('/admin/patient/full-profile/')) {
        this.patient = this.$route.params.id;
        return true;
      }
      return false;
    },
    showLinkAppointment(type) {
      let access;
      switch (type) {
        case 'normal':
          access = [
            'ADMIN',
            'FD',
            'TS',
          ].includes(this.role.id);
          break;
        case 'subsequent':
          access = [
            'ADMIN',
            'FD',
            'MD',
            'TS',
          ].includes(this.role.id);
          break;
        default:
          access = false;
          break;
      }
      return access;
    },
  },
  mounted() {
    if (this.avatarSrc) {
      this.avatar = `${this.baseURL}/static/user/avatar/${this.avatarSrc}`;
    }
  },
  watch: {
    avatarSrc(val) {
      if (val) {
        this.avatar = `${this.baseURL}/static/user/avatar/${val}`;
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  background-color: #fafdff;
  height: 50px;
  width: 100%;
  border-radius: 0px !important;
  display: flex;
  flex-direction: row;
  padding-left: 10px;
  padding-right: 10px;
  position: relative;
  .left-container {
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .brand {
      margin-left: 4px;
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 50px;
      width: 55px;
      img {
        width: 100%;
      }
    }
  }
  .right-container {
    position: relative;
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .role {
      color: rgba(0, 0, 0, 0.2)
    }
    .username {
      margin-right: 10px;
      margin-left: 10px;
    }
    .el-dropdown {
      cursor: pointer;
      height: 100%;
      width: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      .avatar-wrapper {
        height: 40px;
        width: 40px;
        overflow: hidden;
        border-radius: 20px;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
  .mid-container {
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    width: auto;
    z-index: 2;
    padding-top: 2px;
    display: flex;
    flex-direction: row;
    .separator {
      width: 1px;
      height: 70%;
      background-color: #c4c4c4;
      align-self: center;
    }
    .btn-container {
      height: 100%;
      cursor: pointer;
      img {
        cursor: pointer;
        height: 100%;
        width: 50px;
      }
    }
  }
}
</style>
