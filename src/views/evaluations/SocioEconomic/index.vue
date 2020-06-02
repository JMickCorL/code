<template>
  <el-row class="row" id="socialEvaluation">
    <el-col class="col">
      <Title2
        :btnText="'REGISTRAR'"
        :title="'ACTUALIZAR APARTADO DE TRABAJO SOCIAL'"
        :label="label"
        v-on:beforeSubmit="beforeSubmit"
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
              <div class="row-no-center">
                <div style="flex: 1;">
                  <div>
                    <p class="label-style">DATOS GENERALES</p>
                    <el-form-item
                      prop="residenceTimeAtTijuana"
                      style="width: 250px"
                      label="Tiempo de residencia en Tijuana"
                    >
                      <el-input v-model="form.residenceTimeAtTijuana" />
                    </el-form-item>
                  </div>
                  <div>
                    <p class="label-style">LÍNEA DE BIENESTAR</p>
                    <div class="row-no-center">
                      <el-form-item class="medium" prop="academicDegree" label="Escolaridad">
                        <el-select v-model="form.academicDegree">
                          <el-option
                            v-for="item in academicDegree"
                            :key="item.value"
                            :label="item.label"
                            :value="item.label"
                          />
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        class="medium"
                        prop="houseCondition"
                        label="Condiciones de la vivienda"
                      >
                        <el-select v-model="form.houseCondition">
                          <el-option
                            v-for="item in houseCondition"
                            :key="item.value"
                            :label="item.label"
                            :value="item.label"
                          />
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                  <div>
                  <p class="label-style">CARACTERISTICAS DE LA VIVIENDA</p>
                  <div class="row-no-center">
                    <el-form-item class="medium" prop="houseWalls" label="Paredes">
                      <el-select v-model="form.houseWalls">
                        <el-option
                          v-for="item in houseWalls"
                          :key="item.value"
                          :label="item.label"
                          :value="item.label"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item class="medium" prop="houseRoof" label="Techo">
                      <el-select v-model="form.houseRoof">
                        <el-option
                          v-for="item in houseRoof"
                          :key="item.value"
                          :label="item.label"
                          :value="item.label"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item class="medium" prop="houseFloor" label="Piso">
                      <el-select v-model="form.houseFloor">
                        <el-option
                          v-for="item in houseFloor"
                          :key="item.value"
                          :label="item.label"
                          :value="item.label"
                        />
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                </div>
                <div class="file-container">
                  <div class="file" @click="docsVisible = true"/>
                  <p class="lbl1">Adjuntar Imagen / Documento</p>
                  <p class="lbl2">referencia del nivel socioeconómico del paciente</p>
                </div>
              </div>
              <div style="margin-top:20px;">
                <p class="label-style">CUARTOS DE LA VIVIENDA</p>
                <div class="row-no-center">
                  <el-checkbox v-model="form.houseRoomsLivingRoom">Sala</el-checkbox>
                  <el-checkbox v-model="form.houseRoomsDiningRoom">Comedor</el-checkbox>
                  <el-checkbox v-model="form.houseRoomsKitchen">Cocina</el-checkbox>
                  <el-checkbox v-model="bathroom">Baño</el-checkbox>
                  <el-checkbox v-model="houseRoomsBedroom">Recámara</el-checkbox>
                  <el-checkbox v-model="form.houseRoomsStudyingRoom">Estudio</el-checkbox>
                  <el-checkbox v-model="form.houseRoomsCourtyard">Patio</el-checkbox>
                  <el-checkbox v-model="form.houseRoomsOther">Otro</el-checkbox>
                </div>
                <el-form-item
                  class="medium"
                  prop="houseRoomsBathroom"
                  label="Baño"
                  v-if="bathroom"
                >
                  <el-select v-model="form.houseRoomsBathroom">
                    <el-option
                      v-for="item in bathroomOpts"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  class="medium"
                  prop="houseRoomsBedroom"
                  label="Cantidad de recámaras"
                  v-if="houseRoomsBedroom"
                >
                  <el-input-number v-model="form.houseRoomsBedroom" :min="0" />
                </el-form-item>
              </div>
              <div style="margin-top:20px;">
                <p class="label-style">SERVICIOS DE LA VIVIENDA</p>
                <div class="row-no-center">
                  <el-checkbox v-model="form.serviceLight">
                    Instalación de luz
                  </el-checkbox>
                  <el-checkbox v-model="form.serviceSewerSystem">
                    Drenaje y alcantarillado
                  </el-checkbox>
                  <el-checkbox v-model="form.serviceCableTV">
                    Televisión por cable
                  </el-checkbox>
                  <el-checkbox v-model="form.servicePhone">
                    Teléfono fijo
                  </el-checkbox>
                  <el-checkbox v-model="form.serviceInternet">
                    Internet
                  </el-checkbox>
                  <el-checkbox v-model="form.serviceAsphaltStreet">
                    Pavimento en las calles
                  </el-checkbox>
                  <el-checkbox v-model="form.servicePublicWater">
                    Agua Pública
                  </el-checkbox>
                  <el-checkbox v-model="form.serviceOther">
                    Otro
                  </el-checkbox>
                </div>
              </div>
              <div style="margin-top:20px;">
                <p class="label-style">MUEBLES Y ELECTRODOMÉSTICOS</p>
                <div class="row-no-center">
                  <el-checkbox v-model="form.houseStuffTV">
                    Televisión
                  </el-checkbox>
                  <el-checkbox v-model="form.houseStuffFridge">
                    Refrigerador
                  </el-checkbox>
                  <el-checkbox v-model="form.houseStufftStove">
                    Estufa
                  </el-checkbox>
                  <el-checkbox v-model="form.houseStuffDishWasher">
                    Lava platos
                  </el-checkbox>
                  <el-checkbox v-model="form.houseStuffMicrowaveOven">
                    Horno de Microondas
                  </el-checkbox>
                  <el-checkbox v-model="form.houseStuffBlender">
                    Licuadora
                  </el-checkbox>
                  <el-checkbox v-model="form.houseStuffWashingMachine">
                    Lavadora
                  </el-checkbox>
                  <el-checkbox v-model="form.houseStuffDryer">
                    Secadora
                  </el-checkbox>
                </div>
                <div class="row-no-center">
                  <el-checkbox v-model="form.houseStuffComputer">
                    Computadora
                   o Ipad</el-checkbox>
                  <el-checkbox v-model="form.houseStuffDiningRoomSet">
                    Comedor
                  </el-checkbox>
                  <el-checkbox v-model="form.houseStuffLivingRoomSet">
                    Sala
                  </el-checkbox>
                  <el-checkbox v-model="form.houseStuffBedroomSet">
                    Recámara
                  </el-checkbox>
                </div>
              </div>
              <div style="margin-top:20px;">
                <p class="label-style">CUENTA CON AUTO PROPIO</p>
                <el-form-item
                  class="medium"
                  prop="car"
                  style="margin-top:10px;display:flex;flex-direction:column"
                >
                  <el-input v-model="form.car" placeholder="Subaru - BRZ 2020" />
                </el-form-item>
              </div>
              <div style="margin-top:20px;">
                <p class="label-style">INGRESOS MENSUALES EN PROMEDIO</p>
                <p style="color:#006EFF;font-size:12px;margin:4px 0px 0px 0px;">
                  ESTRUCTURA FAMILIAR
                </p>
                <p style="color:#000000;font-size:12px;margin:4px 0px 10px 0px;">
                  NUCLEAR: Número de personas ocupadas de 14 años y mas que vivan
                  en la unidad domestica, incluyendo el beneficiario.
                </p>
                <div
                  v-for="( item, index ) in core"
                  :key="`core${index}`"
                  style="margin-bottom:15px;"
                >
                  <el-form
                    :model="item"
                    :ref="`dynamicCore${index}`"
                    :rules="familyRules"
                  >
                    <div class="row-no-center">
                      <div>
                        <div class="row-no-center">
                          <el-form-item
                            prop="occupation"
                            class="large"
                            label="Nombre Completo">
                            <el-input v-model="item.fullname" :disabled="item.self"/>
                          </el-form-item>
                          <el-form-item
                            prop="relationship"
                            class="medium"
                            label="Parentesco">
                            <el-input v-model="item.relationship" :disabled="item.self"/>
                          </el-form-item>
                        </div>
                        <div class="row-no-center">
                          <el-form-item
                            prop="occupation"
                            class="large"
                            label="Ocupación">
                            <el-input
                              v-model="item.occupation"
                              :disabled="item.self ? item.occupationFilled : false"
                            />
                          </el-form-item>
                          <el-form-item
                            prop="monthlyContribution"
                            class="medium"
                            label="Aportación mensual en pesos"
                          >
                            <el-input v-model="item.monthlyContribution" />
                          </el-form-item>
                        </div>
                      </div>
                      <div class="removeCont" v-if="!item.self">
                        <div @click="removeCore(index)" class="remove row">
                          <span>x</span>
                        </div>
                        <span class="btnText">Remover miembro familiar</span>
                      </div>
                    </div>
                  </el-form>
                </div>
                <div class="row-no-center">
                  <div @click="addCore" class="add row">
                    <span>&#43;</span>
                  </div>
                  <span class="btnText">Agregar un miembro familiar</span>
                </div>
                <p style="color:#000000;font-size:12px;margin:35px 0px 10px 0px;">
                  AMPLIA: Número de personas ocupadas de 14 años y mas que apoyen a
                  la economía de la unidad domestica.
                </p>
                <div
                  v-for="( item, index ) in wide"
                  :key="`wide${index}`"
                  style="margin-bottom:15px;"
                >
                  <el-form
                    :model="item"
                    :ref="`dynamicWide${index}`"
                    :rules="familyRules"
                  >
                    <div class="row-no-center">
                      <div>
                        <div class="row-no-center">
                          <el-form-item prop="fullname" class="large" label="Nombre Completo">
                            <el-input v-model="item.fullname" />
                          </el-form-item>
                          <el-form-item prop="relationship" class="medium" label="Parentesco">
                            <el-input v-model="item.relationship" />
                          </el-form-item>
                        </div>
                        <div class="row-no-center">
                          <el-form-item prop="occupation" class="large" label="Ocupación">
                            <el-input v-model="item.occupation" />
                          </el-form-item>
                          <el-form-item
                            prop="monthlyContribution"
                            class="medium"
                            label="Aportación mensual en pesos"
                          >
                            <el-input v-model="item.monthlyContribution" />
                          </el-form-item>
                          <el-form-item
                            prop="otherContribution"
                            class="medium"
                            label="Otros ingresos"
                          >
                            <el-input v-model="item.otherContribution" />
                          </el-form-item>
                        </div>
                      </div>
                      <div class="removeCont">
                        <div @click="removeWide(index)" class="remove row">
                          <span>x</span>
                        </div>
                        <span class="btnText">Remover miembro familiar</span>
                      </div>
                    </div>
                  </el-form>
                </div>
                <div class="row-no-center">
                  <div @click="addWide" class="add row">
                    <span>&#43;</span>
                  </div>
                  <span class="btnText">Agregar un miembro familiar</span>
                </div>
              </div>
              <div style="margin-top:20px;">
                <p class="label-style">EGRESOS MENSUALES EN PROMEDIO</p>
                <div class="row-no-center">
                  <el-form-item prop="expenseWater" class="medium" label="Agua">
                    <el-input v-model="form.expenseWater" />
                  </el-form-item>
                  <el-form-item prop="expenseLight" class="medium" label="Luz">
                    <el-input v-model="form.expenseLight" />
                  </el-form-item>
                  <el-form-item prop="expensePhone" class="medium" label="Teléfono / Internet Fijo">
                    <el-input v-model="form.expensePhone" />
                  </el-form-item>
                  <el-form-item prop="expenseCellPhone" class="medium" label="Celular">
                    <el-input v-model="form.expenseCellPhone" />
                  </el-form-item>
                  <el-form-item prop="expenseGas" class="medium" label="Gas">
                    <el-input v-model="form.expenseGas" />
                  </el-form-item>
                </div>
                <div class="row-no-center">
                  <el-form-item prop="expenseFood" class="medium lh" label="Alimentación">
                    <el-input v-model="form.expenseFood" />
                  </el-form-item>
                  <el-form-item
                    prop="expenseHouseSupplies"
                    class="medium"
                    label="Productos de limpieza o mantenimiento del hogar"
                  >
                    <el-input v-model="form.expenseHouseSupplies" />
                  </el-form-item>
                  <el-form-item prop="expenseHealth" class="medium lh" label="Salud">
                    <el-input v-model="form.expenseHealth" />
                  </el-form-item>
                  <el-form-item prop="expenseEducation" class="medium lh" label="Educación">
                    <el-input v-model="form.expenseEducation" />
                  </el-form-item>
                  <el-form-item prop="expenseRent" class="medium lh" label="Renta">
                    <el-input v-model="form.expenseRent" />
                  </el-form-item>
                </div>
                <div class="row-no-center">
                  <el-form-item
                    prop="expenseTransport"
                    class="medium"
                    label="Gasolina y/o transporte público"
                  >
                    <el-input v-model="form.expenseTransport" />
                  </el-form-item>
                  <el-form-item prop="expenseCreditCard" class="medium" label="Tarjetas de crédito">
                    <el-input v-model="form.expenseCreditCard" />
                  </el-form-item>
                  <el-form-item prop="expenseOther" class="medium" label="Otros">
                    <el-input v-model="form.expenseOther" />
                  </el-form-item>
                </div>
                <el-form-item
                  class="med-lg"
                  prop="incomeReceipts"
                  label="Se mostraron comprobantes de ingresos"
                  style="margin-top:10px;"
                >
                  <el-select v-model="form.incomeReceipts">
                    <el-option
                      v-for="item in tf"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  class="med-lg"
                  prop="outcomeReceipts"
                  label="Se mostraron comprobantes de egresos"
                  style="margin-top:10px;"
                >
                  <el-select v-model="form.outcomeReceipts">
                    <el-option
                      v-for="item in tf"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div style="margin-top:20px;">
                <p class="label-style">CUALITATIVO</p>
                <div class="row-no-center" style="margin-top: 15px;">
                  <el-form-item
                    prop="familySituationDescription"
                    class="large"
                    label="Descripción de la situación familiar"
                  >
                    <el-input
                      v-model="form.familySituationDescription"
                      type="textarea"
                      :autosize="{ minRows: 3, maxRows: 3}"
                    />
                  </el-form-item>
                  <el-form-item
                    prop="comments"
                    class="large"
                    label="Comentarios de la Trabajdora Social"
                  >
                    <el-input
                      v-model="form.comments"
                      type="textarea"
                      :autosize="{ minRows: 3, maxRows: 3}"
                    />
                  </el-form-item>
                </div>
                <el-form-item
                  class="medium"
                  label="Evaluación de la Trabajadora Social"
                  style="margin-top:10px;"
                  prop="evaluationResult"
                >
                  <el-select v-model="form.evaluationResult">
                    <el-option
                      v-for="item in evaluationResult"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  class="medium"
                  prop="programApplied"
                  label="Programa al que califica"
                  style="margin-top:10px;"
                  v-if="form.evaluationResult === evaluationResult[1].value"
                >
                  <el-select v-model="form.programApplied">
                    <el-option
                      v-for="item in programApplied"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <el-form-item style="width: 100%!important;">
                <el-button
                  @click="beforeSubmit"
                  style="background-color: #6993FF;color:#fff;float:right;"
                >
                  REGISTRAR
                </el-button>
              </el-form-item>
            </el-form>
          </el-main>
        </el-container>
        <DocsDialog
          :docsVisible="docsVisible"
          :folder="'TRABAJO SOCIAL'"
          v-on:closeDialog="closeDialog"
        />
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex';
import lodash from 'lodash';
import Title2 from '../../../components/Title2';
import optionsMixin from './mixin/options';
import DocsDialog from '../../Docs/DocsDialog';

