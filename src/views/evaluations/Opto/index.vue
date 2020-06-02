<template>
  <el-row class="row" id="optometricEvaluation">
    <el-col class="col">
      <Title2
        :btnText="'REGISTRAR'"
        :title="'EVALUACIÓN OPTOMÉTRICA'"
        :label="label"
        v-on:beforeSubmit="beforeSubmit"
        :patientId="patientId"
      />
      <div class="form">
        <el-container>
          <el-main>
            <el-form
              :model="form"
              ref="refId"
              :rules="rules"
              @submit.prevent
            >
              <div>
                <div class="row-no-center">
                  <el-form-item prop="info.weight" class="small" label="Peso">
                    <el-input v-model="form.info.weight" />
                  </el-form-item>
                  <el-form-item prop="info.size" class="small" label="Talla">
                    <el-input v-model="form.info.size" />
                  </el-form-item>
                </div>
                <div class="row-no-center">
                  <el-form-item prop="info.heartRate" class="small" label="Frecuencia Cardíaca">
                    <el-input v-model="form.info.heartRate" />
                  </el-form-item>
                  <el-form-item
                    prop="info.respiratoryRate"
                    class="small"
                    label="Frecuencia Respiratoria"
                  >
                    <el-input v-model="form.info.respiratoryRate" />
                  </el-form-item>
                  <el-form-item prop="info.bloodPressure" class="small sh" label="Tensión Arterial">
                    <el-input v-model="form.info.bloodPressure" />
                  </el-form-item>
                  <el-form-item prop="info.temperature" class="small sh" label="Temperatura">
                    <el-input v-model="form.info.temperature" />
                  </el-form-item>
                  <el-form-item
                    prop="hasSurgeries"
                    class="small"
                    label="¿Ha sido operado de los ojos?"
                  >
                    <el-select v-model="form.info.hasSurgeries">
                      <el-option
                        v-for="item in hasSurgeriesOpt"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    v-if="form.info.hasSurgeries"
                    prop="previousSurgery"
                    class="large added sh"
                    label="Cirugías Oculares Previas"
                  >
                    <el-input v-model="form.info.previousSurgery" />
                  </el-form-item>
                </div>
                <div class="row-no-center">
                  <el-form-item prop="info.medicines" class="large" label="Medicamentos">
                    <el-input
                      v-model="form.info.medicines"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 2 }"
                    />
                  </el-form-item>
                  <el-form-item
                    prop="info.currentCondition"
                    class="large"
                    label="Padecimientos Actuales"
                  >
                    <el-input
                      v-model="form.info.currentCondition"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 2 }"
                    />
                  </el-form-item>
                  <el-form-item prop="info.comments" class="large" label="Comentarios Extra">
                    <el-input
                      v-model="form.info.comments"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 2 }"
                    />
                  </el-form-item>
                </div>
              </div>
              <div>
                <p style="color:#006EFF;font-weight:bold;font-size:15px!important;margin:0px;">
                  ESQUEMA DE AGUDEZA VISUAL SIN CORRECCIÓN
                </p>
                <div class="row-no-center">
                  <div>
                    <el-form-item
                      prop="right.vaNoCorrection"
                      class="medium"
                      label="Parámetros de AV / Ojo Derecho"
                    >
                      <el-select v-model="form.right.vaNoCorrection" placeholder="Parámetros de AV">
                        <el-option
                          v-for="item in avParams"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item
                      prop="left.vaNoCorrection"
                      class="medium"
                      label="Parámetros de AV / Ojo Izquierdo"
                    >
                      <el-select v-model="form.left.vaNoCorrection" placeholder="Parámetros de AV">
                        <el-option
                          v-for="item in avParams"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
              </div>
              <div>
                <p style="color:#006EFF;font-weight:bold;font-size:15px!important;margin:0px;">
                  ESQUEMA DE AGUDEZA VISUAL CON CORRECCIÓN
                </p>
                <div class="row-no-center">
                  <div>
                    <el-form-item
                      prop="right.vaWithCorrection"
                      class="medium"
                      label="Parámetros de AV / Ojo Derecho"
                    >
                      <el-select
                        v-model="form.right.vaWithCorrection"
                        placeholder="Parámetros de AV"
                      >
                        <el-option
                          v-for="item in avParams"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item
                      prop="left.vaWithCorrection"
                      class="medium"
                      label="Parámetros de AV / Ojo Izquierdo"
                    >
                      <el-select
                        v-model="form.left.vaWithCorrection"
                        placeholder="Parámetros de AV"
                      >
                        <el-option
                          v-for="item in avParams"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
              </div>
              <div>
                <p style="color:#006EFF;font-weight:bold;font-size:15px!important;margin:0px;">
                  ESQUEMA DE AGUDEZA VISUAL CON LENTES ACTUALES
                </p>
                <div class="row-no-center">
                  <div>
                    <el-form-item
                      prop="right.vaWithGlasses"
                      class="medium"
                      label="Parámetros de AV / Ojo Derecho"
                    >
                      <el-select v-model="form.right.vaWithGlasses" placeholder="Parámetros de AV">
                        <el-option
                          v-for="item in avParams"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item
                      prop="left.vaWithGlasses"
                      class="medium"
                      label="Parámetros de AV / Ojo Izquierdo"
                    >
                      <el-select v-model="form.left.vaWithGlasses" placeholder="Parámetros de AV">
                        <el-option
                          v-for="item in avParams"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
              </div>
              <div>
                <p style="color:#006EFF;font-weight:bold;font-size:15px!important;margin:0px;">
                  ESQUEMA DE AGUDEZA VISUAL CON AGUJERO ESTENOPEICO
                </p>
                <div class="row-no-center">
                  <div>
                    <el-form-item
                      prop="right.vaWithStethoscopeHole"
                      class="medium"
                      label="Parámetros de AV / Ojo Derecho"
                    >
                      <el-select
                        v-model="form.right.vaWithStethoscopeHole"
                        placeholder="Parámetros de AV"
                      >
                        <el-option
                          v-for="item in avParams"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item
                      prop="left.vaWithStethoscopeHole"
                      class="medium"
                      label="Parámetros de AV / Ojo Izquierdo"
                    >
                      <el-select
                        v-model="form.left.vaWithStethoscopeHole"
                        placeholder="Parámetros de AV"
                      >
                        <el-option
                          v-for="item in avParams"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
              </div>
              <div>
                <p style="color:#006EFF;font-weight:bold;font-size:15px!important;margin:0px;">
                  Lentes Anteriores / Lensometría
                </p>
              </div>
              <div class="row-no-center">
                <div style="padding-left:20px;">
                  <p style="color:#000000;font-weight:bold;font-size:13px;margin:0px;">
                    Ojo Derecho
                  </p>
                  <div class="row-no-center">
                    <el-form-item prop="right.lensometrySphere" class="small" label="Esfera">
                      <el-select v-model="form.right.lensometrySphere">
                        <el-option
                          v-for="item in sphere"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="right.lensometryCilinder" class="small" label="Cilindro">
                      <el-select v-model="form.right.lensometryCilinder">
                        <el-option
                          v-for="item in cilinder"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="right.lensometryAxis" class="small" label="Eje">
                      <el-select v-model="form.right.lensometryAxis">
                        <el-option
                          v-for="item in 180"
                          :key="item"
                          :label="parseInt(item)"
                          :value="parseInt(item)"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="right.lensometryAddition" class="small" label="Adición">
                      <el-select v-model="form.right.lensometryAddition">
                        <el-option
                          v-for="item in addition"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div>
                  <div>
                    <p style="color:#000000;font-weight:bold;font-size:13px!important;margin:0px;">
                      Ojo Izquierdo
                    </p>
                    <div class="row-no-center">
                      <el-form-item prop="left.lensometrySphere" class="small" label="Esfera">
                        <el-select v-model="form.left.lensometrySphere">
                          <el-option
                            v-for="item in sphere"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                      <el-form-item prop="left.lensometryCilinder" class="small" label="Cilindro">
                        <el-select v-model="form.left.lensometryCilinder">
                          <el-option
                            v-for="item in cilinder"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                      <el-form-item prop="left.lensometryAxis" class="small" label="Eje">
                        <el-select v-model="form.left.lensometryAxis">
                          <el-option
                            v-for="item in 180"
                            :key="item"
                            :label="parseInt(item)"
                            :value="parseInt(item)"
                          />
                        </el-select>
                      </el-form-item>
                      <el-form-item prop="left.lensometryAddition" class="small" label="Adición">
                        <el-select v-model="form.left.lensometryAddition">
                          <el-option
                            v-for="item in addition"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p style="color:#006EFF;font-weight:bold;font-size:15px!important;margin:0px;">
                  REFRACCIÓN
                </p>
              </div>
              <div class="row-no-center">
                <div style="padding-left:20px;">
                  <p style="color:#000000;font-weight:bold;font-size:13px;margin:0px;">
                    Ojo Derecho
                  </p>
                  <div class="row-no-center">
                    <el-form-item prop="right.refractionSphere" class="small" label="Esfera">
                      <el-select v-model="form.right.refractionSphere">
                        <el-option
                          v-for="item in sphere"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="right.refractionCilinder" class="small" label="Cilindro">
                      <el-select v-model="form.right.refractionCilinder">
                        <el-option
                          v-for="item in cilinder"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="right.refractionAxis" class="small" label="Eje">
                      <el-select v-model="form.right.refractionAxis">
                        <el-option
                          v-for="item in 180"
                          :key="item"
                          :label="parseInt(item)"
                          :value="parseInt(item)"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="right.refractionAddition" class="small" label="Adición">
                      <el-select v-model="form.right.refractionAddition">
                        <el-option
                          v-for="item in addition"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div>
                  <div>
                    <p style="color:#000000;font-weight:bold;font-size:13px!important;margin:0px;">
                      Ojo Izquierdo
                    </p>
                    <div class="row-no-center">
                      <el-form-item prop="left.refractionSphere" class="small" label="Esfera">
                        <el-select v-model="form.left.refractionSphere">
                          <el-option
                            v-for="item in sphere"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                      <el-form-item prop="left.refractionCilinder" class="small" label="Cilindro">
                        <el-select v-model="form.left.refractionCilinder">
                          <el-option
                            v-for="item in cilinder"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                      <el-form-item prop="left.refractionAxis" class="small" label="Eje">
                        <el-select v-model="form.left.refractionAxis">
                          <el-option
                            v-for="item in 180"
                            :key="item"
                            :label="parseInt(item)"
                            :value="parseInt(item)"
                          />
                        </el-select>
                      </el-form-item>
                      <el-form-item prop="left.refractionAddition" class="small" label="Adición">
                        <el-select v-model="form.left.refractionAddition">
                          <el-option
                            v-for="item in addition"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p style="color:#006EFF;font-weight:bold;font-size:15px!important;margin:0px;">
                  PRESIÓN INTRAOCULAR
                </p>
              </div>
              <div class="row-no-center">
                <el-form-item prop="right.intraocularPressure" class="small" label="Ojo Derecho">
                  <el-select v-model="form.right.intraocularPressure">
                    <el-option
                      v-for="item in 70"
                      :key="item"
                      :label="item"
                      :value="item.toString()"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item prop="left.intraocularPressure" class="small" label="Ojo Izquierdo">
                  <el-select v-model="form.left.intraocularPressure">
                    <el-option
                      v-for="item in 70"
                      :key="item"
                      :label="item"
                      :value="item.toString()"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div class="row-no-center">
                <el-form-item
                  prop="info.otherConditions"
                  class="xlarge"
                  label="Otros Padecimientos"
                >
                  <el-input
                    v-model="form.info.otherConditions"
                    type="textarea"
                    :autosize="{ minRows: 3, maxRows: 3 }"
                  />
                </el-form-item>
              </div>
              <div class="row-no-center">
                <el-form-item prop="info.rxFinal" class="xlarge" label="RX Final">
                  <el-input
                    v-model="form.info.rxFinal"
                    type="textarea"
                    :autosize="{ minRows: 3, maxRows: 3 }"
                  />
                </el-form-item>
                <el-form-item prop="info.rxSubjective" class="xlarge" label="RX Subjetiva">
                  <el-input
                    v-model="form.info.rxSubjective"
                    type="textarea"
                    :autosize="{ minRows: 3, maxRows: 3 }"
                  />
                </el-form-item>
              </div>
              <el-form-item style="width: 100%!important;">
                <el-button
                  type="primary"
                  @click="beforeSubmit"
                  style="background-color: #6993FF;color:#fff;float:right;"
                >
                  REGISTRAR
                </el-button>
                <el-button
                  type="success"
                  @click="docsVisible = true"
                  class="files"
                >
                  ADJUNTAR ARCHIVOS
                </el-button>
              </el-form-item>
              <DocsDialog
                :docsVisible="docsVisible"
                :folder="'OPTOMETRÍA'"
                v-on:closeDialog="closeDialog"
              />
            </el-form>
          </el-main>
        </el-container>
      </div>
    </el-col>
  </el-row>
