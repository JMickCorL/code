<template>
  <div class="right-title">
    <el-row>
      <el-col :span="18">
        <div class="title">
          <img
            draggable="false"
            src="@/assets/icon-user.png"
            style="cursor: default;"
          >
          <span>
            {{text}}
          </span>
        </div>
      </el-col>
      <el-col
        v-if="isGeneral"
        :span="6"
        class="options"
      >
        <div class="ops">
          <img
            @click="navigateTo('admin/patient/full-profile')"
            draggable="false"
            src="@/assets/icon-profiles.png"
            style="cursor: pointer;"
          >
          <img
            style="cursor: pointer;"
            draggable="false"
            src="@/assets/icon-close.png"
            v-on:click="$emit('closeDialog')"
          >
        </div>
      </el-col>
      <el-col
        v-if="editable"
        class="options"
        :span="6"
      >
        <div>
          <img
            style="cursor: pointer;"
            draggable="false"
            src="@/assets/edit-icon.png"
            @click="navigateTo(url)"
          >
        </div>
      </el-col>
      <el-col
        v-if="!isGeneral && clossable"
        style="width: 50px!important"
        class="options">
        <div>
          <img
            style="cursor: pointer;"
            draggable="false"
            src="@/assets/icon-close.png"
            v-on:click="$emit('closeDialog')"
          >
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    text: {
      type: String,
    },
    url: {
      type: String,
    },
    patientId: {
      type: Number,
    },
    isGeneral: {
      type: Boolean,
      default: false,
    },
    clossable: {
      type: Boolean,
      default: true,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    navigateTo(route) {
      this.$emit('closeDialog');
      setTimeout(() => {
        this.$router.push({ path: `/${route}/${this.patientId}` });
      });
    },
  },
};
</script>

<style lang="scss">
.right-title {
  z-index: 10 !important;
  background-color: #fff;
  position: relative;
  height: 60px;
  font-size: 18px!important;
  font-weight: bold;
  box-shadow: 0px 5px 5px rgba(200,200,200,0.5);
  -webkit-box-shadow: 0px 5px 5px rgba(200,200,200,0.5);
  -moz-box-shadow: 0px 5px 5px rgba(200,200,200,0.5);
  .el-row {
    height: 100%;
    display: flex;
    align-items: center;
    .title {
      margin: 0;
      height: 60px;
      color: #040E28;
      display: flex;
      align-items: center;
      align-content: center;
      img {
        margin-right: 5px;
        margin-left: 5px;
        height: 20px!important;
        min-height: 20px!important;
        width: 20px;
      }
      span {
        font-size: 18px!important;
      }
    }
    .options {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      justify-content: flex-end;
      flex: 1;
      .ops {
        height: 100%;
        display: flex;
        align-content: center;
        justify-content: flex-end;
      }
      img {
        height: 35px;
        min-height: 35px!important;
        width: 35px;
        margin: 5px;
      }
    }
  }
}
</style>
