<template>
  <el-container>
    <div class="row">
      <div class="col" style="width: 45%;">
        <p class="num">404</p>
        <p>PÁGINA NO ENCONTRADA</p>
        <el-button
          type="primary"
          @click="navigateTo('/login')"
          style="
            background-color: #6993FF;
            color: #fff;
            position: absolute;
            bottom: 20%;
          "
        >
          REGRESAR
        </el-button>
      </div>
      <div class="col" style="width: 55%;">
        <img draggable="false" src="@/assets/404.png" >
      </div>
    </div>
  </el-container>
</template>

<script>
export default {
  methods: {
    navigateTo(route) {
      // eslint-disable-next-line no-restricted-globals
      location.replace(`/#${route}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  background-color: rgb(240, 240, 240);
  height: 100%;
  width: 100%;
  .row {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .col {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 60%;
      }
      p {
        font-size: 40px;
        color: #006eff;
        margin: 0px;
        text-align: center;
      }
      .num {
        font-size: 120px !important;
      }
    }
  }
}
</style>