export default {
  data() {
    const isDecimal = (rule, value, cb) => {
      const regexp = /^[0-9]+([,.][0-9]+)?$/g;
      if (value && !regexp.test(value)) {
        return cb(new Error('El campo debe ser un numero decimal.'));
      }
      return cb();
    };
    return {
      docsVisible: false,
      label: 'Por favor llene los datos requeridos para completar la Evaluación',
      bathroom: false,
      houseRoomsBedroom: false,
      form: {
        residenceTimeAtTijuana: null,
        academicDegree: null,
        houseCodition: null,
        houseWalls: null,
        houseFloor: null,
        houseRoof: null,
        houseRoomsLivingRoom: false,
        houseRoomsDiningRoom: false,
        houseRoomsKitchen: false,
        houseRoomsBathroom: null,
        houseRoomsBedroom: 0,
        houseRoomsStudyingRoom: false,
        houseRoomsCourtyard: false,
        houseRoomsOther: false,
        serviceLight: false,
        serviceSewerSystem: false,
        serviceCableTV: false,
        servicePhone: false,
        serviceInternet: false,
        serviceAsphaltStreet: false,
        servicePublicWater: false,
        serviceOther: false,
        houseStuffFridge: false,
        houseStuffStove: false,
        houseStuffMicrowaveOven: false,
        houseStuffBlender: false,
        houseStuffWashingMachine: false,
        houseStuffDryer: false,
        houseStuffComputer: false,
        houseStuffDiningRoomSet: false,
        houseStuffLivingRoomSet: false,
        houseStuffBedroomSet: false,
        houseStuffTV: false,
        houseStuffDishWasher: false,
        car: null,
        expenseWater: null,
        expenseLight: null,
        expensePhone: null,
        expenseCellPhone: null,
        expenseGas: null,
        expenseFood: null,
        expenseHouseSupplies: null,
        expenseHealth: null,
        expenseEducation: null,
        expenseRent: null,
        expenseTransport: null,
        expenseCreditCard: null,
        expenseOther: null,
        incomeReceipts: null,
        outcomeReceipts: null,
        familySituationDescription: null,
        comments: null,
        evaluationResult: null,
        programApplied: null,
      },
      initialForm: {},
      isFirstEvaluation: true,
      core: [],
      wide: [],
      familyRules: {
        fullname: [
          {
            required: true,
            message: 'El campo es requerido',
          },
        ],
        relationship: [
          {
            required: true,
            message: 'El campo es requerido',
          },
        ],
        occupation: [
          {
            required: true,
            message: 'El campo es requerido',
          },
        ],
        monthlyContribution: [
          {
            validator: isDecimal,
          },
        ],
        otherContribution: [
          {
            validator: isDecimal,
          },
        ],
      },
      rules: {
        expenseWater: [
          {
            validator: isDecimal,
          },
        ],
        expenseLight: [
          {
            validator: isDecimal,
          },
        ],
        expensePhone: [
          {
            validator: isDecimal,
          },
        ],
        expenseCellPhone: [
          {
            validator: isDecimal,
          },
        ],
        expenseGas: [
          {
            validator: isDecimal,
          },
        ],
        expenseFood: [
          {
            validator: isDecimal,
          },
        ],
        expenseHouseSupplies: [
          {
            validator: isDecimal,
          },
        ],
        expenseHealth: [
          {
            validator: isDecimal,
          },
        ],
        expenseEducation: [
          {
            validator: isDecimal,
          },
        ],
        expenseRent: [
          {
            validator: isDecimal,
          },
        ],
        expenseTransport: [
          {
            validator: isDecimal,
          },
        ],
        expenseCreditCard: [
          {
            validator: isDecimal,
          },
        ],
        expenseOther: [
          {
            validator: isDecimal,
          },
        ],

      },
      loadingService: null,
      loading: false,
      hasSelfOccupation: false,
    };
  },
  mixins: [optionsMixin],
  components: {
    Title2,
    DocsDialog,
  },
  computed: {
    ...mapState({
      role: (state) => state.auth.user.role,
    }),
  },
  methods: {
    closeDialog() {
      this.docsVisible = false;
    },
    generateEmptyCore() {
      return {
        id: 0,
        fullname: null,
        relationship: null,
        occupation: null,
        monthlyContribution: null,
      };
    },
    generateEmptyWide() {
      return {
        id: 0,
        fullname: null,
        relationship: null,
        occupation: null,
        monthlyContribution: null,
        otherContribution: null,
      };
    },
    attach() {},
    validateCore() {
      let validCount = 0;
      const formAmount = this.core.length;
      this.core.forEach((item, index) => {
        this.$refs[`dynamicCore${index}`][0].validate((isValid) => {
          if (isValid) {
            validCount += 1;
          }
        });
      });
      if (validCount === formAmount) {
        return true;
      }
      return false;
    },
    validateWide() {
      let validCount = 0;
      const formAmount = this.wide.length;
      this.wide.forEach((item, index) => {
        this.$refs[`dynamicWide${index}`][0].validate((isValid) => {
          if (isValid) {
            validCount += 1;
          }
        });
      });
      if (validCount === formAmount) {
        return true;
      }
      return false;
    },
    addCore() {
      this.core.push(this.generateEmptyCore());
    },
    addWide() {
      this.wide.push(this.generateEmptyWide());
    },
    removeCore(index) {
      if (this.core.length !== 0) {
        this.core.splice(index, 1);
      }
    },
    removeWide(index) {
      if (this.wide.length !== 0) {
        this.wide.splice(index, 1);
      }
    },
    beforeSubmit() {
      if (this.validateCore() && this.validateWide()) {
        this.$refs.refId.validate((isValid) => {
          if (isValid) {
            this.submit();
          }
        });
      }
    },
    format() {
      return {
        patient: this.form.patient,
        residenceTimeAtTijuana: this.form.residenceTimeAtTijuana,
        academicDegree: this.form.academicDegree,
        houseCondition: this.form.houseCondition,
        houseWalls: this.form.houseWalls,
        houseFloor: this.form.houseFloor,
        houseRoof: this.form.houseRoof,
        houseRoomsLivingRoom: this.form.houseRoomsLivingRoom,
        houseRoomsDiningRoom: this.form.houseRoomsDiningRoom,
        houseRoomsKitchen: this.form.houseRoomsKitchen,
        houseRoomsBathroom: this.bathroom ? this.form.houseRoomsBathroom : null,
        houseRoomsBedroom: this.houseRoomsBedroom ? this.form.houseRoomsBedroom : null,
        houseRoomsStudyingRoom: this.form.houseRoomsStudyingRoom,
        houseRoomsCourtyard: this.form.houseRoomsCourtyard,
        houseRoomsOther: this.form.houseRoomsOther,
        serviceLight: this.form.serviceLight,
        serviceSewerSystem: this.form.serviceSewerSystem,
        serviceCableTV: this.form.serviceCableTV,
        servicePhone: this.form.servicePhone,
        serviceInternet: this.form.serviceInternet,
        serviceAsphaltStreet: this.form.serviceAsphaltStreet,
        servicePublicWater: this.form.servicePublicWater,
        serviceOther: this.form.serviceOther,
        houseStuffFridge: this.form.houseStuffFridge,
        houseStuffStove: this.form.houseStuffStove,
        houseStuffMicrowaveOven: this.form.houseStuffMicrowaveOven,
        houseStuffBlender: this.form.houseStuffBlender,
        houseStuffWashingMachine: this.form.houseStuffWashingMachine,
        houseStuffDryer: this.form.houseStuffDryer,
        houseStuffComputer: this.form.houseStuffComputer,
        houseStuffDiningRoomSet: this.form.houseStuffDiningRoomSet,
        houseStuffLivingRoomSet: this.form.houseStuffLivingRoomSet,
        houseStuffBedroomSet: this.form.houseStuffBedroomSet,
        houseStuffTV: this.form.houseStuffTV,
        houseStuffDishWasher: this.form.houseStuffDishWasher,
        car: this.form.car,
        expenseWater: parseFloat(this.form.expenseWater),
        expenseLight: parseFloat(this.form.expenseLight),
        expensePhone: parseFloat(this.form.expensePhone),
        expenseCellPhone: parseFloat(this.form.expenseCellPhone),
        expenseGas: parseFloat(this.form.expenseGas),
        expenseFood: parseFloat(this.form.expenseFood),
        expenseHouseSupplies: parseFloat(this.form.expenseHouseSupplies),
        expenseHealth: parseFloat(this.form.expenseHealth),
        expenseEducation: parseFloat(this.form.expenseEducation),
        expenseRent: parseFloat(this.form.expenseRent),
        expenseTransport: parseFloat(this.form.expenseTransport),
        expenseCreditCard: parseFloat(this.form.expenseCreditCard),
        expenseOther: parseFloat(this.form.expenseOther),
        incomeReceipts: this.form.incomeReceipts,
        outcomeReceipts: this.form.outcomeReceipts,
        familySituationDescription: this.form.familySituationDescription,
        comments: this.form.comments,
        evaluationResult: this.form.evaluationResult,
        programApplied: this.form.evaluationResult === this.evaluationResult[1].value
          ? this.form.programApplied : null,
      };
    },
    getDiff(obj1 = {}, obj2 = {}, diff = [], keyMap = '') {
      Object.keys(obj1).forEach((key) => {
        if (typeof obj2[key] === 'object' && obj2[key] !== null && !Array.isArray(obj2[key])) {
          const diffR = this.getDiff(obj1[key], obj2[key], diff, `${keyMap}${key}.`);
          diff.concat(diffR);
        } else if (!lodash.isEqual(obj1[key], obj2[key])) {
          let keyMapFormatted = `${keyMap}${key}`;
          keyMapFormatted = keyMapFormatted.replace(/[0-9]$/g, '');
          keyMapFormatted = keyMapFormatted[keyMapFormatted.length - 1] === '.'
            ? keyMapFormatted.slice(0, -1) : keyMapFormatted;
          diff.push(keyMapFormatted);
        }
      });
      return diff;
    },
    wideChanged() {
      if (this.initialWide.length !== this.wide.length) {
        return true;
      }
      for (let i = 0; i < this.wide.length && i < this.initialWide.length; i++) {
        const diff = this.getDiff(this.initialWide[i], this.wide[i]);
        if (diff.length) {
          return true;
        }
      }
      return false;
    },
    coreChanged() {
      if (this.initialCore.length !== this.core.length) {
        return true;
      }
      for (let i = 0; i < this.core.length && i < this.initialCore.length; i++) {
        const diff = this.getDiff(this.initialCore[i], this.core[i]);
        if (diff.length) {
          return true;
        }
      }
      return false;
    },
    async submit() {
      try {
        this.loading = true;
        const requests = [];
        const data = this.format();
        const { id: patientId } = this.$route.params;
        if (this.isFirstEvaluation) {
          requests.push(this.axios.post(`patient/social/${patientId}`, data));
          requests.concat(this.core.map((item) => this.axios.post(`patient/social/family/core/${patientId}`, {
            ...item,
            monthlyContribution: parseFloat(item.monthlyContribution),
          })));
          requests.concat(this.wide.map((item) => this.axios.post(`patient/social/family/wide/${patientId}`, {
            ...item,
            monthlyContribution: parseFloat(item.monthlyContribution),
            otherContribution: parseFloat(item.otherContribution),
          })));
          const response = await Promise.all(requests);
          if (response.length) {
            await this.axios.post(`patient/changelog/${patientId}`, {
              title: 'EVALUACIÓN SOCIOECONÓMICA',
              message: 'Se ha agregado evaluación socioeconómica',
            });
          }
          this.$notify({
            type: 'success',
            title: '¡Éxito!',
            message: 'Se ha agregado evaluación socioeconómica',
          });
          this.loading = false;
          setTimeout(() => {
            this.$router.replace('/');
          });
        } else {
          const formDiff = this.getDiff(this.initialForm, this.form);
          let message;
          const coreChanged = this.coreChanged();
          if (coreChanged) {
            requests.concat(this.initialCore.map((item) => this.axios.delete(`patient/social/family/core/${item.id}/${patientId}`, {
              data: {
                patient: data.patient,
              },
            })));
            requests.concat(this.core.map((item) => this.axios.post(`patient/social/family/core/${patientId}`, {
              ...item,
              monthlyContribution: parseFloat(item.monthlyContribution),
            })));
            message = 'Se modificó la estructura familiar nuclear';
          }
          const wideChanged = this.wideChanged();
          if (wideChanged) {
            requests.concat(this.initialWide.map((item) => this.axios.delete(`patient/social/family/wide/${item.id}/${patientId}`, {
              data: {
                patient: data.patient,
              },
            })));
            requests.concat(this.wide.map((item) => this.axios.post(`patient/social/family/wide/${patientId}`, {
              ...item,
              monthlyContribution: parseFloat(item.monthlyContribution),
              otherContribution: parseFloat(item.otherContribution),
            })));
            message = 'Se modificó la estructura familiar amplia';
          }
          if (coreChanged && wideChanged) {
            message = 'Se modificaron las estructuras familiares';
            requests.push(this.axios.post(`patient/changelog/${patientId}`, {
              patient: data.patient,
              title: 'EVALUACIÓN SOCIOECONÓMICA',
              message,
            }));
          }
          if (formDiff.length) {
            requests.push(this.axios.put(`patient/social/${patientId}`, data));
            message = 'Se modificó el perfil socioeconómico';
          }
          const response = await Promise.all(requests);
          if (response.length) {
            this.axios.post(`patient/changelog/${patientId}`, {
              title: 'EVALUACIÓN SOCIOECONÓMICA',
              message,
            });
            this.$notify({
              type: 'success',
              title: '¡Éxito!',
              message,
            });
            setTimeout(() => {
              this.$router.replace('/');
            });
          } else {
            this.$notify({
              type: 'success',
              title: '¡Éxito!',
              message: 'Sin cambios',
            });
            setTimeout(() => {
              this.$router.replace('/');
            });
          }
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },
    async getData(patientId) {
      try {
        const response = await this.axios.get(`patient/social/details/${patientId}`);
        if (response.data) {
          const { data } = response;
          this.form = data;
          this.core = data.familyCore;
          this.wide = data.familyWide;
          this.isFirstEvaluation = false;
          const { houseRoomsBathroom, houseRoomsBedroom } = data;
          if (houseRoomsBathroom) {
            this.bathroom = true;
          }
          this.houseRoomsBedroom = !!houseRoomsBedroom;

          const formClone = JSON.parse(JSON.stringify(this.form));
          this.initialForm = formClone;
          const coreClone = JSON.parse(JSON.stringify(this.core));
          this.initialCore = coreClone;

          const wideClone = JSON.parse(JSON.stringify(this.wide));
          this.initialWide = wideClone;
          if (this.core.length) {
            this.core[0].self = true;
            this.core[0].occupationFilled = true;
          } else {
            const response2 = await this.axios.get(`patient/profile/${patientId}`);
            const response3 = await this.axios.get(`patient/info/${patientId}`);
            if (response2 && response3) {
              this.core.push({
                self: true,
                occupationFilled: !!response2.data.occupation,
                fullname: `${response3.data.firstName} ${response3.data.lastName}`,
                relationship: 'N/A',
                occupation: response2.data.occupation,
                monthlyContribution: null,
              });
            }
          }
        } else {
          this.isFirstEvaluation = true;
          const response2 = await this.axios.get(`patient/profile/${patientId}`);
          const response3 = await this.axios.get(`patient/info/${patientId}`);
          if (response2 && response3) {
            this.core.push({
              self: true,
              occupationFilled: !!response2.data.occupation,
              fullname: `${response3.data.firstName} ${response3.data.lastName}`,
              relationship: 'N/A',
              occupation: response2.data.occupation,
              monthlyContribution: null,
            });
          }
        }
        this.form.patient = patientId;
      } catch (error) {
        this.$errorNotify(error);
      }
    },
  },
  async created() {
    const { id } = this.$route.params;
    this.form.patient = id;
    await this.getData(id);
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
