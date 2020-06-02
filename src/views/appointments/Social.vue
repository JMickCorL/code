<template>
  <el-row class="row-center">
    <el-col class="col">
      <Title2
        :title="'AGENDAR CITA PARA TRABAJO SOCIAL'"
        :label="'Por favor ingrese los datos para agendar una nueva Evaluación por Trabajo Social'"
        v-on:beforeSubmit="beforeSubmit"
      />
      <div class="profile row">
        <div class="left">
          <el-container>
            <el-main>
              <p
                style="color:#006EFF;font-weight:bold;font-size:15px!important;margin:0px;"
              >DATOS GENERALES</p>
              <br >
              <el-form
                :model="form"
                ref="refId"
                :rules="rules"
                @submit.prevent
              >
                <div class="row">
                  <el-form-item prop="names" label="Nombres">
                    <el-input v-model="form.firstName" disabled="disabled" />
                  </el-form-item>
                  <el-form-item
                    prop="surnames"
                    label="Apellidos"
                    style="padding-left:5%;padding-right:0%!important;"
                  >
                    <el-input v-model="form.lastName" disabled="disabled" />
                  </el-form-item>
                </div>
                <div class="row">
                  <el-form-item prop="birthdate" label="Fecha de Nacimiento">
                    <el-input v-model="form.birthdate" disabled="disabled" />
                  </el-form-item>
                  <el-form-item
                    prop="curp"
                    label="CURP"
                    style="padding-left:5%;padding-right:0%!important;"
                  >
                    <el-input v-model="form.curp" disabled="disabled" />
                  </el-form-item>
                </div>
                <div class="row">
                  <el-form-item prop="phone" label="Teléfono Fijo">
                    <el-input v-model="form.phone" disabled="disabled" />
                  </el-form-item>
                  <el-form-item
                    prop="cellPhone"
                    label="Teléfono Celular"
                    style="padding-left:5%;padding-right:0%!important;"
                  >
                    <el-input v-model="form.cellPhone" disabled="disabled" />
                  </el-form-item>
                </div>
                <div class="row">
                  <el-form-item prop="extraPhone" label="Teléfono Extra">
                    <el-input v-model="form.extraPhone" disabled="disabled" />
                  </el-form-item>
                </div>
                <div class="row">
                  <el-form-item
                    prop="userId"
                    label="Seleccione trabajador social"
                    style="padding-right:0%!important;"
                  >
                    <el-select v-model="form.userId">
                      <el-option
                        v-for="user in users"
                        :key="user.id"
                        :label="`${user.firstName} ${user.lastName}`"
                        :value="user.id"
                      />
                    </el-select>
                  </el-form-item>
                </div>
                <el-form-item
                  label="Razones por las que se solicitó una Evaluación Socioeconómica"
                  prop="comments"
                  style="width:100%;"
                >
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 4}"
                    v-model="form.comments"
                    style="width: 100%!important;"
                    maxlength="255"
                  />
                </el-form-item>
                <el-form-item style="width: 100%!important;">
                  <el-button
                    type="primary"
                    @click="beforeSubmit"
                    style="background-color: #6993FF;color:#fff;float:right;"
                  >AGENDAR</el-button>
                  <el-button
                    type="primary"
                    @click="attach"
                    style="background-color: #A6B1C231;color:#0E64FE;border:0px;"
                  >ADJUNTAR ARCHIVOS</el-button>
                </el-form-item>
              </el-form>
            </el-main>
          </el-container>
        </div>
        <div class="right">
          <Calendar
            v-on:selectedHour="selectedHour"
            v-on:selectedDate="selectedDate"
            :disableds="reservedHours"
          />
        </div>
        <DocsDialog
          :docsVisible="docsVisible"
          folder="TRABAJO SOCIAL"
          v-on:closeDialog="closeDialog"
        />
      </div>
    </el-col>
  </el-row>
</template>

<script>
// import Datepicker from 'vuejs-datepicker';
// import * as lang from 'vuejs-datepicker/src/locale';
import Title2 from '../../components/Title2';
import Calendar from '../../components/Calendar';
import DocsDialog from '../Docs/DocsDialog';

// eslint-disable-next-line
const moment = require('moment');

