<template>
  <el-container class="main">
    <el-row
      type="flex"
      justify="center"
      align="middle"
      style="
        width: 100%;
        height: 100%;
      "
    >
      <el-col
        :xl="5"
        :lg="8"
        :md="10"
        :sm="12"
        :xs="18"
      >
        <el-form
          :model="form"
          :rules="rules"
          ref="form"
          @keyup.enter.native="submit"
        >
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="form.password"
              placeholder="Contraseña"
            />
          </el-form-item>
          <el-form-item prop="newPassword">
            <el-input
              type="password"
              v-model="form.newPassword"
              placeholder="Contraseña Nueva"
            />
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input
              type="password"
              v-model="form.confirmPassword"
              placeholder="Contraseña"
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
        password: '',
        newPassword: '',
        confirmPassword: '',
      },
      rules: {
        password: [
          {
            required: true,
            message: 'El campo requerido.',
            trigger: 'blur',
          },
          {
            min: 6,
            message: 'El campo debe tener almenos 6 caracteres.',
            trigger: 'blur',
          },
        ],
        newPassword: [
          {
            required: true,
            message: 'El campo requerido.',
            trigger: 'blur',
          },
          {
            min: 6,
            message: 'El campo debe tener almenos 6 caracteres.',
            trigger: 'blur',
          },
        ],
        confirmPassword: [
          {
            required: true,
            message: 'El campo requerido.',
            trigger: 'blur',
          },
          {
            min: 6,
            message: 'El campo debe tener almenos 6 caracteres.',
            trigger: 'blur',
          },
          {
            validator: (rule, val, cb) => {
              if (val !== this.form.newPassword) {
                return cb(new Error('La contraseña no coincide'));
              }
              return cb();
            },
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
  },
  methods: {
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true;
            const {
              password,
              newPassword,
            } = this.form;
            const response = await this.axios.patch('user/changepassword', {
              currentPassword: password,
              newPassword,
            });
            if (response) {
              this.$notify({
                type: 'success',
                title: '!Éxito¡',
                message: response.data.message,
              });
              this.form.password = '';
              this.form.newPassword = '';
              this.form.confirmPassword = '';
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
      overflow: hidden;
      height: 150px;
      width: 150px;
      border: solid 1px #FFFFFF;
      background-color: #CEDCE6;
      border-radius: 125px;
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
      margin: 20px 0px 30px 0px;
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
