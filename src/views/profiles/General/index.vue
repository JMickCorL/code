<template>
  <el-row class="row">
    <el-col class="col">
      <Title2
        :btnText="btnText"
        title="PERFIL GENERAL DEL PACIENTE"
        label="Por favor llene los datos básicos
        requeridos para generar el Perfil Básico del Paciente"
        v-on:beforeSubmit="beforeSubmit"
      />
      <div class="form">
        <el-container>
          <el-main>
            <div class="form-wrapper">
              <p
                style="color:#006EFF;font-weight:bold;font-size:15px!important;margin:0px;"
              >DATOS GENERALES</p>
              <el-form
                :model="form"
                ref="refId"
                :rules="rules"
                @submit.prevent
              >
                <div class="row-no-center">
                  <el-form-item prop="firstName" label="Nombre" class="medium">
                    <el-input v-model="form.firstName" maxlength="60" />
                  </el-form-item>
                  <el-form-item prop="lastName" label="Apellido" class="medium">
                    <el-input v-model="form.lastName" maxlength="60" />
                  </el-form-item>
                </div>
                <div class="row-no-center">
                  <el-form-item prop="Número de teléfono" label="Teléfono" class="medium">
                    <el-input
                      v-model="form.phone"
                      v-mask="'(999) 999-9999'"
                      placeholder="(___) ___-____"
                    />
                  </el-form-item>
                  <el-form-item prop="cellPhone" label="Celular" class="medium">
                    <el-input
                      v-model="form.cellPhone"
                      v-mask="'(999) 999-9999'"
                      placeholder="(___) ___-____"
                    />
                  </el-form-item>
                  <el-form-item prop="extraPhone" label="Teléfono Extra" class="medium">
                    <el-input
                      v-model="form.extraPhone"
                      v-mask="'(999) 999-9999'"
                      placeholder="(___) ___-____"
                    />
                  </el-form-item>
                </div>
                <div class="row-no-center">
                  <el-form-item
                    prop="birthdate"
                    label="Fecha de naciemiento"
                    class="medium"
                    style="margin-right: 10px;"
                  >
                    <el-date-picker
                      v-model="form.birthdate"
                      type="date"
                      :editable="false"
                      :picker-options="{
                        disabledDate(time) {
                          return time.getTime() > Date.now();
                        },
                      }"
                      placeholder="Seleccione una fecha" />
                  </el-form-item>
                  <el-form-item prop="curp" label="CURP" class="large">
                    <el-input
                      v-model="form.curp"
                      @input="(val) =>  form.curp = val.toUpperCase()"
                      maxlength="18"
                    />
                  </el-form-item>
                </div>
                <div class="row-no-center">
                  <el-form-item prop="participateAs" class="small" label="Participa como">
                    <el-select v-model="form.participateAs">
                      <el-option
                        v-for="item in participateAs"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="gender" class="small" label="Genero">
                    <el-select v-model="form.gender">
                      <el-option
                        v-for="item in genders"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="birthplace" label="Lugar de Nacimiento" class="large">
                    <el-input v-model="form.birthplace" />
                  </el-form-item>
                </div>
                <div class="row-no-center">
                  <el-form-item prop="email" label="Correo Electrónico" class="large">
                    <el-input
                      v-model="form.email"
                      maxlength="255"
                    />
                  </el-form-item>
                </div>
                <div>
                  <div class="row-no-center">
                    <el-form-item
                      prop="address"
                      label="Dirección"
                      class="large"
                      style="width:680px"
                    >
                      <el-input
                        v-model="form.address"
                        maxlength="255"
                      />
                    </el-form-item>
                  </div>

                  <div class="row-no-center">
                    <el-form-item prop="country" label="País" class="medium">
                      <el-input
                        v-model="form.country"
                        maxlength="255"
                      />
                    </el-form-item>
                    <el-form-item prop="state" label="Estado/Provincia/Región" class="medium">
                      <!-- <el-input v-model="form.state" /> -->
                      <el-autocomplete
                        class="inline-input"
                        v-model="form.state"
                        :fetch-suggestions="stateAutocomplete"
                      />
                    </el-form-item>
                    <el-form-item prop="city" label="Ciudad" class="medium">
                      <el-autocomplete
                        class="inline-input"
                        v-model="form.city"
                        :fetch-suggestions="cityAutocomplete"
                      />
                    </el-form-item>
                    <el-form-item prop="zipCode" label="Código postal" class="medium">
                      <el-input
                        v-model="form.zipCode"
                        maxlength="20"
                      />
                    </el-form-item>
                  </div>
                </div>
                <div>
                  <div class="row-no-center">
                    <el-form-item prop="maritalStatus" label="Estado civil" class="medium">
                      <el-select v-model="form.maritalStatus">
                        <el-option
                          v-for="item in maritalStatusOpt"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="etnia" label="Pertenece a una Etnia" class="medium">
                      <el-select v-model="form.etnia">
                        <el-option
                          v-for="item in tfOps"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      prop="etnia2"
                      class="medium added"
                      label="Especificar Etnia"
                      v-if="form.etnia === 'Si'"
                    >
                      <el-input v-model="form.ethnic" />
                    </el-form-item>
                  </div>

                  <div class="row-no-center">
                    <el-form-item prop="occupation" label="Ocupación" class="large">
                      <el-select v-model="form.occupation">
                        <el-option
                          v-for="item in ocupations"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="affiliation" label="Derechohabiencia" class="medium">
                      <el-select v-model="form.haveAffiliation">
                        <el-option
                          v-for="item in tfOps"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      prop="dh"
                      label="Tipo de Derechohabiencia"
                      class="medium"
                      v-if="form.haveAffiliation === 'Si'"
                    >
                      <el-select v-model="form.affiliation">
                        <el-option
                          v-for="item in affiliation"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item prop="reference" label="Referencia" class="large">
                      <el-select v-model="form.reference">
                        <el-option
                          v-for="item in references"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div>
                  <p
                    style="
                      color: #006EFF;
                      font-weight: bold;
                      font-size: 15px !important;
                      margin: 0px;
                    "
                  >
                    ANTECEDENTES FAMILIARES
                  </p>
                  <div class="row-no-center">
                    <div class="col-no-center">
                      <el-checkbox v-model="form.familyDiabetes">Diabetes</el-checkbox>
                      <el-checkbox v-model="form.familyCancer">Cancer</el-checkbox>
                      <el-checkbox v-model="form.familyMyopia">Miopia</el-checkbox>
                      <el-checkbox v-model="form.familyHepatitis">Hepatitis</el-checkbox>
                    </div>
                    <div class="col-no-center">
                      <el-checkbox v-model="form.familyAlcoholism">Alcoholismo</el-checkbox>
                      <el-checkbox v-model="form.familyAllergy">Alergias</el-checkbox>
                      <el-checkbox v-model="form.familyCongenitalCataracts">
                        Cataratas Congénitas
                      </el-checkbox>
                      <el-checkbox v-model="form.familyGlasses">Usa lentes</el-checkbox>
                    </div>
                    <div class="col-no-center" style="margin-left:10px;">
                      <el-checkbox v-model="form.familySmoking">Tabaquismo</el-checkbox>
                      <el-checkbox v-model="form.familyGlaucoma">Glaucoma</el-checkbox>
                      <el-checkbox v-model="form.familyArterialHypertension">
                        Hipertensión arterial
                      </el-checkbox>
                      <el-checkbox v-model="form.familyVih">
                        VIH
                      </el-checkbox>
                    </div>
                  </div>
                </div>
                <div>
                  <p
                    style="
                      color: #006EFF;
                      font-weight: bold;
                      font-size: 15px !important;
                      margin: 0px;
                    "
                  >
                    ANTECEDENTES PERSONALES
                  </p>
                  <div class="row-no-center">
                    <div class="col-no-center">
                      <el-checkbox v-model="form.diabetes">Diabetes</el-checkbox>
                      <el-checkbox v-model="form.cancer">Cancer</el-checkbox>
                      <el-checkbox v-model="form.myopia">Miopia</el-checkbox>
                      <el-checkbox v-model="form.hepatitis">Hepatitis</el-checkbox>
                    </div>
                    <div class="col-no-center">
                      <el-checkbox v-model="form.alcoholism">Alcoholismo</el-checkbox>
                      <el-checkbox v-model="form.allergy">Alergias</el-checkbox>
                      <el-checkbox v-model="form.congenitalCataracts">
                        Cataratas Congénitas
                      </el-checkbox>
                      <el-checkbox v-model="form.glasses">Usa lentes</el-checkbox>
                    </div>
                    <div class="col-no-center" style="margin-left:10px;">
                      <el-checkbox v-model="form.smoking">Tabaquismo</el-checkbox>
                      <el-checkbox v-model="form.glaucoma">Glaucoma</el-checkbox>
                      <el-checkbox v-model="form.arterialHypertension">
                        Hipertensión arterial
                      </el-checkbox>
                      <el-checkbox v-model="form.vih">VIH</el-checkbox>
                    </div>
                  </div>
                </div>
                <el-form-item prop="agree">
                  <el-checkbox v-model="form.agree">
                    El Paciente acepta los Términos y Condiciones del
                    Tratamiento y/o Procedimientos
                  </el-checkbox>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="beforeSubmit"
                    style="
                      background-color: #6993FF;
                      color: #fff;
                    "
                  >
                    {{ btnText }}
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
            <el-col class="avatar-wrapper">
              <input
                id="fileInput"
                ref="fileInp"
                type="file"
                style="display: none;"
                v-on:change="setImage">
              <div class="component">
                <Avatar
                  :src="avatar"
                  :size="225"
                  fit="cover"
                />
              </div>
              <div class="text-wrapper">
                <div
                  @click="openfile"
                  class="uploader-btn"
                  >
                  <b>Adjuntar / Modificar Fotografía</b>
                </div>
                <p>referencia del paciente</p>
              </div>
            </el-col>
          </el-main>
        </el-container>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex';
