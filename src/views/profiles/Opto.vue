<template>
  <div class="container">
    <div class="sections" v-if="haveData">
       <div class="section">
        <p class="sec-title">
          <el-divider content-position="left">
            OPTOMETRÍA
          </el-divider>
        </p>
        <div class="row">
          <div>
            <p class="title">
              PESO
            </p>
            <p class="content">
              {{optoeva.weight || ''}}
            </p>
          </div>
          <div>
            <p class="title">
              TALLA
            </p>
            <p class="content">
              {{optoeva.size || ''}}
            </p>
          </div>
        </div>
        <div class="row resp">
          <div class="row">
            <div>
              <p class="title">
                TENSIÓN ARTERIAL
              </p>
              <p class="content">
                {{optoeva.bloodPressure || ''}}
              </p>
            </div>
            <div>
              <p class="title">
                TEMPERATURA
              </p>
              <p class="content" v-if="isFullProfile">
                {{optoeva.temperature || ''}}
              </p>
              <p class="content" style="margin-top: 15px;" v-else>
                {{optoeva.temperature || ''}}
              </p>
            </div>
          </div>
          <div class="row">
            <div>
              <p class="title">
                FRECUENCIA CARDIACA
              </p>
              <p class="content">
                {{optoeva.heartRate || ''}}
              </p>
            </div>
            <div>
              <p class="title">
                FRECUENCIA RESPIRATORIA
              </p>
              <p class="content">
                {{optoeva.respiratoryRate || ''}}
              </p>
            </div>
          </div>
        </div>
        <div class="col">
          <p class="title" style="padding-top: 10px;">
            OPERACIÓN DE OJOS
          </p>
          <p class="content">
            {{optoeva.previousSurgery || 'N/A'}}
          </p>
          <p class="title" style="padding-top: 10px;">
            MEDICAMENTOS
          </p>
          <p class="content">
            {{optoeva.medicines || ''}}
          </p>
          <p class="title" style="padding-top: 10px;">
            PADECIMIENTO ACTUAL
          </p>
          <p class="content">
            {{optoeva.currentCondition || ''}}
          </p>
          <p class="title" style="padding-top: 10px;">
            COMENTARIOS
          </p>
          <p class="content">
            {{optoeva.comments || ''}}
          </p>
        </div>
      </div>
      <div class="section">
        <p class="sec-title">
          <el-divider content-position="left">
            ESQUEMAS DE AGUDEZA VISUAL SIN CORRECCIÓN
          </el-divider>
        </p>
        <div class="row resp">
          <div>
            <p class="title">
              PARAMETRO DE AV / OJO IZQUIERDO
            </p>
            <p class="content">
              {{optoevaeyeLeft.vaNoCorrection || ''}}
            </p>
          </div>
          <div>
            <p class="title">
              PARAMETRO DE AV / OJO DERECHO
            </p>
            <p class="content">
              {{optoevaeyeRight.vaNoCorrection || ''}}
            </p>
          </div>
        </div>
      </div>
      <div class="section">
        <p class="sec-title">
          <el-divider content-position="left">
            ESQUEMAS DE AGUDEZA VISUAL CON CORRECCIÓN
          </el-divider>
        </p>
        <div class="row resp">
          <div>
            <p class="title">
              PARAMETRO DE AV / OJO IZQUIERDO
            </p>
            <p class="content">
              {{optoevaeyeLeft.vaWithCorrection || ''}}
            </p>
          </div>
          <div>
            <p class="title">
              PARAMETRO DE AV / OJO DERECHO
            </p>
            <p class="content">
              {{optoevaeyeRight.vaWithCorrection || ''}}
            </p>
          </div>
        </div>
      </div>
      <div class="section">
        <p class="sec-title">
          <el-divider content-position="left">
            ESQUEMAS DE AGUDEZA VISUAL CON LENTES ACTUALES
          </el-divider>
        </p>
        <div class="row resp">
          <div>
            <p class="title">
              PARAMETRO DE AV / OJO IZQUIERDO
            </p>
            <p class="content">
              {{optoevaeyeLeft.vaWithGlasses || ''}}
            </p>
          </div>
          <div>
            <p class="title">
              PARAMETRO DE AV / OJO DERECHO
            </p>
            <p class="content">
              {{optoevaeyeRight.vaWithGlasses || ''}}
            </p>
          </div>
        </div>
      </div>
      <div class="section">
        <p class="sec-title">
          <el-divider content-position="left">
            ESQUEMAS DE AGUDEZA VISUAL CON AGUJERO ESTENOPEICO
          </el-divider>
        </p>
        <div class="row resp">
          <div>
            <p class="title">
              PARAMETRO DE AV / OJO IZQUIERDO
            </p>
            <p class="content">
              {{optoevaeyeLeft.vaWithStethoscopeHole || ''}}
            </p>
          </div>
          <div>
            <p class="title">
              PARAMETRO DE AV / OJO DERECHO
            </p>
            <p class="content">
              {{optoevaeyeRight.vaWithStethoscopeHole || ''}}
            </p>
          </div>
        </div>
      </div>
      <div class="section">
        <p class="sec-title">
          <el-divider content-position="left">
            LENTES ANTERIORES / LENSOMETRIA
          </el-divider>
        </p>
        <div class="row resp">
          <div>
            <p class="title">
              OJO IZQUIERDO
            </p>
            <div class="row">
              <div>
                <p class="title">
                  ESFERA
                </p>
                <p class="content">
                  {{optoevaeyeLeft.lensometrySphere || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  CILINDRO
                </p>
                <p class="content">
                  {{optoevaeyeLeft.lensometryCilinder || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  EJE
                </p>
                <p class="content">
                  {{optoevaeyeLeft.lensometryAxis || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  ADICIÓN
                </p>
                <p class="content">
                  {{optoevaeyeLeft.lensometryAddition || ''}}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p class="title">
              OJO DERECHO
            </p>
            <div class="row"  style="margin-left:0px!important">
              <div>
                <p class="title">
                  ESFERA
                </p>
                <p class="content">
                  {{optoevaeyeRight.lensometrySphere || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  CILINDRO
                </p>
                <p class="content">
                  {{optoevaeyeRight.lensometryCilinder || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  EJE
                </p>
                <p class="content">
                  {{optoevaeyeRight.lensometryAxis || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  ADICIÓN
                </p>
                <p class="content">
                  {{optoevaeyeRight.lensometryAddition || ''}}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <p class="sec-title">
          <el-divider content-position="left">
            REFRACCIÓN
          </el-divider>
        </p>
        <div class="row resp">
          <div>
            <p class="title">
              OJO IZQUIERDO
            </p>
            <div class="row">
              <div>
                <p class="title">
                  ESFERA
                </p>
                <p class="content">
                  {{optoevaeyeLeft.refractionSphere || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  CILINDRO
                </p>
                <p class="content">
                  {{optoevaeyeLeft.refractionCilinder || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  EJE
                </p>
                <p class="content">
                  {{optoevaeyeLeft.refractionAxis || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  ADICIÓN
                </p>
                <p class="content">
                  {{optoevaeyeLeft.refractionAddition || ''}}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p class="title">
              OJO DERECHO
            </p>
            <div class="row" style="margin-left:0px!important">
              <div>
                <p class="title">
                  ESFERA
                </p>
                <p class="content">
                  {{optoevaeyeRight.refractionSphere || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  CILINDRO
                </p>
                <p class="content">
                  {{optoevaeyeRight.refractionCilinder || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  EJE
                </p>
                <p class="content">
                  {{optoevaeyeRight.refractionAxis || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  ADICIÓN
                </p>
                <p class="content">
                  {{optoevaeyeRight.refractionAddition || ''}}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <p class="sec-title">
          <el-divider content-position="left">
            PRESIÓN INTRAOCULAR
          </el-divider>
        </p>
        <div class="row">
          <div>
            <p class="title">
            OJO IZQUIERDO
          </p>
          <p class="content">
            {{optoevaeyeLeft.intraocularPressure || ''}}
          </p>
          </div>
          <div>
            <p class="title">
            OJO DERECHO
          </p>
          <p class="content">
            {{optoevaeyeRight.intraocularPressure || ''}}
          </p>
          </div>
        </div>
        <div style="padding: 15px 0px 0px 10px;">
          <p class="title">
            OTROS PADECIMIENTOS
          </p>
          <p class="content">
            {{optoeva.otherCondition || 'N/A'}}
          </p>
        </div>
        <div style="padding: 15px 0px 0px 10px;">
          <p class="title">
            RX FINAL
          </p>
          <p class="content">
            {{optoeva.rxFinal || ''}}
          </p>
        </div>
        <div style="padding: 15px 0px 0px 10px; margin-bottom: 30px;">
          <p class="title">
            RX SUBJETIVA
          </p>
          <p class="content">
            {{optoeva.rxSubjective || ''}}
          </p>
        </div>
      </div>
    </div>
    <div v-else class="no-data" :style="{height: height}">
      <h3>Aun no se lleva a cabo la evaluación</h3>
    </div>
  </div>
</template>

<script>
import { Notification } from 'element-ui';

export default {
  name: 'Opto',
  props: {
    patientId: {
      type: Number,
    },
    isFullProfile: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      optoeva: {},
      optoevaeyeRight: {
        vaNoCorrection: '',
        vaWithCorrection: '',
        vaWithGlasses: '',
        vaWithStethoscopeHole: '',
        lensometrySphere: '',
        lensometryCilinder: '',
        lensometryAxis: '',
        lensometryAddition: '',
        refractionSphere: '',
        refractionCilinder: '',
        refractionAxis: '',
        refractionAddition: '',
        intraocularPressure: '',
      },
      optoevaeyeLeft: {
        vaNoCorrection: '',
        vaWithCorrection: '',
        vaWithGlasses: '',
        vaWithStethoscopeHole: '',
        lensometrySphere: '',
        lensometryCilinder: '',
        lensometryAxis: '',
        lensometryAddition: '',
        refractionSphere: '',
        refractionCilinder: '',
        refractionAxis: '',
        refractionAddition: '',
        intraocularPressure: '',
      },
      haveData: false,
      height: !this.haveData ? '250px' : '450px',
    };
  },
  methods: {
    formatEntry(data) {
      const left = data.eyes.filter((a) => a.eyeSide.toLowerCase() === 'left')[0];
      const right = data.eyes.filter((a) => a.eyeSide.toLowerCase() === 'right')[0];
      this.optoeva = data;
      this.optoevaeyeRight = right;
      this.optoevaeyeLeft = left;
    },
  },
  async created() {
    try {
      const response = await this.axios.get(`patient/opto/details/${this.patientId}`);
      const { data } = response;
      if ((response.statusText.toLowerCase() === 'ok' || response.status === 200)
        && data.eyes.length !== 0) {
        this.haveData = true;
        this.formatEntry(data);
      } else {
        this.haveData = false;
      }
    } catch (error) {
      Notification({
        type: 'warning',
        title: 'Error',
        message: error.toString(),
      });
    }
  },
};
</script>

<style lang="scss">
.el-divider__text {
  padding: 0 5px!important;
}
</style>

<style lang="scss" scoped>
.container {
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  .sections {
    overflow-y: scroll;
    width: 100%;
    .section {
      padding: 5px 0 0 0;
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
      .subtitle {
        font-size: 14px;
        margin: 0px;
        margin-left: 10px;
        margin-top: 15px;
        margin-bottom: 5px;
        font-weight: bold;
        color: #49749F;
      }
      .content {
        margin-top: 2px;
        margin: 0px;
        color: #808C95;
        padding: 0 0 0 15px;
      }
      .col {
        margin-left: 10px;
        .title {
          font-weight: bold;
          color: #000000;
          margin: 0px;
          padding: 0 0 0 15px;
        }
        .content {
          color: #808C95;
          margin: 0px;
          margin-top: 2px;
          margin-bottom: 10px;
          padding: 0 0 0 15px;
        }
      }
      .row {
        margin-left: 10px;
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        div {
          margin: 0;
          // padding-right: 10px;
        }
        .title {
          font-weight: bold;
          color: #000000;
          margin: 0px;
          padding: 0 0 0 15px;
          word-break:keep-all;
        }
        .content {
          color: #808C95;
          margin: 0px;
          margin-top: 2px;
          margin-bottom: 10px;
          padding: 0 0 0 15px;
        }
      }
    }
  }
  .no-data {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    h3 {
      color: #808C95;
      font-size: 21px;
    }
  }
}
</style>
