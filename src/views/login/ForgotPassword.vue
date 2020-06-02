<template>
  <el-row
    tag="section"
    type="flex"
    justify="center"
    class="main-container"
    id="forgotPassword"
  >
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
      <el-col :span="12" :offset="1" class="login-container">
        <el-col :span="22">
          <el-row class="col-center">
            <el-row class="text-container" style="padding: 50px 0px">
              <h1 class="header">
                Recuperación de Contraseña
              </h1>
            </el-row>
            <div class="text-container" style="padding: 20% 0 15px 0">
              <h1 class="info">
                Por favor, ingrese su correo para hacerle
              </h1>
              <h1 class="info">
                envio de su password
              </h1>
            </div>
            <el-form
              label-position="top"
              autoComplete="on"
              :model="model"
              :rules="rules"
              ref="form"
              :disabled="loading"
              @keyup.enter.native="beforeSubmit()"
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
              <el-form-item class="submit">
                <el-button
                  type="primary"
                  :loading="loading"
                  @click.native.prevent="beforeSubmit()">
                  Recuperar Contraseña
                </el-button>
              </el-form-item>
            </el-form>
            <router-link to="/login">
              Regresar
            </router-link>
          </el-row>
        </el-col>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import axios from 'axios';
import { Notification } from 'element-ui';

export default {
  data() {
    return {
      checked: true,
      loading: false,
      model: {
        email: '',
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
      },
    };
  },
  methods: {
    async forgotPassword(email) {
      try {
        const http = axios.create({
          baseURL: 'http://165.22.137.217:3000/api/',
          timeout: 10000,
          headers: {
            Authorization: 'Bearer 123',
            lang: 'es',
          },
        });
        const method = 'post';
        const url = 'user/forgotPassword';
        const data = {
          email,
        };
        const response = await http({ method, url, data });
        const isSuccess = response.status === 200;
        const haveData = !!response.data;
        if (isSuccess && haveData) {
          const { message } = response.data;
          Notification({
            type: 'success',
            title: 'Éxito!',
            message,
          });
        } else {
          const { message } = response.data;
          Notification({
            type: 'success',
            title: 'Éxito!',
            message,
          });
        }
      } catch (err) {
        const { data } = err.response;
        const { error } = data;
        Notification({
          type: 'error',
          title: 'Ha ocurrido un error',
          message: error,
        });
      }
    },
    beforeSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submit();
        }
      });
    },
    async submit() {
      this.loading = true;
      try {
        const { email } = this.model;
        this.forgotPassword(email);
      } catch (e) {
        this.$errorNotify(e);
      }
      this.loading = false;
    },
  },
};
</script>

<style lang="scss">
#forgotPassword {
  .el-form-item__label {
    padding: 0;
    line-height: 20px;
  }
}
</style>

<style lang="scss" scoped>
.main-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #F5F4F4;
  align-items: center;
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
          flex-direction: column;
          justify-content: left;
          h1 {
            margin: 0px;
            font-family: 'monserrat';
            font-weight: 300;
            color: #9B9B9B !important;
          }
        }
        a {
          font-size: 14px;
          color: #9B9B9B;
          width: 20%;
        }
        a:hover {
          text-decoration: underline;
        }
        .submit {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20% !important;
        }
        .header {
          font-size: 26px;
        }
        .info {
          font-size: 20px;
        }
        .elform {
          margin-top: 0px;
        }
        .el-form-item {
          margin-top: 0px;
          // input {
          //   border: 0;
          //   outline: 0;
          //   background: transparent;
          //   border-bottom: 1px solid #D8D8D8;
          // }
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
