<template>
  <el-container class="main">
    <el-row
      style="
        width: 100%;
        height: auto;
      "
      type="flex"
      justify="center"
    >
      <el-col
        :xl="5"
        :lg="8"
        :md="10"
        :sm="12"
        :xs="18"
      >
        <el-row
          type="flex"
          justify="center"
          style="width: 100%"
        >
          <el-col class="avatar-wrapper">
            <input
              id="fileInput"
              ref="fileInp"
              type="file"
              style="display: none;"
              v-on:change="setImage">
            <div class="component" @click="openfile">
              <Avatar
                :src="avatar"
                :size="150"
                fit="cover"
                style="cursor: pointer;"
              />
              <div id="overflow-avatar">
                Cambiar foto de perfil
              </div>
            </div>
          </el-col>
        </el-row>
        <el-form
          :model="form"
          :rules="rules"
          ref="form"
          @keyup.enter.native="submit"
        >
          <el-form-item prop="firstName">
            <el-input
              prefix-icon="el-icon-user"
              v-model="form.firstName"
              placeholder="Nombre"
              maxlength="100"
            />
          </el-form-item>
          <el-form-item prop="lastName">
            <el-input
              prefix-icon="el-icon-user"
              v-model="form.lastName"
              placeholder="Apellido"
              maxlength="100"
            />
          </el-form-item>
          <el-form-item prop="birthdate">
            <el-date-picker
              v-model="form.birthdate"
              type="date"
              placeholder="Fecha de nacimiento"
              style="width: 100%"
              maxlength="10"
            />
          </el-form-item>
          <el-form-item prop="email">
            <el-input
              prefix-icon="el-icon-user"
              v-model="form.email"
              placeholder="Correo eletrónico"
              maxlength="255"
            />
          </el-form-item>
          <el-form-item prop="phoneNumber">
            <el-input
              prefix-icon="el-icon-phone-outline"
              v-model="form.phoneNumber"
              placeholder="Número de teléfono"
              maxlength="12"
            />
          </el-form-item>
          <el-button
            @click="submit"
            type="primary"
            style="width: 100%"
          >
            Actualizar
          </el-button>
        </el-form>
      </el-col>
    </el-row>
  </el-container>
</template>
<script>
import { mapState } from 'vuex';
import { originalURL } from '../API';

export default {
  data() {
    return {
      baseURL: originalURL,
      avatar: '',
      loading: false,
      loadingService: null,
      form: {
        firstName: '',
        lastName: '',
        birthdate: '',
        email: '',
        phoneNumber: null,
      },
      rules: {
        firstName: [
          {
            required: true,
            message: 'El campo es requerido',
            trigger: 'blur',
          },
          {
            max: 255,
            message: 'El campo excede el limite de caracteres',
            trigger: 'blur',
          },
        ],
        lastName: [
          {
            required: true,
            message: 'El campo es requerido',
            trigger: 'blur',
          },
          {
            max: 255,
            message: 'El campo excede el limite de caracteres',
            trigger: 'blur',
          },
        ],
        birthdate: [
          {
            required: true,
            message: 'El campo es requerido',
            trigger: 'blur',
          },
        ],
        email: [
          {
            required: true,
            message: 'El campo es requerido',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: 'Correo electrónico no válido.',
            trigger: 'blur',
          },
        ],
        phoneNumber: [
          {
            required: true,
            message: 'Número de teléfono no válido.',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
    avatarSrc() {
      return this.user.avatar;
    },
  },
  methods: {
    openfile() {
      document.getElementById('fileInput').click();
    },
    async setImage() {
      try {
        this.loading = true;
        const file = this.$refs.fileInp.files;
        if (file.length) {
          const MbLimit = 1;
          const size = file[0].size / 1024 / 1024 < MbLimit;
          const isPNG = file[0].type === 'image/png';
          if (isPNG) {
            if (size) {
              const data = new FormData();
              data.append('file', file[0]);
              const response = await this.axios.patch('user/avatar', data, {
                'content-type': 'application/form-data',
              });
              if (response) {
                this.avatar = null;
                this.$notify({
                  title: '!Éxito!',
                  message: response.data.message,
                });
                this.$store.dispatch('auth/updateUser', {
                  ...this.user,
                  avatar: response.data.image,
                });
              }
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
        this.loading = false;
      } catch (error) {
        this.$errorNotify(error);
      }
      this.loading = false;
    },
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true;
            const {
              firstName,
              lastName,
              email,
              birthdate,
              phoneNumber,
            } = this.form;
            const response = await this.axios.put('user/info', {
              firstName,
              lastName,
              email,
              birthdate,
              phoneNumber,
            });
            if (response) {
              this.$notify({
                type: 'success',
                title: '!Éxito¡',
                message: response.data.message,
              });
              this.$store.dispatch('auth/updateUser', {
                ...this.user,
                firstName,
                lastName,
                email,
                birthdate,
                phoneNumber,
              });
            }
            this.loading = false;
          } catch (error) {
            this.loading = false;
            this.$errorNotify(error);
          }
        }
      });
    },
  },
  mounted() {
    if (this.avatarSrc) {
      this.avatar = `${this.baseURL}/static/user/avatar/${this.avatarSrc}`;
    }
    this.form.firstName = this.user.firstName;
    this.form.lastName = this.user.lastName;
    this.form.avatar = this.user.avatar;
    this.form.email = this.user.email;
    this.form.birthdate = this.user.birthdate;
    this.form.phoneNumber = this.user.phoneNumber;
  },
  watch: {
    loading(val) {
      if (val && !this.loadingService) {
        this.loadingService = this.$loading({
          fullscreen: true,
          lock: true,
          text: 'Cargando',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        });
      } else if (this.loadingService) {
        this.loadingService.close();
        this.loadingService = null;
      }
    },
    avatarSrc(val) {
      if (val) {
        this.avatar = `${this.baseURL}/static/user/avatar/${this.avatarSrc}`;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  background-color: #FFFFFF;
  width: calc(100% - 30px);
  margin-left: 15px;
  margin-top: 15px;
  height: calc(100% - 30px);
  position: relative;
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  overflow-y:auto;
  .avatar-wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    .component {
      position: relative;
      overflow: hidden;
      height: 150px;
      width: 150px;
      border: solid 1px #FFFFFF;
      background-color: #CEDCE6;
      border-radius: 125px;
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
      margin: 20px 0px 30px 0px;
      &:hover #overflow-avatar {
        display: flex !important;
      }
      #overflow-avatar {
        top: 50%;
        position: absolute;
        width: 100%;
        height: 40%;
        background-color: rgba(0, 0, 0, 0.4);
        display: none;
        flex-direction: column;
        align-items: center;
        box-shadow: 0px 0px 30px 30px rgba(0, 0, 0, 0.4);
        justify-content: center;
        color:#FFFFFF;
        z-index: 10;
        cursor: pointer;
      }
    }
    .uploader-btn {
      cursor: pointer;
      b {
        text-decoration: underline;
      }
    }
  }
}
</style>
