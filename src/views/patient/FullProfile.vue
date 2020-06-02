<template>
  <el-row class="row" id="fullProfile">
    <el-col class="col">
      <Title2
        :isFullProfile="true"
        :title="'VISTA PERFIL COMPLETO'"
        label="Visualización del Perfil Completo del Paciente"
        v-on:showHistory="showHistory = true"
        v-on:print="print"
      />
      <div class="profile row" v-if="patientData">
        <div class="left">
          <el-container>
            <el-main>
              <div class="row-no-center" >
                <Avatar
                  :src="
                    patient.avatar ? `${baseURL}/static/patient/avatar/${patient.avatar}` : null
                  "
                  :size="110"
                  shape="square"
                  style="margin-right: 10px"
                />
                <div class="col">
                  <div>
                    <p class="name">
                      {{ patient.fullName || '' }}
                    </p>
                  </div>
                  <div class="row-no-center">
                    <div>
                      <p class="title">
                        Sexo
                      </p>
                      <p class="content">
                        {{ patient.gender || 'Sin registrar' }}
                      </p>
                    </div>
                    <div style="background:#2242CB; width: 1px; margin: 15px 5px 0px 5px;"/>
                    <div>
                      <p class="title">
                        Fecha de nacimiento
                      </p>
                      <p class="content">
                        {{ patient.birthdate || 'Sin registrar' }}
                        ({{ $ageAsWords(patient.birthdate) }})
                      </p>
                    </div>
                  </div>
                  <div class="row-no-center">
                    <div>
                      <p class="title">
                        Teléfono fijo
                      </p>
                      <p class="content">
                        {{ patient.phone || 'Sin registrar' }}
                      </p>
                    </div>
                    <div style="background:#2242CB; width: 1px; margin: 15px 5px 0px 5px;"/>
                    <div>
                      <p class="title">
                        Celular
                      </p>
                      <p class="content">
                        {{ patient.cellPhone || 'Sin registrar' }}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p class="title">
                        Correo electrónico
                      </p>
                      <p class="content">
                        {{ patient.email || 'Sin registrar' }}
                      </p>
                  </div>
                </div>
              </div>
              <div>
                <p class="title">
                  DOMICILIO
                </p>
                <p class="content">
                  {{ patient.fullAddress || 'Sin registrar' }}
                </p>
              </div>
              <div>
                <p class="title">
                  LUGAR DE NACIMIENTO
                </p>
                <p class="content">
                  {{ patient.birthplace || 'Sin registrar' }}
                </p>
              </div>
              <div class="row-no-center">
                <div style="padding-right: 60px;">
                  <p class="title">
                    RANGO DE EDAD
                  </p>
                  <p class="content">
                    {{ patient.ageRange }}
                  </p>
                  <p class="title">
                    ETNIA
                  </p>
                  <p class="content">
                    {{ patient.etnia || 'N/A' }}
                  </p>
                </div>

                <div>
                  <p class="title">
                    ESTADO CIVIL
                  </p>
                  <p class="content">
                    {{ patient.maritalStatus  || 'Sin registrar' }}
                  </p>
                  <p class="title">
                    DERECHOHABIENCIA
                  </p>
                  <p class="content">
                    {{ patient.affiliation || 'N/A' }}
                  </p>
                </div>
              </div>
              <div class="row-no-center">
                <div>
                  <p class="title">
                    PARTICIPA CÓMO
                  </p>
                  <p class="content">
                    {{ patient.participateAs || 'Sin registrar' }}
                  </p>
                  <p class="title">
                    OCUPACIÓN
                  </p>
                  <p class="content">
                    {{ patient.occupation || 'Sin registrar' }}
                  </p>
                  <p class="title">
                    REFERENCIA
                  </p>
                  <p class="content">
                    {{ patient.reference || 'N/A' }}
                  </p>
                </div>
              </div>
            </el-main>
            <el-footer>
              <p>
                EXPEDIENTE: {{ paramId }}
              </p>
            </el-footer>
          </el-container>
        </div>
        <div class="right" id="print">
          <div>
            <Title
              class="header"
              text="ANTECEDENTES"
              :clossable="false"
              :editable="hasPermission(['FD', 'TS'])"
              :patientId="paramId"
              :url="'admin/patient/general-profile'"/>
            <div
              class="col-no-center personal-history"
              v-if="haveData"
            >
              <div class="section">
                <p class="sec-title">
                  <el-divider content-position="left">
                    FAMILIARES
                  </el-divider>
                </p>
              </div>
              <div class="row-no-center" style="padding:0px 10px 10px 10px;">
                <div style="width: 25%">
                  <p class="title">
                    USO DE LENTES
                  </p>
                  <p class="content">
                    {{ patient.familyGlasses ? "SI" : "No"}}
                  </p>
                </div>
              </div>
              <div class="row-no-center" style="padding:0px 10px 10px 10px;">
                <div style="width: 25%">
                  <p class="title">
                    DIABETES
                  </p>
                  <p class="content">
                    {{ patient.familyDiabetes ? "SI" : "No"}}
                  </p>
                </div>
                <div style="width: 25%">
                  <p class="title">
                    GLAUCOMA
                  </p>
                  <p class="content">
                    {{ patient.familyGlaucoma ? "SI" : "No"}}
                  </p>
                </div>
                <div style="width: 25%">
                  <p class="title">
                    ALCOHOLISMO
                  </p>
                  <p class="content">
                    {{ patient.familyAlcoholism ? "SI" : "No"}}
                  </p>
                </div>
                <div style="width: 25%">
                  <p class="title">
                    HEPATITIS
                  </p>
                  <p class="content">
                    {{ patient.familyHepatitis ? "SI" : "No"}}
                  </p>
                </div>
              </div>
              <div class="row-no-center" style="padding:0px 10px 10px 10px;">
                <div style="width: 25%">
                  <p class="title">
                    TABAQUISMO
                  </p>
                  <p class="content">
                    {{ patient.familySmoking ? "SI" : "No"}}
                  </p>
                </div>
                <div style="width: 25%">
                  <p class="title">
                    CANCER
                  </p>
                  <p class="content">
                    {{ patient.familyCancer ? "SI" : "No"}}
                  </p>
                </div>
                <div style="width: 25%">
                  <p class="title">
                    MIOPIA
                  </p>
                  <p class="content">
                    {{ patient.familyMyopia ? "SI" : "No"}}
                  </p>
                </div>
                <div style="width: 25%">
                  <p class="title">
                    ALERGIAS
                  </p>
                  <p class="content">
                    {{ patient.familyAllergy ? "SI" : "No"}}
                  </p>
                </div>
              </div>
              <div class="row-no-center" style="padding:0px 10px 10px 10px;">
                <div style="width: 25%">
                  <p class="title">
                    CATARATAS CONGENITAS
                  </p>
                  <p class="content">
                    {{ patient.familyCongenitalCataracts ? "SI" : "No"}}
                  </p>
                </div>
                <div style="width: 25%">
                  <p class="title">
                    HIPERTENSIÓN ARTERIAL
                  </p>
                  <p class="content">
                    {{ patient.familyArterialHypertension ? "SI" : "No"}}
                  </p>
                </div>
                <div style="width: 25%">
                  <p class="title">
                    VIH
                  </p>
                  <p class="content">
                    {{ patient.familyVih ? "SI" : "No"}}
                  </p>
                </div>
              </div>
              <div class="section">
                <p class="sec-title">
                  <el-divider content-position="left">
                    PERSONALES
                  </el-divider>
                </p>
              </div>
              <div class="row-no-center" style="padding:0px 10px 10px 10px;">
                <div style="width: 25%">
                  <p class="title">
                    USO DE LENTES
                  </p>
                  <p class="content">
                    {{ patient.glasses ? "SI" : "No"}}
                  </p>
                </div>
              </div>
              <div class="row-no-center" style="padding:0px 10px 10px 10px;">
                <div style="width: 25%">
                  <p class="title">
                    DIABETES
                  </p>
                  <p class="content">
                    {{ patient.diabetes ? "SI" : "No"}}
                  </p>
                </div>
                <div style="width: 25%">
                  <p class="title">
                    GLAUCOMA
                  </p>
                  <p class="content">
                    {{ patient.glaucoma ? "SI" : "No"}}
                  </p>
                </div>
                <div style="width: 25%">
                  <p class="title">
                    ALCOHOLISMO
                  </p>
                  <p class="content">
                    {{ patient.alcoholism ? "SI" : "No"}}
                  </p>
                </div>
                <div style="width: 25%">
                  <p class="title">
                    HEPATITIS
                  </p>
                  <p class="content">
                    {{ patient.hepatitis ? "SI" : "No"}}
                  </p>
                </div>
              </div>
              <div class="row-no-center" style="padding:0px 10px 10px 10px;">
                <div style="width: 25%">
                  <p class="title">
                    TABAQUISMO
                  </p>
                  <p class="content">
                    {{ patient.smoking ? "SI" : "No"}}
                  </p>
                </div>
                <div style="width: 25%">
                  <p class="title">
                    CANCER
                  </p>
                  <p class="content">
                    {{ patient.cancer ? "SI" : "No"}}
                  </p>
                </div>
                <div style="width: 25%">
                  <p class="title">
                    MIOPIA
                  </p>
                  <p class="content">
                    {{ patient.myopia ? "SI" : "No"}}
                  </p>
                </div>
                <div style="width: 25%">
                  <p class="title">
                    ALERGIAS
                  </p>
                  <p class="content">
                    {{ patient.allergy ? "SI" : "No"}}
                  </p>
                </div>
              </div>
              <div class="row-no-center" style="padding:0px 10px 10px 10px;">
                <div style="width: 25%">
                  <p class="title">
                    CATARATAS CONGENITAS
                  </p>
                  <p class="content">
                    {{ patient.congenitalCataracts ? "SI" : "No"}}
                  </p>
                </div>
                <div style="width: 25%">
                  <p class="title">
                    HIPERTENSIÓN ARTERIAL
                  </p>
                  <p class="content">
                    {{ patient.arterialHypertension ? "SI" : "No"}}
                  </p>
                </div>
                <div style="width: 25%">
                  <p class="title">
                    VIH
                  </p>
                  <p class="content">
                    {{ patient.vih ? "SI" : "No"}}
                  </p>
                </div>
              </div>
            </div>
            <div v-else class="no-data" :style="{height: height}">
              <h3>El perfil general aun no ha sido registrado</h3>
            </div>
          </div>
          <div>
            <Title
              class="header no-shadow-box"
              :text="'PERFIL OPTOMÉTRICO'"
              :clossable="false"
              :editable="hasPermission('OPTO')"
              :patientId="paramId"
              url="admin/evaluations/opto"
            />
            <OptoProfile :patientId="parseInt(this.$route.params.id, 10)" />
          </div>
          <div>
            <Title
              class="header no-shadow-box"
              :text="'PERFIL OFTALMOLÓGICO'"
              :clossable="false"
              :editable="hasPermission('MD')"
              :patientId="paramId"
              url="admin/evaluations/ofta"
            />
            <OftaProfile :patientId="parseInt(this.$route.params.id, 10)" />
          </div>
          <div>
            <Title
              class="header no-shadow-box"
              :text="'PERFIL SOCIOECONOMICO'"
              :clossable="false"
              :editable="hasPermission('TS')"
              :patientId="paramId"
              url="admin/evaluations/socialeva" />
            <SocEcProfile :patientId="parseInt(this.$route.params.id, 10)" />
          </div>
        </div>
        <el-dialog
          :visible.sync="showHistory"
          width="550px"
          :close-on-press-escape="false"
        >
          <transition name="slide-fade">
            <History
              class="History"
              v-on:close="showHistory = false"
              :patientId="paramId"
            />
          </transition>
        </el-dialog>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex';
