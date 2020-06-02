<template>
  <el-row class="row-center">
    <el-col class="col">
      <Title2
        :title="'ALTA DE PACIENTE'"
        :label="'Por favor ingrese los datos para agendar una cita nueva'"
        :btnText="'DAR DE ALTA'"
        v-on:beforeSubmit="beforeSubmit"
      />
      <div class="profile row">
        <div class="left">
          <el-container>
            <el-main>
              <p
                style="
                  color: #006EFF;
                  font-weight: bold;
                  font-size: 15px !important;
                  margin:0px;
                "
              >
                DATOS GENERALES
              </p>
              <el-form
                :model="form"
                ref="refId"
                :rules="rules"
                @keyup.enter.native="beforeSubmit()"
                @submit.prevent
              >
                <div class="row">
                  <el-form-item prop="firstName" label="Nombres">
                    <el-input
                      v-model="form.firstName"
                      @input="(val) => form.firstName = $capitalize(val)"
                      maxlength="60"
                    />
                  </el-form-item>
                  <el-form-item
                    prop="lastName"
                    label="Apellidos"
                    style="padding-left:5%;padding-right:0%!important;"
                  >
                    <el-input
                      v-model="form.lastName"
                      @input="(val) => form.lastName = $capitalize(val)"
                      maxlength="60"
                    />
                  </el-form-item>
                </div>
                <div class="row">
                  <el-form-item prop="birthdate" label="Fecha de nacimiento (aaaa/mm/dd)">
                    <el-date-picker
                      v-model="form.birthdate"
                      type="date"
                      :editable="false"
                      :picker-options="{
                        disabledDate(time) {
                          return time.getTime() > Date.now();
                        },
                      }"
                      placeholder="Seleccione una fecha"
                    />
                  </el-form-item>
                  <el-form-item
                    prop="curp"
                    style="padding-left:5%;padding-right:0%!important;"
                    label="CURP"
                  >
                    <el-input
                      v-model="form.curp"
                      @input="upper($event)"
                      maxlength="18"
                    />
                  </el-form-item>
                </div>
                <div class="row">
                  <el-form-item prop="phone" label="Teléfono Fijo">
                    <el-input
                      v-model="form.phone"
                      v-mask="'(999) 999-9999'"
                      placeholder="(___) ___-____"
                    />
                  </el-form-item>
                  <el-form-item
                    prop="cellPhone"
                    label="Teléfono Particular"
                    style="padding-left:5%;padding-right:0%!important;"
                  >
                    <el-input
                      v-model="form.cellPhone"
                      v-mask="'(999) 999-9999'"
                      placeholder="(___) ___-____"
                    />
                  </el-form-item>
                </div>
                <div class="row">
                  <el-form-item prop="extraPhone" label="Teléfono Extra">
                    <el-input
                      v-model="form.extraPhone"
                      v-mask="'(999) 999-9999'"
                      placeholder="(___) ___-____"
                    />
                  </el-form-item>
                </div>
                <div class="row">
                  <el-form-item
                    prop="userId"
                    label="Seleccione especialista"
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
                  prop="schedule"
                  label="¿Desea agendar cita con Trabajo Social?"
                  style="width: 50%!important;"
                >
                  <el-select v-model="socialSchedule">
                    <el-option
                      v-for="item in schedule"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="Comentarios adicionales del paciente"
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
                <div class="row">
                  <el-form-item
                    style="width: 100%!important;margin-bottom: 0px!important;margin-right:10px"
                  >
                    <el-button
                      type="primary"
                      @click="beforeSubmit(false)"
                      style="background-color: #FFFFFF;color:#2159FF;float:right;"
                    >DAR DE ALTA</el-button>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0px!important">
                    <el-button
                      type="primary"
                      @click="beforeSubmit(true)"
                      style="background-color: #6993FF;color:#fff;float:right;"
                    >DAR DE ALTA Y REGISTRAR CITA</el-button>
                  </el-form-item>
                </div>
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
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex';
import Title2 from '../../components/Title2';
import Calendar from '../../components/Calendar';
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
      phoneDisabled: true,
      celDisabled: true,
      emailDisabled: true,
      disabled: true,
      // languages: lang,
      language: 'es',
      date: null,
      hour: null,
      form: {
        firstName: '',
        lastName: '',
        birthdate: '',
        curp: '',
        phone: '',
        extraPhone: '',
        cellPhone: '',
        comments: '',
        userId: null,
      },
      loading: false,
      loadingService: null,
      socialSchedule: false,
      schedule: [
        {
          value: true,
          label: 'SI',
        },
        {
          value: false,
          label: 'NO',
        },
      ],
      rules: {
        firstName: [
          {
            required: true,
            message: 'El campo es requerido',
          },
        ],
        lastName: [
          {
            required: true,
            message: 'El campo es requerido',
          },
        ],
        birthdate: [
          {
            required: true,
            message: 'El campo es requerido',
            trigger: 'blur',
          },
        ],
        phone: [
          {
            validator: isValidPhone,
            trigger: 'blur',
          },
        ],
        extraPhone: [
          {
            validator: isValidPhone,
            trigger: 'blur',
          },
        ],
        cellPhone: [
          {
            validator: isValidPhone,
            trigger: 'blur',
          },
        ],
        comments: [
          {
            required: false,
            message: 'El campo no puede estar vacío.',
          },
        ],
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
      },
      departments: [],
      users: [],
      reservedHours: [],
    };
  },
  components: {
    Title2,
    Calendar,
  },
  computed: {
    ...mapState({
      role: (state) => state.auth.user.user.role,
      token: (state) => state.auth.token,
    }),
    userId() {
      return this.form.userId;
    },
  },
  methods: {
    upper(e) {
      this.form.curp = e.toUpperCase();
    },
    dateFormat(e) {
      if (this.form.birthdate.length === 4 || this.form.birthdate.length === 7) {
        this.form.birthdate = `${e.toUpperCase()}/`;
      }
    },
    selectedHour(value) {
      this.hour = value;
    },
    selectedDate(value) {
      this.date = value;
    },
    beforeSubmit(shouldCreateAppointment) {
      this.rules.userId[0].required = !!shouldCreateAppointment;
      this.$refs.refId.validate((isValid) => {
        if ((isValid && this.hour && this.date) || (isValid && !shouldCreateAppointment)) {
          this.submitPatient(shouldCreateAppointment);
        } else if (shouldCreateAppointment) {
          this.$message({
            type: 'error',
            message: 'Seleccione la fecha y hora correcta',
          });
        }
      });
    },
    submitWithDate() {
      const model = this.form;
      model.appointment = {
        date: this.date,
        hour: this.hour,
      };
      if (this.form.socialSchedule) {
        const id = this.form.curp;
        this.$router.push({ path: `admin/appointments/social/${id}` });
      }
    },
    async getReservedHours() {
      try {
        this.loading = true;
        if (this.date) {
          const response = await this.axios(`patient/appointment/MD/reserved-schedules/${this.form.userId}?date=${this.date}`);
          const { data } = response;
          if (Array.isArray(data) && data.length > 0) {
            this.reservedHours = data;
          }
        }
        this.loading = false;
      } catch (error) {
        this.$errorNotify(error);
        this.loading = false;
      }
    },
    async getUsers() {
      try {
        this.loading = true;
        const response = await this.axios.get('patient/appointment/users/MD');
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
    async submitPatient(shouldCreateAppointment) {
      try {
        // Initialize loading service
        this.loading = true;

        // Get form vars
        const {
          curp,
          firstName,
          lastName,
          birthdate,
          phone,
          extraPhone,
          cellPhone,
          comments,
        } = this.form;

        // Register a new patient
        const response = await this.axios.post('patient', {
          curp,
          firstName,
          lastName,
          phone,
          extraPhone,
          cellPhone,
          birthdate,
        });
        const { data } = response;
        if (data) {
          const { patient: patientId } = data;
          let message = 'El paciente ha sido registrado';
          await this.axios.post(`patient/changelog/${patientId}`, {
            title: 'Agenda',
            message,
          });
          if (shouldCreateAppointment) {
            message = 'Se agendó la primera cita del paciente';
            const type = 'PRIMERA CITA';
            const appointmentResponse = await this.axios.post(`patient/appointment/md/${patientId}`, {
              type,
              location: null,
              date: this.date,
              time: this.hour,
              userId: this.userId,
              comments,
            });
            if (appointmentResponse) {
              await this.axios.post(`patient/changelog/${patientId}`, {
                title: 'Agenda',
                message,
              });
            }
          }
          this.$notify({
            type: 'success',
            message,
          });
          let path = '/';
          if (this.socialSchedule && data) {
            path = `/admin/appointments/social/${data.patient}`;
          }
          setTimeout(() => {
            this.$router.replace({ path });
          });
        }
        this.loading = false;
      } catch (error) {
        this.$errorNotify(error);
        this.loading = false;
      }
    },
  },
  created() {
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
<style lang="scss">
.el-form-item__label {
  font-weight: bold;
  color: #000;
  float: left;
}
</style>

<style lang="scss" scoped>
.row {
  display: flex;
  flex-direction: row;
}
.middle {
  height: 60%;
  width: 2px;
  color: #2242cb;
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
                margin-bottom: 18px !important;
                .el-form-item__content {
                  width: 90% !important;
                  .el-input {
                    width: 100% !important;
                  }
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
          background: #c2bebf;
          border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #b2aeaa;
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