import { Notification } from 'element-ui';
import { originalURL } from '../../../API';
import Title2 from '../../../components/Title2';
import rulesMixin from './mixin/rules';
import optionsMixin from './mixin/options';
import states from '../../../assets/states.json';
import cities from '../../../assets/cities.json';

export default {
  data() {
    const etnia = (rule, value, cb) => {
      if (this.form.etnia === 'Si' && !value) {
        return cb(new Error('El campo es requerido.'));
      }
      return cb();
    };
    const affiliation = (rule, value, cb) => {
      if (this.form.haveAffiliation === 'Si' && !value) {
        return cb(new Error('El campo es requerido.'));
      }
      return cb();
    };
    return {
      baseURL: originalURL,
      avatarSrc: null,
      avatar: null,
      form: {
        firstName: '',
        lastName: '',
        cellPhone: '',
        phone: '',
        extraPhone: '',
        curp: '',
        birthdate: '',
        participateAs: null,
        patient: null,
        gender: null,
        email: null,
        birthplace: null,
        address: null,
        city: null,
        state: null,
        zipCode: null,
        country: null,
        maritalStatus: null,
        etnia: 'No',
        ethnic: null,
        occupation: null,
        haveAffiliation: 'No',
        affiliation: null,
        reference: null,
        diabetes: false,
        alcoholism: false,
        smoking: false,
        cancer: false,
        allergy: false,
        glaucoma: false,
        congenitalCataracts: false,
        arterialHypertension: false,
        hepatitis: false,
        glasses: false,
        vih: false,
        familyDiabetes: false,
        familyAlcoholism: false,
        familySmoking: false,
        familyCancer: false,
        familyAllergy: false,
        familyGlaucoma: false,
        familyCongenitalCataracts: false,
        familyArterialHypertension: false,
        familyHepatitis: false,
        familyGlasses: false,
        familyVih: false,
        agree: false,
      },
      btnText: 'REGISTRAR',
      loading: false,
      loadingService: null,
      rules: {
        ethnic: [
          {
            trigger: 'blur',
            validator: etnia,
          },
        ],
        affiliation: [
          {
            trigger: 'blur',
            validator: affiliation,
          },
        ],
      },
    };
  },
  mixins: [rulesMixin, optionsMixin],
  components: {
    Title2,
  },
  computed: {
    ...mapState({
      role: (state) => state.auth.user.role,
    }),
  },
  methods: {
    stateAutocomplete(queryString, cb) {
      const regExp = new RegExp(queryString.toLowerCase(), 'g');
      const values = states.filter((x) => regExp.test(x.toLowerCase()));
      return cb(values.map((x) => ({ value: x })));
    },
    cityAutocomplete(queryString, cb) {
      const regExp = new RegExp(queryString.toLowerCase(), 'g');
      const statesPlain = Object.keys(cities);
      const state = statesPlain.filter((x) => {
        const reg = new RegExp(x.toLowerCase(), 'g');
        return reg.test(this.form.state.toLowerCase());
      })[0];
      let values = [];
      if (state) {
        values = cities[state].filter((x) => regExp.test(x.toLowerCase()));
      }
      return cb(values.map((x) => ({ value: x })));
    },
    beforeSubmit() {
      this.$refs.refId.validate((isValid) => {
        if (isValid) {
          this.submit();
        }
      });
    },
    async submit() {
      try {
        this.loading = true;
        const requests = [];
        const message = this.btnText === 'REGISTRAR'
          ? 'Se registró el Perfil General del paciente'
          : 'Se actualizó el Perfil General del paciente';
        const patient = this.$route.params.id;
        this.form.ethnic = this.form.etnia === 'Si'
          ? this.form.ethnic : null;
        this.form.affiliation = this.form.haveAffiliation === 'Si'
          ? this.form.affiliation : null;
        requests.push(this.axios.post(`patient/profile/${patient}`, this.form));
        requests.push(this.axios.post(`patient/info/${patient}`, {
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          cellPhone: this.form.cellPhone,
          phone: this.form.phone,
          extraPhone: this.form.extraPhone,
          curp: this.form.curp,
          birthdate: this.form.birthdate,
        }));
        const response = await Promise.all(requests);
        if (response.length) {
          await this.axios.post(`patient/changelog/${patient}`, {
            patient: this.form.patient,
            title: 'PERFIL GENERAL',
            message,
          });
          Notification({
            type: 'success',
            title: 'Éxito!',
            message,
          });
        }
        this.loading = false;
        setTimeout(() => {
          this.$router.replace({ path: '/' });
        });
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
    async getData() {
      const { id } = this.$route.params;
      this.form.patient = id;
      this.avatar = this.avatarSrc ? `${this.baseURL}/static/patient/avatar/${this.avatarSrc}` : null;
      try {
        const response = await Promise.all([this.axios.get(`patient/profile/${id}`), this.axios.get(`patient/info/${id}`)]);
        const data = response.reduce((prev, curr) => Object.assign(prev.data, curr.data));
        if (data) {
          this.form = {
            ...data,
            etnia: data.ethnic ? 'Si' : 'No',
            ethnic: data.ethnic || null,
            haveAffiliation: data.affiliation ? 'Si' : 'No',
            agree: true,
          };
          this.btnText = 'ACTUALIZAR';
        }
      } catch (error) {
        this.$errorNotify(error);
      }
    },
    openfile() {
      document.getElementById('fileInput').click();
    },
    async setImage() {
      try {
        const { id } = this.$route.params;
        this.loading = true;
        const file = this.$refs.fileInp.files;
        if (file.length) {
          const MbLimit = 10;
          const size = file[0].size / 1024 / 1024 < MbLimit;
          if (size) {
            const data = new FormData();
            data.append('file', file[0]);
            const response = await Promise.all([
              this.axios.patch(`patient/avatar/${id}`, data, {
                'content-type': 'application/form-data',
              }),
              this.axios.post(`patient/changelog/${id}`, {
                title: 'PERFIL GENERAL',
                message: 'Se actualizó la fotografía del paciente',
              }),
            ]);
            if (response[0]) {
              this.avatar = `${this.baseURL}/static/patient/avatar/${response[0].data.image}`;
            }
          } else {
            this.$message({
              type: 'error',
              message: 'La imagen excede el tamaño limite, por favor use un archivo inferior a 1 Mb.',
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
  },
  async mounted() {
    const { id } = this.$route.params;
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
    avatarSrc(val) {
      if (val) {
        this.avatar = `${this.baseURL}/static/patient/avatar/${val}`;
      }
    },
  },
};
</script>
<style lang="scss">
@import './styles/main.scss';
</style>

<style lang="scss" scoped>
@import './styles/main-scoped.scss';
</style>