import { originalURL } from '../../API';
import OftaProfile from '../profiles/Ofta';
import OptoProfile from '../profiles/Opto';
import SocEcProfile from '../profiles/SocioEconomic';
import Title2 from '../../components/Title2';
import Title from '../../components/Title';
import History from './History';

const moment = require('moment');

export default {
  data() {
    return {
      baseURL: originalURL,
      patient: null,
      patientData: false,
      haveData: false,
      loading: false,
      loadingService: null,
      height: !this.haveData ? '250px' : '450px',
      showHistory: false,
    };
  },
  components: {
    OftaProfile,
    OptoProfile,
    SocEcProfile,
    Title,
    Title2,
    History,
  },
  computed: {
    ...mapState({
      role: (state) => state.auth.user.role,
      auth: (state) => state.auth,
    }),
    paramId() {
      const { id } = this.$route.params;
      let val = id.match(/[0-9]/g);
      if (Array.isArray(val)) {
        val = parseInt(val.join(''), 10);
      }
      return val || NaN;
    },
  },
  methods: {
    print() {
      // Get HTML to print from element
      const prtHtml = document.getElementById('print').innerHTML;

      // Get all stylesheets HTML
      let stylesHtml = '';
      // eslint-disable-next-line
      for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
        stylesHtml += node.outerHTML;
      }

      // Open the print window
      const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

      WinPrint.document.write(
        `<!DOCTYPE html>
        <html>
          <head>
            ${stylesHtml}
          </head>
          <body>
            ${prtHtml}
          </body>
        </html>`,
      );

      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    },
    selectAgeRange(birthdate) {
      const bd = moment(birthdate);
      const today = moment().now;
      const diff = Math.abs(bd.diff(today, 'years'));
      if (diff < 1) {
        return 'Menor de 1 Año';
      }
      if (diff < 6) {
        return '1 a 5 Años';
      }
      if (diff < 12) {
        return '6 a 11 Años';
      }
      if (diff < 18) {
        return '12 a 17 Años';
      }
      if (diff < 30) {
        return '18 a 29 Años';
      }
      if (diff < 60) {
        return '30 a 60 Años';
      }
      return '60 Años o mas';
    },
    hasPermission(role) {
      const { id } = this.role;
      let flag = false;
      if (id === 'ADMIN') {
        flag = true;
      } else {
        flag = Array.isArray(role) ? role.includes(id) : id === role;
      }
      return flag;
    },
    async getData() {
      try {
        const id = this.paramId;
        const response = await this.axios.get(`patient/info/${id}`);
        const { data } = response;
        this.patient = data ? {
          ...data,
          fullName: `${data.firstName} ${data.lastName}`,
          ageRange: this.selectAgeRange(data.birthdate),
        } : this.patient;
        this.patientData = true;
        const response2 = await this.axios.get(`patient/profile/${id}`);
        const data2 = response2.data;
        this.patient = data && data2 ? {
          ...data,
          ...data2,
          fullName: `${data.firstName} ${data.lastName}`,
          fullAddress: `${data2.address}, \
            ${data2.city}, ${data2.state}, ${data2.country}`,
          ageRange: this.selectAgeRange(data2.birthdate),
        } : this.patient;
        if (data2) {
          this.haveData = true;
        }
      } catch (error) {
        this.$errorNotify(error);
      }
    },
    async checkPatient(id) {
      try {
        const response = await this.axios.get(`patient/check-id/${id}`);
        return response.status === 204;
      } catch (error) {
        return false;
      }
    },
  },
  async created() {
    const id = this.paramId;
    const isValid = await this.checkPatient(id);
    this.loading = true;
    if (!isValid) {
      this.$notify({
        type: 'warning',
        title: 'Error.',
        message: 'Parámetro no válido.',
        timeout: 2000,
      });
      this.$router.replace({ path: '/' });
    } else {
      await this.getData(id);
    }
    this.loading = false;
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

<style lang="scss">
.title {
  font-size: 12px!important;
}
.content {
  font-size: 12px!important;
}
.title {
  margin: 0px;
  margin-top: 10px;
  font-weight: bold;
  color: #000;
}
.content {
  margin-top: 2px;
  margin: 0px;
  color: #808C95;
}
.sec-title {
  font-size: 14px!important;
}
.sections {
  max-height: 2800px!important;
  overflow: unset!important;
}
.container {
  max-height: 2800px!important;
}
</style>
<style lang="scss">
#fullProfile {
  .el-dialog__header {
    padding: 0px!important;
  }
  .el-dialog__body {
    padding: 0px!important;
    height: 600px!important;
    .main-cont {
      height: 600px!important;
      .secs {
        height: 540px!important;
      }
    }
  }
  .el-dialog {
    margin-top: 5vh!important;
    min-width: unset !important;
    .History {
      width: 100% !important;
    }
  }
}
</style>
<style lang="scss" scoped>
.section {
  width: 100%;
  .title {
    font-weight: bold;
    color: #000000;
    margin: 0px;
    padding: 0 0 0 15px;
  }
  .sec-title {
    .el-divider__text {
      font-size: 16px;
      font-weight: bold;
      color: #49749F;
    }
  }
}
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .5s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(400px);
  opacity: 0;
}
.header {
  width: 100%;
  height: 50px;
  position: sticky;
  top: 0;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.row-no-center {
  display: flex;
  flex-direction: row;
}
.col {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.el-row {
  height: 100%;
  .el-col {
    // min-width: 700px;
    width:95%;
    height: 95%;
    .profile {
      padding-top: 20px;
      height: 90%;
      width: 100%;
      .left {
        width: 40%;
        height: 100%;
        .el-container {
          background-color: #F4FAFF!important;
          height: 100%!important;
          min-height: 0%;
          .el-main {
            padding: 10px 15px;
            margin: 0px;
          }
        }
        .name {
          font-weight: bold;
          margin: 0px;
          padding: 0px;
        }
        .gender {
          color: #101F41;
          margin: 0px;
          padding: 0px;
        }
        .title {
          font-size: 12px;
        }
        .content {
          font-size: 12px;
        }
      }
      .right {
        overflow-y: scroll;
        overflow-x: hidden;
        height: 100%;
        width: 60%;
        background-color: #fff;
        .no-data {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          height: 450px;
          h3 {
            color: #808C95;
            font-size: 21px;
          }
        }
        .title {
          font-size: 12px;
          margin: 0px;
          margin-top: 15px;
          font-weight: bold;
          color: #000;
        }
        .content {
          font-size: 12px;
          margin-top: 2px;
          margin: 0px;
          color: #808C95;
          padding: 0px;
        }
      }
    }
  }
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-track {
  border-radius: 5px;
}
::-webkit-scrollbar-thumb {
  background: #C2BEBF;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
  background: #B2AEAA;
}
</style>

<style lang="scss">
.row {
  display: flex;
  flex-direction: row;
  .right-container {
    background-color: #fff;
    width: 60%;
    height: 100%;
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-track {
      border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb {
      background: #C2BEBF;
      border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #B2AEAA;
    }
    .right-content {
      width: 100%;
      max-height: 440px;
      overflow-y: scroll;
      margin: 0px;
      .title {
        margin: 0px;
        margin-top: 15px;
        font-weight: bold;
        color: #000;
      }
      .content {
        margin-top: 2px;
        margin: 0px;
        color: #808C95;
      }
    }
  }
}
</style>
