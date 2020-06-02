<template>
  <el-container tag="section" class="main-container" id="login">
    <el-row type="flex" justify="center" class="container">
      <el-col tag="picture" :span="12" class="img-container">
        <div class="img-container_inner">
          <img
            draggable="false"
            src="../../assets/login-bg-image.png"
          >
        </div>
        <div class="logo-info">
          <img
            class="logo"
            draggable="false"
            src="../../assets/bg-img-logo.png"
          >
          <div class="info">
            <div class="txt1">
              <p>
                ¡Hola!
              </p>
            </div>
            <div class="txt2">
              <p>
                Bienvenidos a la
              </p>
              <p>
                Plataforma de Servicios
              </p>
              <p>
                Fundación Codet
              </p>
              </div>
              <div class="txt3">
              <p>
                Inicia Sesión para acceder.
              </p>
              <p>
                Si tienes duda pregunta
                al administrador del sistema
              </p>
              <p>
                por tus credenciales
              </p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12" :offset= "1" class="login-container">
        <el-col :span="22">
          <el-row class="col-center">
            <el-row class="text-container welcome">
              <h1>
              ¡Bienvenido!
              </h1>
            </el-row>
            <el-row class="text-container">
              <h1>
                Inicie Sesión:
              </h1>
            </el-row>
            <el-form
              label-position="top"
              autoComplete="on"
              :model="model"
              :rules="rules"
              ref="loginFmr"
              :disabled="loading"
              @keyup.enter.native="handleLogin()"
              @submit.native.prevent
            >
              <el-form-item label="Correo electrónico" prop="email">
                <el-input
                  id="email"
                  name="email"
                  type="text"
                  v-model="model.email"
                  autoComplete="on"
                  class="input"
                  />
              </el-form-item>
              <el-form-item label="Contraseña" prop="password">
                <el-input
                  id="password"
                  name="password"
                  v-model="model.password"
                  autoComplete="on"
                  ref="password"
                  class="input"
                  show-password
                />
              </el-form-item>
              <!-- <div class="options">
                <router-link to="/forgotPassword">
                  Olvide mi contraseña
                </router-link>
              </div> -->
              <el-form-item class="submit">
                <el-button
                  type="primary"
                  :loading="loading"
                  @click="handleLogin()">
                  Iniciar Sesión
                </el-button>
              </el-form-item>
            </el-form>
          </el-row>
        </el-col>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>

export default {
  data() {
    return {
      checked: true,
      loading: false,
      passwordType: 'password',
      redirect: '/',
      model: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          {
            required: true,
            message: 'El campo no puede estar vacío.',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: 'El campo no es un correo electrónico válido',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: 'El campo no puede estar vacío.',
            trigger: 'blur',
          },
          {
            min: 6,
            message: 'Longitud mínima de 6 caracteres',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginFmr.validate((valid) => {
        if (valid) {
          this.loading = true;
          const { email, password } = this.model;
          return this.$store.dispatch('auth/login', { email, password })
            .then(() => {
              this.loading = false;
              this.$store.dispatch('app/setLoginDate');
              return this.$router.push({ path: this.redirect || '/' });
            })
            // eslint-disable-next-line
            .catch((e) => {
              if (e) {
                this.$errorNotify(e);
              }
              this.loading = false;
            });
        }
        return false;
      });
    },
  },
  watch: {
    $route: {
      handler(route) {
        const { query } = route;
        if (query) {
          this.redirect = query.redirect;
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
#login {
  .el-form-item__label {
    padding: 0;
    line-height: 20px;
  }
}
</style>

<style lang="scss" scoped>
.main-container {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #F5F4F4;
  .container {
    z-index: 2;
    width: 80%;
    height: 80%;
    -webkit-box-shadow: 0px 0px 137px 0px rgba(119,3,19,0.19);
    -moz-box-shadow: 0px 0px 137px 0px rgba(119,3,19,0.19);
    box-shadow: 0px 0px 137px 0px rgba(119,3,19,0.19);
    .img-container {
      position: relative;
      .img-container_inner {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        img {
          min-height: 100%;
          min-width: 100%;
          object-fit: cover;
          max-width: 100%;
          max-height: 100%;
        }
      }
      .logo-info {
        position: absolute;
        display: flex;
        align-items: center;
        flex-direction: column;
        font-family: 'abel';
        width: 100%;
        height: 100%;
        overflow: hidden;
        .logo {
          margin-top: 50px;
          margin-bottom: 40px;
          width: 40%;
          object-fit: contain;
          min-width: 200px;
        }
        .info {
          text-align: center;
          width: 90%;
          display: flex;
          flex-direction: column;
          color: #FFF;
          .txt1 {
            padding: 10px 0px 10px 0px;
            p{
              font-size: 35px;
              font-weight: 400;
              font-style: normal;
              margin: 0px;
            }
          }
          .txt2 {
            padding: 10px 0px 10px 0px;
            p {
              font-size: 28px;
              font-weight: 300;
              font-style: normal;
              margin: 0px;
            }
          }
          .txt3 {
            padding: 10px 0px 10px 0px;
            p{
              font-size: 22px;
              font-weight:initial;
              font-style: normal;
              margin: 0px;
            }
          }
        }
      }
    }
    .login-container {
      text-align: left;
      overflow: auto;
      .col-center {
        display: flex;
        justify-content: center;
        flex-direction: column;
        .text-container {
          display: flex;
          justify-content: left;
          align-items: center;
          h1 {
            font-weight: 300;
            color: #9B9B9B !important;
          }
        }
        .welcome {
          font-size: 30px;
          margin-top: 20px;
          margin-bottom: 30px;
        }
        .submit {
          display: flex;
          justify-content: center;
          align-items: center;
          padding-top: 20px;
        }
        .options {
          display: flex;
          justify-content: left;
          flex-direction: column;
          a {
            margin-top: 5px;
            font-size: 14px;
            color: #9b9b9b;
            width: 30%;
          }
          a:hover {
            text-decoration: underline;
          }
        }
        .el-form-item {
          .input {
            outline: none;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