export default {
  data() {
    const isValidPhone = (rule, value, cb) => {
      const regexp = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
      if (value.trim() && !regexp.test(value)) {
        return cb(new Error('El campo debe ser un número teléfonico válido.'));
      }
      return cb();
    };
    return {
      // languages: lang,
      docsVisible: false,
      language: 'es',
      date: null,
      hour: null,
      loading: false,
      loadingService: null,
      users: [],
      reservedHours: [],
      form: {
        key: '',
        names: '',
        surnames: '',
        birthdate: '',
        curp: '',
        phone: '',
        extraPhone: '',
        cellPhone: '',
        cel: '',
        email: '',
        comments: '',
        userId: null,
      },
      rules: {
        userId: [
          {
            required: true,
            message: 'El campo no puede estar vacío.',
            trigger: 'blur',
          },
          {
            type: 'number',
            message: 'Formato no válido',
            trigger: 'onchange',
          },
        ],
        phone: [
          {
            validator: isValidPhone,
            trigger: 'blur',
          },
        ],
        cel: [
          {
            validator: isValidPhone,
            trigger: 'blur',
          },
        ],
        email: [
          {
            required: true,
            message: 'El campo es requerido',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: 'El campo no es un correo electrónico válido',
            trigger: 'blur',
          },
        ],
        comments: [
          {
            required: false,
          },
        ],
      },
    };
  },
  components: {
    Title2,
    Calendar,
    DocsDialog,
    // Datepicker,
  },
  computed: {
    userId() {
      return this.form.userId;
    },
  },
  methods: {
    attach() {
      this.docsVisible = true;
    },
    selectedHour(value) {
      this.hour = value;
    },
    selectedDate(value) {
      this.date = value;
    },
    closeDialog() {
      this.docsVisible = false;
    },
    beforeSubmit() {
      this.$refs.refId.validate((isValid) => {
        if (isValid && this.date && this.hour) {
          this.submit();
        } else {
          this.$message('Verifique las fechas en el calendario');
        }
      });
    },
    async getData() {
      try {
        this.loading = true;
        const { id: patientId } = this.$route.params;
        const response = await this.axios.get(`patient/info/${patientId}`);
        this.form = {
          ...this.form,
          ...response.data,
        };
        this.initialForm = JSON.parse(JSON.stringify(this.form));
        this.loading = false;
      } catch (error) {
        // do something
        this.loading = false;
      }
    },
    async submit() {
      try {
        this.loading = true;
        // Get form vars
        const {
          comments,
          userId,
        } = this.form;
        const { id: patientId } = this.$route.params;
        const type = 'CITA - TRABAJO SOCIAL';
        const response = await this.axios.post(`patient/appointment/social/${patientId}`, {
          type,
          location: null,
          date: this.date,
          time: this.hour,
          userId,
          comments,
        });
        if (response) {
          const message = 'Se agendó cita con trabajo social';
          await this.axios.post(`patient/changelog/${patientId}`, {
            title: 'Agenda',
            message,
          });
          this.$notify({
            type: 'success',
            message,
          });
          this.loading = false;
          setTimeout(() => {
            this.$router.replace({ path: '/' });
          });
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$errorNotify(error);
      }
    },
    async getUsers() {
      try {
        this.loading = true;
        const response = await this.axios.get('patient/appointment/users/TS');
        const { data } = response;
        if (Array.isArray(data)) {
          this.users = data;
        }
        this.loading = false;
      } catch (error) {
        this.$errorNotify(error);
        this.loading = false;
      }
    },
    async getReservedHours() {
      try {
        this.loading = true;
        if (this.date) {
          const response = await this.axios(`patient/appointment/social/reserved-schedules/${this.form.userId}?date=${this.date}`);
          const { data } = response;
          if (Array.isArray(data) && data.length > 0) {
            this.reservedHours = data.map((x) => ({
              ...x,
              time: x.time.substring(0, 5),
            }));
          }
        }
        this.loading = false;
      } catch (error) {
        this.$errorNotify(error);
        this.loading = false;
      }
    },
  },
  created() {
    this.getData();
    this.getUsers();
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
    userId(val) {
      if (val) {
        this.reservedHours = [];
        this.getReservedHours();
      }
    },
    date(val) {
      if (val && this.userId) {
        this.reservedHours = [];
        this.getReservedHours();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  flex-direction: row;
}
.row-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.col {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.el-row {
  height: 100%;
  .el-col {
    width: 95%;
    height: 98%;
    .profile {
      padding-top: 10px;
      height: 90%;
      width: 100%;
      .left {
        width: 70%;
        .el-container {
          background-color: #fff !important;
          height: 100% !important;
          min-height: 0%;
          .el-main {
            padding: 10px 25px;
            margin: 0px;
            .el-form {
              .el-form-item {
                width: 50%;
                margin-bottom: 12px !important;
                .el-form-item__content {
                  width: 90% !important;
                  .el-input {
                    width: 100% !important;
                    .el-input__inner {
                      font-weight: bold !important;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .right {
        height: 100%;
        width: 30%;
        background-color: #fff;
        overflow-y: auto;
      }
    }
  }
}
</style>
