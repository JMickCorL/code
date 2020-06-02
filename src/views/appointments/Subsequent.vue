<template>
  <el-row class="row-center">
    <el-col class="col">
      <Title2
        :title="title"
        :label="label"
        :btnText="btnText"
        v-on:beforeSubmit="beforeSubmit"/>
      <div class="profile row">
        <div class="left">
          <el-container>
            <el-main>
              <p style="color:#006EFF;font-weight:bold;font-size:15px!important;margin:0px;">
                DATOS GENERALES
              </p>
              <el-form
                :model="form"
                ref="refId"
                :rules="rules"
                @keyup.enter.native="beforeSubmit()"
                @submit.prevent>
                <div class="row">
                  <el-form-item prop="firstName" label="Nombres">
                    <el-input v-model="form.firstName" :disabled="true" />
                  </el-form-item>
                  <el-form-item
                    prop="lastName"
                    label="Apellidos"
                    style="padding-left:5%;padding-right:0%!important;">
                    <el-input v-model="form.lastName" :disabled="true" />
                  </el-form-item>
                </div>
                <div class="row">
                  <el-form-item
                    prop="birthdate"
                    label="Fecha de nacimiento (aaaa-mm-dd)">
                    <el-input v-model="form.birthdate" :disabled="true" />
                  </el-form-item>
                  <el-form-item
                    prop="curp"
                    style="padding-left:5%;padding-right:0%!important;"
                    label="CURP">
                    <el-input
                      v-model="form.curp"
                      @input="upper($event)"
                      :disabled="true" />
                  </el-form-item>
                </div>
                <div class="row">
                  <el-form-item prop="phone" label="Teléfono Fijo">
                    <el-input v-model="form.phone" :disabled="disabled"/>
                  </el-form-item>
                  <el-form-item
                    prop="cellPhone"
                    label="Teléfono Particular"
                    style="padding-left:5%;padding-right:0%!important;">
                    <el-input v-model="form.cellPhone" :disabled="disabled"/>
                  </el-form-item>
                </div>
                <div class="row">
                  <el-form-item prop="extraPhone" label="Teléfono Extra">
                    <el-input v-model="form.extraPhone" disabled="disabled" />
                  </el-form-item>
                </div>
                <div class="row">
                  <div
                    class="el-form-item is-required"
                    style="padding-right:0%!important;"
                  >
                    <label class="el-form-item__label" style="width: 100%;text-align:left">
                      Área
                    </label>
                    <div class="el-form-item__content">
                      <el-select
                        v-model="selectedRole"
                        :default-first-option="true"
                      >
                        <el-option
                          v-for="role in roles"
                          :key="role.id"
                          :label="role.name"
                          :value="role.id"
                        />
                      </el-select>
                    </div>
                  </div>
                  <el-form-item
                    prop="userId"
                    label="Especialista"
                    style="padding-left:5%;padding-right:0%!important;"
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
                  prop="newSocialDate"
                  label="¿Desea agendar cita con Trabajo Social?"
                  style="width: 40%!important;">
                  <el-select v-model="socialSchedule">
                    <el-option
                      v-for="item in newSocialDate"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="Comentarios adicionales del paciente"
                  prop="comments"
                  style="width:100%;">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 4, maxRows: 4}"
                      v-model="form.comments"
                      style="width: 100%!important;"/>
                </el-form-item>
                <el-form-item style="width: 100%!important;margin-bottom: 0px!important">
                  <el-button
                    type="primary"
                    @click="beforeSubmit"
                    style="background-color: #6993FF;color:#fff;float:right;">
                    {{btnText}}
                  </el-button>
                </el-form-item>
              </el-form>
            </el-main>
          </el-container>
        </div>
        <div :class="right">
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
import Title2 from '../../components/Title2';
import Calendar from '../../components/Calendar';

export default {
  data() {
    return {
      // languages: lang,
      roles: [{ id: 'MD', name: 'MÉDICO' }],
      users: [],
      reservedHours: [],
      selectedRole: 'MD',
      right: 'right',
      btnText: 'AGENDAR',
      title: 'CITA SUBSECUENTE',
      label: 'Por favor llene los datos para agendar una cita nueva',
      hideButton: false,
      disabled: true,
      language: 'es',
      date: null,
      hour: null,
      loading: false,
      loadingService: null,
      initialForm: {},
      form: {
        userId: null,
        firstName: '',
        lsatName: '',
        birthdate: '',
        curp: '',
        phone: '',
        extraPhone: '',
        cellPhone: '',
        comments: '',
      },
      socialSchedule: false,
      newSocialDate: [
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
        firstName: [
          {
            required: true,
            message: 'El campo es requerido',
            trigger: 'blur',
          },
        ],
        lastName: [
          {
            required: true,
            message: 'El campo es requerido',
            trigger: 'blur',
          },
        ],
        birthdate: [
          {
            required: true,
            message: 'El campo es requerido',
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
    // Datepicker,
  },
  computed: {
    userId() {
      return this.form.userId;
    },
  },
  methods: {
    selectedHour(value) {
      this.hour = value;
    },
    selectedDate(value) {
      this.date = value;
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
    async submit() {
      try {
        this.loading = true;
        // Get form vars
        const {
          comments,
          userId,
        } = this.form;
        const { id: patientId } = this.$route.params;
        const type = 'CITA SUBSECUENTE';
        const response = await this.axios.post(`patient/appointment/md/${patientId}`, {
          type,
          location: null,
          date: this.date,
          time: this.hour,
          userId,
          comments,
        });
        if (response) {
          const message = 'Se agendó cita subsecuente';
          await this.axios.post(`patient/changelog/${patientId}`, {
            title: 'Agenda',
            message,
          });
          this.$notify({
            type: 'success',
            message,
          });
          this.loading = false;
          let path = '/';
          if (this.socialSchedule && patientId) {
            path = `/admin/appointments/social/${patientId}`;
          }
          setTimeout(() => {
            this.$router.replace({ path });
          });
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$errorNotify(error);
      }
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
    async getUsers() {
      try {
        this.loading = true;
        const response = await this.axios.get(`patient/appointment/users/${this.selectedRole}`);
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
        if (this.date && this.selectedRole) {
          let url = '';
          switch (this.selectedRole) {
            case 'MD':
              url = 'md';
              break;
            case 'OPTO':
              url = 'opto';
              break;
            case 'TS':
              url = 'social';
              break;
            default:
              return;
          }
          const response = await this.axios(`patient/appointment/${url}/reserved-schedules/${this.form.userId}?date=${this.date}`);
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
  },
  created() {
    this.getData();
    if (this.selectedRole) {
      this.getUsers();
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
    selectedRole(val) {
      if (val) {
        this.form.userId = null;
        this.reservedHours = [];
        this.getUsers();
      }
    },
    userId(val) {
      if (val) {
        this.reservedHours = [];
        this.getReservedHours();
      }
    },
    date(val) {
      if (val) {
        this.reservedHours = [];
        this.getReservedHours();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
div.disabled
{
  pointer-events: none;
  user-select: none;
  opacity: 0.75;
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
    width:95%;
    height: 98%;
    .profile {
      padding-top: 10px;
      height: 90%;
      width: 100%;
      .left {
        width: 70%;
        .el-container {
          background-color: #FFF!important;
          height: 100%!important;
          min-height: 0%;
          .el-main {
            padding: 10px 25px;
            margin: 0px;
            .el-form {
              .el-form-item {
                width: 50%;
                margin-bottom: 12px!important;
                .el-form-item__content {
                  width: 90%!important;
                  .el-input {
                    width: 100%!important;
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
