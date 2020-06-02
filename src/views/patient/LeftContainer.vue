<template>
  <div class="left">
    <el-container v-if="isProfile">
      <el-main>
        <div class="center">
          <Avatar
            :src="
              currentRow.avatar ? `${baseURL}/static/patient/avatar/${currentRow.avatar}` : null
            "
            :size="110"
            shape="square"
          />
          <p style="font-size:20px;width:80%;color:#2F3749;font-weight: bold;">
            {{currentRow.fullName || ''}}
          </p>
          <p style="margin-top:2px;color:#101F41;">
            {{currentRow.gender || ''}}
          </p>
        </div>
        <div class="info">
          <div class="info-row">
            <div class="img-cont">
              <div class="col">
                  <img
                  style="height:25px!important;"
                  draggable="false"
                  src="@/assets/mail-icon.png"
                >
              </div>
            </div>
            <div>
              <p class="info-title">
                Correo Electrónico
              </p>
              <p class="info-content">
                {{currentRow.email || 'Sin registrar'}}
              </p>
            </div>
          </div>
          <div class="info-row">
            <div class="img-cont">
              <div class="col">
                <img
                  draggable="false"
                  src="@/assets/phone-icon.png"
                >
              </div>
            </div>
            <div>
              <p class="info-title">
                Número fijo
              </p>
              <p class="info-content">
                {{currentRow.phone || 'Sin registrar'}}
                <br v-if="currentRow.extraPhone" >
                {{currentRow.extraPhone || ''}}
              </p>
            </div>
          </div>
          <div class="info-row">
            <div class="img-cont"/>
            <div>
              <p class="info-title">
                Número celular
              </p>
              <p class="info-content">
                {{currentRow.cellPhone || 'No'}}
              </p>
            </div>
          </div>
          <div class="info-row">
            <div class="img-cont">
              <div class="col">
                <img
                  draggable="false"
                  src="@/assets/Pin.png"
                >
              </div>
            </div>
            <div class="title-content">
              <p class="info-title">
                Domicilio
              </p>
              <p class="info-content" >
                {{currentRow.fullAddress || 'Sin registrar'}}
              </p>
            </div>
          </div>
        </div>
      </el-main>
      <el-footer>
        <p>
          EXPEDIENTE: {{currentRow.id || ''}}
        </p>
      </el-footer>
    </el-container>

    <el-container v-else>
      <div class="top-title">
        <span>
          ANTECEDENTES PERSONALES
        </span>
      </div>
      <el-main>
        <div>
          <p class="title">
            USO DE LENTES
          </p>
          <p class="content">
            {{currentRow.glasses ? 'Si' : 'No'}}
          </p>
        </div>
        <div>
          <p class="title">
            DIABETES
          </p>
          <p class="content">
            {{currentRow.diabetes ? 'Si' : 'No'}}
          </p>
        </div>
        <div>
          <p class="title">
            GLAUCOMA
          </p>
          <p class="content">
            {{currentRow.glaucoma ? 'Si' : 'No'}}
          </p>
        </div>
        <div>
          <p class="title">
            ALCOHOLISMO
          </p>
          <p class="content">
            {{currentRow.alcoholism ? 'Si' : 'No'}}
          </p>
        </div>
        <div>
          <p class="title">
            HEPATITIS
          </p>
          <p class="content">
            {{currentRow.hepatitis ? 'Si' : 'No'}}
          </p>
        </div>
        <div>
          <p class="title">
            TABAQUISMO
          </p>
          <p class="content">
            {{currentRow.tabaquism ? 'Si' : 'No'}}
          </p>
        </div>
        <div>
          <p class="title">
            CANCER
          </p>
          <p class="content">
            {{currentRow.cancer ? 'Si' : 'No'}}
          </p>
        </div>
        <div>
          <p class="title">
            MIOPIA
          </p>
          <p class="content">
            {{currentRow.miophy ? 'Si' : 'No'}}
          </p>
        </div>
        <div>
          <p class="title">
            CATARATAS CONGÉNITAS
          </p>
          <p class="content">
            {{currentRow.cataracts ? 'Si' : 'No'}}
          </p>
        </div>
        <div>
          <p class="title">
            HIPERTENSIÓN ARTERIAL
          </p>
          <p class="content">
            {{currentRow.hypertension ? 'Si' : 'No'}}
          </p>
        </div>
        <div>
          <p class="title">
            ALERGIAS
          </p>
          <p class="content">
            {{currentRow.allergy ? 'Si' : 'No'}}
          </p>
        </div>
        <div>
          <p class="title">
            VIH
          </p>
          <p class="content">
            {{currentRow.vih ? 'Si' : 'No'}}
          </p>
        </div>
      </el-main>
      <el-footer>
        <p>
          EXPEDIENTE: {{currentRow.id || ''}}
        </p>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { originalURL } from '../../API';

export default {
  name: 'LeftContainer',
  props: {
    currentRow: {
      type: Object,
    },
    isProfile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      baseURL: originalURL,
    };
  },
};
</script>

<style lang="scss">
.el-container {
  height: 100%;
  min-height: 500px;
  .el-main {
    padding: 10px;
  }
}
.info-row {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}
.img-cont {
  width: 50px!important;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .col {
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
.info {
  margin-top: 25px;
  .title-content {
    width: 80%;
  }
  .info-title {
    font-weight: bold;
    font-size: 15px;
    margin: 0px;
    color: #2F3749;
  }
  .info-content {
    margin: 0px;
    margin-top: 2px 0px 0px 0px;
    color: #101F41;
  }
}
.left {
    background-color: #F4FAFF;
    width: 40%;
    height: 100%;
    .top-title {
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: #D4E2F0;
      text-align: center;
      height: 60px;
      font-size: 18px;
      font-weight: bold;
      box-shadow: 0px 5px 5px rgba(136,136,136,0.5);
      -webkit-box-shadow: 0px 5px 5px rgba(136,136,136,0.5);
      -moz-box-shadow: 0px 5px 5px rgba(136,136,136,0.5);
      span{
        width: 100%;
        color: #040E28;
      }
    }
    .el-main {
      margin-top: 20px;
      width: 100%;
      padding: 0px 25px 25px;
      .title {
        margin: 0px;
        margin-top: 5px;
        font-weight: bold;
        color: #000;
      }
      .content {
        margin-top: 2px;
        margin: 0px;
        color: #808C95;
        padding: 0px;
      }
    }
  }
</style>