</template>

<script>
/* eslint-disable no-console */
import { mapState } from 'vuex';
import { Notification } from 'element-ui';
import Title2 from '../../../components/Title2';
import DocsDialog from '../../Docs/DocsDialog';

export default {
  data() {
    const previousSurgery = (rule, value, cb) => {
      if (this.form.info.hasSurgeries && !this.form.info.previousSurgery) {
        return cb(new Error('El campo es requerido.'));
      }
      return cb();
    };
    return {
      docsVisible: false,
      label: 'Por favor llene los datos requeridos para completar la Evaluación',
      form: {
        info: {},
        left: {},
        right: {},
      },
      message: '',
      loading: false,
      loadingService: null,
      eye: {
        vaNoCorrection: null,
        vaWithCorrection: null,
        vaWithGlasses: null,
        vaWithStethoscopeHole: null,
        lensometrySphere: null,
        lensometryCilinder: null,
        lensometryAxis: null,
        lensometryAddition: null,
        refractionSphere: null,
        refractionCilinder: null,
        refractionAxis: null,
        refractionAddition: null,
        intraocularPressure: null,
      },
      initialForm: {},
      isFirstEvaluation: false,
      avParams: [
        {
          value: '20/500',
          label: '20/500',
        },
        {
          value: '20/400',
          label: '20/400',
        },
        {
          value: '20/320',
          label: '20/320',
        },
        {
          value: '20/250',
          label: '20/250',
        },
        {
          value: '20/200',
          label: '20/200',
        },
        {
          value: '20/150',
          label: '20/150',
        },
        {
          value: '20/100',
          label: '20/100',
        },
        {
          value: '20/80',
          label: '20/80',
        },
        {
          value: '20/70',
          label: '20/70',
        },
        {
          value: '20/60',
          label: '20/60',
        },
        {
          value: '20/50',
          label: '20/50',
        },
        {
          value: '20/40',
          label: '20/40',
        },
        {
          value: '20/30',
          label: '20/30',
        },
        {
          value: '20/25',
          label: '20/25',
        },
        {
          value: '20/20',
          label: '20/20',
        },
        {
          value: '20/15',
          label: '20/15',
        },
        {
          value: '20/10',
          label: '20/10',
        },
        {
          value: 'Cuenta Dedos',
          label: 'Cuenta Dedos',
        },
        {
          value: 'Movimiento Manos',
          label: 'Movimiento Manos',
        },
        {
          value: 'Percepción de Luz',
          label: 'Percepción de Luz',
        },
        {
          value: 'No Percibe Luz',
          label: 'No Percibe Luz',
        },
      ],
      sphere: [],
      cilinder: [],
      axis: [],
      addition: [],
      hasSurgeriesOpt: [
        {
          value: true,
          label: 'Si',
        },
        {
          value: false,
          label: 'No',
        },
      ],
      rules: {
        // 'info.weight': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'info.size': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'info.heartRate': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'info.respiratoryRate': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'info.bloodPressure': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'info.temperature': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        previousSurgery: [
          {
            validator: previousSurgery,
          },
        ],
        // 'info.medicines': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'info.currentCondition': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'info.comments': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'info.otherConditions': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.vaNoCorrection': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.vaNoCorrection': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.vaWithCorrection': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.vaWithCorrection': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.vaWithGlasses': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.vaWithGlasses': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.vaWithStethoscopeHole': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.vaWithStethoscopeHole': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.lensometrySphere': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.lensometryCilinder': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.lensometryAxis': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.lensometryAddition': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.lensometrySphere': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.lensometryCilinder': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.lensometryAxis': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.lensometryAddition': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.refractionSphere': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.refractionCilinder': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.refractionAxis': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.refractionAddition': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.refractionSphere': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.refractionCilinder': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.refractionAxis': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.refractionAddition': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.intraocularPressure': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.intraocularPressure': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'info.rxFinal': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'info.rxSubjective': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
      },
    };
  },
  components: {
    Title2,
    DocsDialog,
  },
  computed: {
    ...mapState({
      role: (state) => state.auth.user.role,
    }),
    patientId() {
      return this.$route.params.id;
    },
  },
  methods: {
    closeDialog() {
      this.docsVisible = false;
    },
    fill() {
      let cont = -16.25;
      while (cont !== 16) {
        cont += 0.25;
        if (cont !== 0) {
          if (cont > 0) {
            this.sphere.push({
              value: `+${parseFloat(cont.toString()).toFixed(2)}`,
              label: `+${parseFloat(cont.toString()).toFixed(2)}`,
            });
          } else {
            this.sphere.push({
              value: `${parseFloat(cont.toString()).toFixed(2)}`,
              label: `${parseFloat(cont.toString()).toFixed(2)}`,
            });
          }
        } else {
          this.sphere.push({
            value: 'PL',
            label: 'PL',
          });
        }
      }
      cont = 0;
      this.cilinder.push({
        value: 'PL',
        label: 'PL',
      });
      while (cont !== -7) {
        cont -= 0.25;
        this.cilinder.push({
          value: `${parseFloat(cont.toString()).toFixed(2)}`,
          label: `${parseFloat(cont.toString()).toFixed(2)}`,
        });
      }
      cont = 0;
      this.addition.push({
        value: 'NA',
        label: 'NA',
      });
      while (cont !== 3) {
        cont += 0.25;
        this.addition.push({
          value: `+${parseFloat(cont.toString()).toFixed(2)}`,
          label: `+${parseFloat(cont.toString()).toFixed(2)}`,
        });
      }
    },
    attach() {},
    beforeSubmit() {
      this.$refs.refId.validate((isValid) => {
        if (isValid) {
          this.submit();
        }
      });
    },
    changedSections() {
      const initial = JSON.stringify(this.initialForm);
      const final = JSON.stringify(this.form);
      const initialInfo = JSON.stringify(this.initialForm.info);
      const finalInfo = JSON.stringify(this.form.info);
      const initialL = JSON.stringify(this.initialForm.left);
      const initialR = JSON.stringify(this.initialForm.right);
      const finalL = JSON.stringify(this.form.left);
      const finalR = JSON.stringify(this.form.right);
      const changes = [];
      if (initial === final) {
        return ['none'];
      }
      if (initialL !== finalL && initialR !== finalR && initialInfo !== finalInfo) {
        return ['full'];
      }
      if (initialL !== finalL && initialR !== finalR) {
        changes.push('eyes');
      }
      if (initialL !== finalL && !changes.includes('eyes')) {
        changes.push('left');
      }
      if (initialR !== finalR && !changes.includes('eyes')) {
        changes.push('right');
      }
      if (initialInfo !== finalInfo) {
        changes.push('info');
      }
      return changes;
    },
    async submit() {
      try {
        const requests = [];
        let message = '';
        const patientId = this.form.info.patient;
        if (this.isFirstEvaluation) {
          message = 'Se generó un Perfil Optométrico';
          const data = this.format();
          const response = await this.axios.post(`patient/opto/${patientId}`, data);
          if (response) {
            await this.axios.post(`patient/changelog/${patientId}`, {
              title: 'EVALUACIÓN OPTOMÉTRICA',
              message,
            });
          }
        } else {
          const changes = this.changedSections();
          if (!changes.includes('none')) {
            message = 'Se actualizó el Perfil Optométrico';
            if (changes.includes('full')) {
              const data = this.format();
              requests.push(this.axios.put(`patient/opto/${patientId}`, data));
              const eyes = this.format();
              requests.push(this.axios.put(`patient/opto/eyes/${patientId}`, eyes));
            }
            if (changes.includes('eyes')) {
              const eyes = this.format();
              requests.push(this.axios.put(`patient/opto/eyes/${patientId}`, eyes));
            }
            if (changes.includes('info')) {
              const data = this.formatInfo();
              requests.push(this.axios.put(`patient/opto/${patientId}`, data));
            }
            if (changes.includes('left')) {
              const side = 'LEFT';
              const eye = this.formatEye('left');
              requests.push(this.axios.put(`patient/opto/eye/${side}/${patientId}`, eye));
            }
            if (changes.includes('right')) {
              const side = 'RIGHT';
              const eye = this.formatEye('right');
              requests.push(this.axios.put(`patient/opto/eye/${side}/${patientId}`, eye));
            }
          } else {
            message = 'No hay cambios';
          }
          const response = await Promise.all(requests);
          if (response.length) {
            await this.axios.post(`patient/changelog/${patientId}`, {
              title: 'EVALUACIÓN OPTOMÉTRICA',
              message,
            });
          }
        }
        Notification({
          type: 'success',
          title: '¡Éxito!',
          message,
        });
        this.$router.replace('/');
      } catch (error) {
        this.$errorNotify(error);
      }
    },
    formatInfo() {
      const formData = this.form.info;
      const data = {
        weight: formData.weight,
        size: formData.size,
        heartRate: formData.heartRate,
        respiratoryRate: formData.respiratoryRate,
        bloodPressure: formData.bloodPressure,
        temperature: formData.temperature,
        previousSurgery:
          formData.hasSurgeries && formData.previousSurgery ? formData.previousSurgery : null,
        medicines: formData.medicines,
        currentCondition: formData.currentCondition,
        comments: formData.comments,
        otherConditions: formData.otherConditions,
        rxFinal: formData.rxFinal,
        rxSubjective: formData.rxSubjective,
      };
      return data;
    },
    format() {
      const { info, left, right } = this.form;
      return {
        weight: info.weight ? info.weight : null,
        size: info.size ? info.size : null,
        heartRate: info.heartRate ? info.heartRate : null,
        respiratoryRate: info.respiratoryRate ? info.respiratoryRate : null,
        bloodPressure: info.bloodPressure ? info.bloodPressure : null,
        temperature: info.temperature ? info.temperature : null,
        medicines: info.medicines ? info.medicines : null,
        currentCondition: info.currentCondition ? info.currentCondition : null,
        comments: info.comments ? info.comments : null,
        otherConditions: info.otherConditions ? info.otherConditions : null,
        rxFinal: info.rxFinal ? info.rxFinal : null,
        rxSubjective: info.rxSubjective ? info.rxSubjective : null,
        previousSurgery: info.hasSurgeries && info.previousSurgery ? info.previousSurgery : null,
        reVaNoCorrection: right.vaNoCorrection ? right.vaNoCorrection : null,
        leVaNoCorrection: left.vaNoCorrection ? left.vaNoCorrection : null,
        reVaWithCorrection: right.vaWithCorrection ? right.vaWithCorrection : null,
        leVaWithCorrection: left.vaWithCorrection ? left.vaWithCorrection : null,
        reVaWithGlasses: right.vaWithGlasses ? right.vaWithGlasses : null,
        leVaWithGlasses: left.vaWithGlasses ? left.vaWithGlasses : null,
        reVaWithStethoscopeHole: right.vaWithStethoscopeHole ? right.vaWithStethoscopeHole : null,
        leVaWithStethoscopeHole: left.vaWithStethoscopeHole ? left.vaWithStethoscopeHole : null,
        reLensometrySphere: right.lensometrySphere ? right.lensometrySphere : null,
        leLensometrySphere: left.lensometrySphere ? left.lensometrySphere : null,
        reLensometryCilinder: right.lensometryCilinder ? right.lensometryCilinder : null,
        leLensometryCilinder: left.lensometryCilinder ? left.lensometryCilinder : null,
        reLensometryAxis: right.lensometryAxis ? right.lensometryAxis.toString() : null,
        leLensometryAxis: left.lensometryAxis ? left.lensometryAxis.toString() : null,
        reLensometryAddition: right.lensometryAddition ? right.lensometryAddition : null,
        leLensometryAddition: left.lensometryAddition ? left.lensometryAddition : null,
        reRefractionSphere: right.refractionSphere ? right.refractionSphere : null,
        leRefractionSphere: left.refractionSphere ? left.refractionSphere : null,
        reRefractionCilinder: right.refractionCilinder ? right.refractionCilinder : null,
        leRefractionCilinder: left.refractionCilinder ? left.refractionCilinder : null,
        reRefractionAxis: right.refractionAxis ? right.refractionAxis.toString() : null,
        leRefractionAxis: left.refractionAxis ? left.refractionAxis.toString() : null,
        reRefractionAddition: right.refractionAddition ? right.refractionAddition : null,
        leRefractionAddition: left.refractionAddition ? left.refractionAddition : null,
        reIntraocularPressure: right.intraocularPressure
          ? right.intraocularPressure.toString()
          : null,
        leIntraocularPressure: left.intraocularPressure
          ? left.intraocularPressure.toString()
          : null,
      };
    },
    formatEye(side) {
      if (side === 'left') {
        return {
          patient: this.form.info.patient,
          ...this.form.left,
        };
      }
      if (side === 'right') {
        return {
          patient: this.form.info.patient,
          ...this.form.right,
        };
      }
      return '';
    },
    formatEntry(data) {
      const copy = { ...data };
      delete copy.eyes;
      const left = data.eyes.filter((a) => a.eyeSide.toLowerCase() === 'left')[0];
      const right = data.eyes.filter((a) => a.eyeSide.toLowerCase() === 'right')[0];
      this.form = {
        info: {
          ...copy,
        },
        left: left || JSON.parse(JSON.stringify(this.eye)),
        right: right || JSON.parse(JSON.stringify(this.eye)),
      };
      if (copy.previousSurgery) {
        this.form.info.hasSurgeries = true;
        this.form.info.previousSurgery = copy.previousSurgery;
      }
      const clone = JSON.parse(JSON.stringify(this.form));
      this.initialForm = clone;
    },
  },
  created() {
    this.fill();
  },
  async mounted() {
    this.loading = true;
    const patientId = this.$route.params.id;
    try {
      const response = await this.axios.get(`patient/opto/details/${patientId}`);
      if (
        (response.statusText.toLowerCase() === 'ok' || response.status === 200)
        && response.data.eyes.lenght !== 0
      ) {
        this.isFirstEvaluation = false;
        this.formatEntry(response.data);
      } else {
        this.isFirstEvaluation = true;
      }
      this.form.info.patient = patientId;
      this.loading = false;
    } catch (error) {
      if (error.response.status === 404) {
        this.isFirstEvaluation = true;
        this.loading = false;
      }
      this.$errorNotify(error);
    }
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
@import './styles/style.scss';
</style>
<style lang="scss" scoped>
@import './styles/style-scoped.scss';
</style>
