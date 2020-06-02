<template>
  <div
    id="uploader"
    @click="handleOpenFile"
    class="uploader-container"
  >
    <div v-if="!loading && imgSrc" class="hoverGrap">
      Cambiar
    </div>
    <div v-if="!loading && !imgSrc" class="icon">
      <i class="el-icon-plus"/>
    </div>
    <div
      v-if="loading || imgSrc"
      v-loading.lock="loading"
      customClass="spinner"
      class="imgContainer">
        <div v-if="imgSrc" class="arrow"/>
        <li v-if="imgSrc" class="el-icon-check"/>
        <img v-if="imgSrc" :src="imgSrc">
    </div>
    <input
      id="fileInput"
      ref="fileInp"
      type="file"
      style="display: none;"
      v-on:change="imgHandler">
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      imgSrc: null,
      loading: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  methods: {
    handleOpenFile() {
      document.getElementById('fileInput').click();
    },
    imgHandler() {
      const file = this.$refs.fileInp.files;
      if (file.length) {
        const MbLimit = 1;
        const size = file[0].size / 1024 / 1024 < MbLimit;
        const isPNG = file[0].type === 'image/png';
        if (isPNG) {
          if (size) {
            this.handleAvatar(file[0]);
          } else {
            this.$message({
              type: 'error',
              message: 'La imagen excede el tamaño limite, por favor use un archivo inferior a 1 Mb.',
              showClose: false,
            });
          }
        } else {
          this.$message({
            type: 'error',
            message: 'Solo se permiten imagenes en formato PNG',
            showClose: false,
          });
        }
      }
    },
    async handleAvatar(file) {
      this.loading = true;
      this.$emit('loading', this.loading);
      try {
        const data = new FormData();
        data.set('file', file);
        const response = true;
        if (response) {
          this.imgSrc = URL.createObjectURL(file);
        }
      } catch (err) {
        this.$errorNotify(err);
      }
      this.loading = false;
      this.$emit('loading', this.loading);
    },
  },
  created() {
  },
};
</script>
<style media="screen">

div.el-loading-spinner {
  top: 25%;
  width: 100%;
  text-align: center;
  position: absolute;
}
</style>
<style lang="scss" scoped>

.uploader-container {
  position: relative;
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  line-height: 146px;
  vertical-align: top;
  overflow: hidden;
  &:hover, &:focus {
    border-color: #409eff;
    color: #409eff;
    cursor: pointer;
  }
  .icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      font-size: 25px;
    }
  }
  .imgContainer {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    img {
      z-index: 1;
      height: 100%;
      width: 100%;
    }
  }
  .arrow {
    position: absolute;
    z-index: 100;
    right: -25px;
    top: -20px;
    transform: rotate(45deg);
    width: 50px;
    height: 40px;
    background-color: #13ce66;
    box-shadow: 0px 2px 30px rgba(47, 47, 47, 0.5);
  }
  li {
    z-index: 200;
    position: absolute;
    right: 2px;
    top: 2px;
    color: white;
  }
}

.hoverGrap {
  opacity: 0;
  position: absolute;
  z-index: 100;
  background-color: rgba(0,0,0,0.2);
  height: 100%;
  width: 100%;
  transition: opacity ease 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.uploader-container:hover .hoverGrap {
  opacity: 1;
}
</style>
