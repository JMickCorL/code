<template>
  <div class="container" id="cont">
    <div class="sections" v-if="haveData">
      <div class="section">
        <p class="sec-title">
          <el-divider content-position="left">
            MOTIVO DE CONSULTA / PADECIMIENTO ACTUAL
          </el-divider>
        </p>
        <p class="content">
          {{oftaeva.reason || ''}}
        </p>
      </div>
      <div class="section">
        <p class="sec-title">
          <el-divider content-position="left">
            SEGMENTO ANTERIOR
          </el-divider>
        </p>
        <div class="row">
          <el-col :span="12">
            <div>
              <p class="eye">
                OJO IZQUIERDO
              </p>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  PARPADOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorLeft.eyelid || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorLeft.eyelidComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  ANEXOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorLeft.annexes || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorLeft.annexesComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  GLOBO OCULAR
                </p>
                <p class="content">
                  {{oftaevaAnteriorLeft.ocularGlobule || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorLeft.ocularGlobuleComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  MOTILIDAD OCULAR
                </p>
                <p class="content">
                  {{oftaevaAnteriorLeft.ocularMotility || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorLeft.ocularMotilityComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  CONJUNTIVA
                </p>
                <p class="content">
                  {{oftaevaAnteriorLeft.conjunctiva || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorLeft.conjunctivaComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  ESCLERA
                </p>
                <p class="content">
                  {{oftaevaAnteriorLeft.sclera || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorLeft.scleraComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  CORNEA
                </p>
                <p class="content">
                  {{oftaevaAnteriorLeft.cornea || ''}}
                </p>
                <p class="content">
                  {{oftaevaAnteriorLeft.corneaCondition || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorLeft.corneaComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  CÁMARA ANTERIOR
                </p>
                <p class="content">
                  {{oftaevaAnteriorLeft.anteriorChamber || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorLeft.anteriorChamberComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  IRIS
                </p>
                <p class="content">
                  {{oftaevaAnteriorLeft.iris || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorLeft.irisComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  GONIOSCOPÍA
                </p>
                <p class="content">
                  {{oftaevaAnteriorLeft.ginioscopy || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorLeft.ginioscopyComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  CRISTALINO
                </p>
                <p class="content" v-if="oftaevaAnteriorLeft.lens !== 'Cataratas'">
                  {{oftaevaAnteriorLeft.lens || ''}}
                </p>
                <p class="content" v-else>
                  {{oftaevaAnteriorLeft.lensCataract || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorLeft.lensComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div class="other">
                <p class="title">
                  OTROS PADECIMIENTOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorLeft.other || ''}}
                </p>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <p class="eye">
                OJO DERECHO
              </p>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  PARPADOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorRight.eyelid || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorRight.eyelidComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  ANEXOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorRight.annexes || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorRight.annexesComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  GLOBO OCULAR
                </p>
                <p class="content">
                  {{oftaevaAnteriorRight.ocularGlobule || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorRight.ocularGlobuleComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  MOTILIDAD OCULAR
                </p>
                <p class="content">
                  {{oftaevaAnteriorRight.ocularMotility || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorRight.ocularMotilityComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  CONJUNTIVA
                </p>
                <p class="content">
                  {{oftaevaAnteriorRight.conjunctiva || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorRight.conjunctivaComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  ESCLERA
                </p>
                <p class="content">
                  {{oftaevaAnteriorRight.sclera || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorRight.scleraComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  CORNEA
                </p>
                <p class="content">
                  {{oftaevaAnteriorRight.cornea || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorRight.corneaComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  CÁMARA ANTERIOR
                </p>
                <p class="content">
                  {{oftaevaAnteriorRight.anteriorChamber || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorRight.anteriorChamberComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  IRIS
                </p>
                <p class="content">
                  {{oftaevaAnteriorRight.iris || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorRight.irisComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  GONIOSCOPÍA
                </p>
                <p class="content">
                  {{oftaevaAnteriorRight.ginioscopy || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorRight.ginioscopyComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  CRISTALINO
                </p>
                <p class="content" v-if="oftaevaAnteriorRight.lens !== 'Cataratas'">
                  {{oftaevaAnteriorRight.lens || ''}}
                </p>
                <p class="content" v-else>
                  {{oftaevaAnteriorRight.lensCataracts || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorRight.lensComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  OTROS PADECIMIENTOS
                </p>
                <p class="content">
                  {{oftaevaAnteriorRight.other || ''}}
                </p>
              </div>
            </div>
          </el-col>
        </div>
      </div>
      <div class="section">
        <p class="sec-title">
          <el-divider content-position="left">
            SEGMENTO POSTERIOR
          </el-divider>
        </p>
        <div class="row">
          <el-col :span="12">
            <div>
              <p class="eye">
                OJO IZQUIERDO
              </p>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  RETINA GENERAL
                </p>
                <p class="content">
                  {{oftaevaPosteriorLeft.retina || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaPosteriorLeft.retinaComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  VITREO
                </p>
                <p class="content">
                  {{oftaevaPosteriorLeft.vitreo || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaPosteriorLeft.vitreoComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  RELACIÓN COPA/DISCO
                </p>
                <p class="content">
                  {{oftaevaPosteriorLeft.cupDisc || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaPosteriorLeft.cupDiscComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  NERVIO
                </p>
                <p class="content">
                  {{oftaevaPosteriorLeft.nerve || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaPosteriorLeft.nerveComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  MÁCULA
                </p>
                <p class="content">
                  {{oftaevaPosteriorLeft.macula || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaPosteriorLeft.maculaComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  VASOS
                </p>
                <p class="content">
                  {{oftaevaPosteriorLeft.vessel || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaPosteriorLeft.vesselComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  PERIFERIA
                </p>
                <p class="content">
                  {{oftaevaPosteriorLeft.periphery || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaPosteriorLeft.peripheryComments || ''}}
                </p>
              </div>
            </div>
            <div>
              <div style="margin-left:10px;margin-top: 15px;">
                <p class="title">
                  DIAGNÓSTICO ESTADÍSTICO
                </p>
                <p class="content">
                  {{ normalizeStatisticalDiagnosis(oftaevaPosteriorLeft) }}
                </p>
              </div>
              <div style="margin-left:10px;margin-top: 15px;">
                <p class="title">
                  DIAGNÓSTICOS
                </p>
                <p class="content">
                  {{oftaevaPosteriorLeft.diagnosis || ''}}
                </p>
              </div>
              <div style="margin-left:10px;margin-top: 15px;">
                <p class="title">
                  PLAN
                </p>
                <p class="content">
                  {{oftaevaPosteriorLeft.plan || ''}}
                </p>
              </div>
            </div>
            <div>
              <div style="margin-left:10px;margin-top: 15px;">
                <p class="title">
                  DIAGNÓSTICO QUIRÚRJICO
                </p>
                <p class="content">
                  {{ normalizeSurgicalDiagnosis(oftaevaPosteriorLeft) }}
                </p>
              </div>
              <div style="margin-left:10px;margin-top: 15px;">
                <p class="title">
                  PLAN QUIRÚRJICO
                </p>
                <p class="content">
                  {{oftaevaPosteriorLeft.surgicalPlan || ''}}
                </p>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="row">
              <div>
                <p class="eye">
                  OJO DERECHO
                </p>
              </div>
              <div>
                <p class="title">
                  RETINA GENERAL
                </p>
                <p class="content">
                  {{oftaevaPosteriorRight.retina || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaPosteriorRight.retinaComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  VITREO
                </p>
                <p class="content">
                  {{oftaevaPosteriorRight.vitreo || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaPosteriorRight.vitreoComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  RELACIÓN COPA/DISCO
                </p>
                <p class="content">
                  {{oftaevaPosteriorRight.cupDisc || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaPosteriorRight.cupDiscComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  NERVIO
                </p>
                <p class="content">
                  {{oftaevaPosteriorRight.nerve || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaPosteriorRight.nerveComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  MÁCULA
                </p>
                <p class="content">
                  {{oftaevaPosteriorRight.macula || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaPosteriorRight.maculaComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  VASOS
                </p>
                <p class="content">
                  {{oftaevaPosteriorRight.vessel || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaPosteriorRight.vesselComments || ''}}
                </p>
              </div>
            </div>
            <div class="row">
              <div>
                <p class="title">
                  PERIFERIA
                </p>
                <p class="content">
                  {{oftaevaPosteriorRight.periphery || ''}}
                </p>
              </div>
              <div>
                <p class="title">
                  COMENTARIOS
                </p>
                <p class="content">
                  {{oftaevaPosteriorRight.peripheryComments || ''}}
                </p>
              </div>
            </div>
            <div>
              <div style="margin-left:10px;margin-top: 15px;">
                <p class="title">
                  DIAGNÓSTICO ESTADÍSTICO
                </p>
                <p class="content">
                  {{ normalizeStatisticalDiagnosis(oftaevaPosteriorRight) }}
                </p>
              </div>
              <div style="margin-left:10px;margin-top: 15px;">
                <p class="title">
                  DIAGNÓSTICOS
                </p>
                <p class="content">
                  {{oftaevaPosteriorRight.diagnosis || ''}}
                </p>
              </div>
              <div style="margin-left:10px;margin-top: 15px;">
                <p class="title">
                  PLAN
                </p>
                <p class="content">
                  {{oftaevaPosteriorRight.plan || ''}}
                </p>
              </div>
            </div>
            <div>
              <div style="margin-left:10px;margin-top: 15px;">
                <p class="title">
                  DIAGNÓSTICO QUIRÚRJICO
                </p>
                <p class="content">
                  {{ normalizeSurgicalDiagnosis(oftaevaPosteriorRight) }}
                </p>
              </div>
              <div style="margin-left:10px;margin-top: 15px;">
                <p class="title">
                  PLAN QUIRÚRJICO
                </p>
                <p class="content">
                  {{oftaevaPosteriorRight.surgicalPlan || ''}}
                </p>
              </div>
            </div>
          </el-col>
        </div>
      </div>
    </div>
    <div v-else class="no-data" :style="{height: height}">
      <h3>Aun no se lleva a cabo la evaluación</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ofta',
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
      oftaeva: {},
      oftaevaAnteriorLeft: {
        eyelid: null,
        annexes: null,
        ocularGlobule: null,
        ocularMotility: null,
        conjunctiva: null,
        sclera: null,
        cornea: null,
        corneaCondition: null,
        anteriorChamber: null,
        iris: null,
        ginioscopy: null,
        lens: null,
        lensCataract: null,
        other: null,
      },
      oftaevaPosteriorLeft: {
        retina: null,
        vitreo: null,
        cupDisk: null,
        nerve: null,
        macula: null,
        vessel: null,
        periphery: null,
        healthy: false,
        cataracts: false,
        diabeticRetinopathy: false,
        strabismus: false,
        glaucoma: false,
        other: false,
        diagnostic: null,
        plan: null,
      },
      oftaevaAnteriorRight: {
        eyelid: null,
        annexes: null,
        ocularGlobule: null,
        ocularMotility: null,
        conjunctiva: null,
        sclera: null,
        cornea: null,
        corneaCondition: null,
        anteriorChamber: null,
        iris: null,
        ginioscopy: null,
        lens: null,
        lensCataract: null,
        other: null,
      },
      oftaevaPosteriorRight: {
        retina: null,
        vitreo: null,
        cupDisk: null,
        nerve: null,
        macula: null,
        vessel: null,
        periphery: null,
        healthy: false,
        cataracts: false,
        diabeticRetinopathy: false,
        strabismus: false,
        glaucoma: false,
        other: false,
        plan: null,
        diagnostic: null,
      },
      haveData: false,
      height: !this.haveData ? '250px' : '450px',
    };
  },
  methods: {
    normalizeStatisticalDiagnosis(segment) {
      const statisticalDiagnosis = [];
      const statisticalDiagnosisMap = {
        statisticalDiagnosisHealthy: 'Sano',
        statisticalDiagnosisSquint: 'Estrabismo',
        statisticalDiagnosisCataracts: 'Cataratas',
        statisticalDiagnosisGlaucoma: 'Glaucoma',
        statisticalDiagnosisDiabeticRetinopathy: 'Retinopatía Diabética',
        statisticalDiagnosisCornealTransplant: 'Transplante de Córnea',
        statisticalDiagnosisPostOperated: 'Post-Operado',
        statisticalDiagnosisOther: 'Otros',
      };
      const keys = Object.keys(statisticalDiagnosisMap);
      keys.forEach((key) => {
        if (segment[key]) {
          statisticalDiagnosis.push(statisticalDiagnosisMap[key]);
        }
      });
      return statisticalDiagnosis.join(', ') || 'Sin datos';
    },
    normalizeSurgicalDiagnosis(segment) {
      const surgicalDiagnosis = [];
      const surgicalDiagnosisMap = {
        surgicalDiagnosisCataracs: 'Cx Catarata',
        surgicalDiagnosisPterygium: 'Cx Pterigion',
        surgicalDiagnosisInjurySuturing: 'Cierre Herida',
        surgicalDiagnosisCornealTransplant: 'Trasplante de córnea',
        surgicalDiagnosisRetina: 'Cx Retina',
        surgicalDiagnosisRefractive: 'Cx Refractiva',
        surgicalDiagnosisStrabismus: 'Cx Estrabismo',
        surgicalDiagnosisGlaucoma: 'Cx Glaucoma',
        surgicalDiagnosisOther: 'Otra cirugía',
      };
      const keys = Object.keys(surgicalDiagnosisMap);
      keys.forEach((key) => {
        if (segment[key]) {
          surgicalDiagnosis.push(surgicalDiagnosisMap[key]);
        }
      });
      return surgicalDiagnosis.join(', ') || 'Sin datos';
    },
    fullGetFormat(data = {}) {
      const { anteriorSegment, posteriorSegment } = data;
      const [pl] = posteriorSegment.filter((x) => x.eyeSide === 'LEFT');
      const [al] = anteriorSegment.filter((x) => x.eyeSide === 'LEFT');
      const [pr] = posteriorSegment.filter((x) => x.eyeSide === 'RIGHT');
      const [ar] = anteriorSegment.filter((x) => x.eyeSide === 'RIGHT');
      return {
        reason: data.reason,
        left: {
          anterior: {
            ...al,
          },
          posterior: {
            ...pl,
          },
        },
        right: {
          anterior: {
            ...ar,
          },
          posterior: {
            ...pr,
          },
        },
      };
    },
    async getData(patientId) {
      try {
        const response = await this.axios.get(`patient/ophtha/details/${patientId}`);
        if (response.data) {
          const { data } = response;
          const formatted = this.fullGetFormat(data);
          this.oftaeva = { reason: formatted.reason };
          this.oftaevaAnteriorLeft = { ...formatted.left.anterior };
          this.oftaevaAnteriorRight = { ...formatted.right.anterior };
          this.oftaevaPosteriorLeft = { ...formatted.left.posterior };
          this.oftaevaPosteriorRight = { ...formatted.right.posterior };
          this.haveData = true;
        }
      } catch (error) {
        this.$errorNotify(error);
      }
    },
  },
  async created() {
    this.getData(this.patientId);
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
  max-height: 100% !important;
  .sections {
    overflow-y: scroll;
    max-height: unset !important;
    .section {
      padding: 5px 0 0 0;
      // padding: 15px;
      .sec-title {
        .el-divider__text {
          font-size: 16px;
          font-weight: bold;
          color: #49749F;
        }
      }
      .content {
        margin-top: 2px;
        margin: 0px;
        font-size: 14px;
        color: #808C95;
        padding: 0 0 0 25px;
        word-break: break-word;
      }
      .title {
        font-weight: bold;
        color: #000000;
        margin: 0px;
        padding: 0 0 0 25px;
      }
      p.eye {
        padding: 0 0 0 25px;
        font-weight: bold;
        color: #000000;
        margin: 10px 0;
      }
      .row {
        margin-left: 10px;
        margin-top: 5px;
        display: flex;
        flex-direction: row;
        div {
          margin: 0px !important;
          padding: 0px !important;
        }
        .el-col {
          width: 50%;
          .title {
            color: #606266;
          }
          div.row {
            display: flex;
            flex-direction: column;
          }
        }
        div.other {
          width: 100%!important;
        }
        .title {
          font-weight: bold;
          color: #000000;
          margin: 0px;
        }
        .sub-title {
          font-weight: 600;
          font-size: 12px;
          color: #808C95;
          margin: 0;
          padding: 0 0 0 25px;
        }
        .content {
          color: #808C95;
          margin: 0px;
          margin-top: 2px;
          margin-bottom: 10px;
          padding: 0 0 0 25px;
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
