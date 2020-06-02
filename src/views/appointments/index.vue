<template>
  <div class="cont" id="appointments">
    <el-row>
      <el-col class="workingArea">
        <div
          class="card"
          id="card"
          ref="card"
          style="overflow: hidden !important;padding-bottom:20px"
        >
          <div class="title">
            <span>AGENDA DE TRABAJO </span>
            <el-divider direction="vertical"/>
            <span style="font-weight: 400!important;"> {{ selectedDateStr }}</span>
            <el-checkbox
              v-model="showMDAppointments"
              v-if="setPermission(['TS'])"
              style="margin: 0px 10px"
            >
              {{ showMDAppointments ? '' : 'Mostrar agenda médica' }}
            </el-checkbox>
            <el-dropdown
              v-if="
                setPermission(['FD', 'ADMIN', 'OPTO'])
                || (showMDAppointments && setPermission(['TS']))
              "
              trigger="click"
              @command="handleCommand"
            >
              <el-button type="primary">
                {{ filterText }}
                <i class="el-icon-arrow-down el-icon--right"/>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="'ALL'">
                  Mostrar todo
                </el-dropdown-item>
                <el-dropdown-item
                  v-for="user in users"
                  :key="user.id"
                  :command="user.id"
                >
                  {{`${user.firstName} ${user.lastName}`}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="schedule">
            <div class="header">
              <div class="time">
                <i class="el-icon-time" />
              </div>
              <div class="info">
                <i class="el-icon-user" />
              </div>
              <div class="status">
                <i class="el-icon-user" />
              </div>
              <div class="comments">
                <i class="el-icon-document" />
              </div>
            </div>
            <div
              class="appointmentsContainer infinite-list"
              v-infinite-scroll="load"
              v-loading="loadingTable"
              :infinite-scroll-disabled="infiniteScrollDisabled"
              :infinite-scroll-distance="2"
            >
              <div
                v-for="(appointment, idx) in appointmentsShowing"
                :class="getClass(appointment.id)"
                :key="idx"
                :ref="ref"
              >
                <div class="content">
                  <div class="time">
                    <p>{{ formatHour(appointment.time) }}</p>
                    <div class="actions">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="Realizar evaluación"
                        placement="top"
                        v-if="blockPermission(['FD', 'ADMIN'])
                        && specialPermission(appointment)"
                      >
                        <i
                          class="el-icon-edit"
                          @click="redirectToAction(idx)"
                        />
                      </el-tooltip>
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="Cancelar cita"
                        placement="top"
                        v-if="blockPermission(['ADMIN', 'OPTO'])"
                      >
                        <i
                          class="el-icon-delete"
                          @click="handleCancel(idx)"
                        />
                      </el-tooltip>
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="Terminar cita"
                        placement="top"
                        v-if="blockPermission(['FD', 'ADMIN', 'OPTO'])
                        && specialPermission(appointment)"
                      >
                        <i
                          class="el-icon-document-checked"
                          @click="check(idx)"
                        />
                      </el-tooltip>
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="Re-agendar cita"
                        placement="top"
                        v-if="blockPermission(['OPTO'])"
                      >
                        <i
                          class="el-icon-date"
                          @click="openDateDialog(idx)"
                        />
                      </el-tooltip>
                    </div>
                  </div>
                  <div class="info">
                    <p class="name">
                      {{ appointment.user.firstName }} {{ appointment.user.lastName }}
                    </p>
                    <p class="role">{{ appointment.user.role.name }}</p>
                    <p
                      class="patient"
                      style=""
                    >
                      PACIENTE:
                      <router-link
                        :to="`/admin/patient/full-profile/${appointment.patientId}`"
                        tag="a"
                        class="name"
                        style="color: #2A97FF;font-weight:bold"
                      >
                        {{ appointment.patientInfo.firstName }}
                        {{ appointment.patientInfo.lastName }}
                        -
                        ({{ appointment.patientId }})
                      </router-link>
                    </p>
                    <p class="type">
                      {{ appointment.type }}
                    </p>
                  </div>
                  <div class="status">
                    <el-select
                      v-model="appointment.patientInfo.statusId"
                      placeholder="Estado"
                      @change="(e) => onStatusChange(e, appointment.patientId, idx)"
                      empty="Sin Espeficar"
                    >
                      <el-option
                        v-for="(option, optIdx) in statusOptions"
                        :key="`${option}-${optIdx}`"
                        :label="option.status"
                        :value="option.id"
                      >
                        <span
                          style="
                            height: 100%;
                            width: 5px;
                            position: absolute;
                            left: 0px;
                          "
                          :style="{ 'background-color': option.colorCode }"
                        />
                        <span>{{ option.status }}</span>
                      </el-option>
                    </el-select>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="appointment.patientInfo.status.status"
                      placement="top"
                    >
                      <div
                        class="color-code-badge"
                        :style="{
                          'background-color': appointment
                            .patientInfo.status.colorCode || '#f0f0f0'
                        }"
                      />
                    </el-tooltip>
                  </div>
                  <div class="comments">
                    {{ appointment.comments }}
                  </div>
                </div>
                <el-divider v-if="idx !== appointments.length - 1" />
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col class="calendarArea">
        <div class="calendar">
          <div class="title">
            <p>
              SELECCIONE LA FECHA DESEADA
            </p>
          </div>
          <datepicker
            v-model="selectedDate"
            :language="languages[language]"
            :inline="true"
            :highlighted="highlighted"
            @changedMonth="changedMonth"
          />
          <div class="stadistics">
            <div class="section">
              <div class="info">
                <p class="label">Citas del día</p>
                <p class="number">{{ dailyAppointments.total || 0 }}</p>
                <p class="content">
                  {{ dailyAppointments.canceled || 0 }} cita(s) ha(n) sido cancelada(s)
                </p>
              </div>
              <div class="icon">
                <i class="el-icon-date"/>
              </div>
            </div>
            <div class="section">
              <div class="info">
                <p class="label">Pacientes nuevos del mes</p>
                <p class="number">{{ monthlyPatients.reduce((a, b) => a + b.total, 0) }}</p>
                <p class="content">
                  <span
                    v-for="(item, idx) in monthlyPatients"
                    :key="idx.toString()"
                  >
                    {{ `${item.total} ${item.gender}` }}
                    {{ `${(monthlyPatients.length > idx + 1 ? ',' : '.')}` }}
                  </span>
                </p>
              </div>
              <div class="icon">
                <i class="el-icon-folder-add"/>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="Confirmación de cancelación"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        @submit.prevent
      >
        <el-form-item label="Motivo" prop="reason">
          <el-input
            type="textarea"
            :rows="4"
            maxlength="255"
            v-model="form.reason"
          />
        </el-form-item>
        <el-form-item style="display: flex; flex-direction: row; justify-content: flex-end">
          <el-button
            type="danger"
            @click="beforeSubmit">
              Cancelar cita
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="Re-agendar cita"
      :visible.sync="dateDialog"
      width="30%"
      v-loading="dateDialogLoading"
    >
      <Calendar
        v-on:selectedHour="dateDialogOnSelectHour"
        v-on:selectedDate="dateDialogOnSelectDate"
        :selectedDateDefault="dateDialogDefault"
        :disableds="dateDialogReserved"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dateDialog = false">Cancelar</el-button>
        <el-button type="primary" @click="changeAppointmentDate">Reagendar</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Datepicker from 'vuejs-datepicker';
import * as lang from 'vuejs-datepicker/src/locale';
import Calendar from '../../components/Calendar';

const moment = require('moment');

export default {
  data() {
    return {
      form: {
        reason: null,
      },
      rules: {
        reason: [
          {
            required: true,
            message: 'Campo requerido',
          },
        ],
      },
      showMDAppointments: false,
      dateDialog: false,
      dateDialogDateSelected: '',
      dateDialogTimeSelected: '',
      dateDialogReserved: [],
      dateDialogDefault: '',
      dateDialogAppointmentIdx: null,
      dateDialogLoading: false,
      dialogVisible: false,
      currentSelectedUserId: null,
      filterText: 'Mostrar Todo',
      users: [],
      appointmentsShowing: [],
      languages: lang,
      language: 'es',
      selectedDate: null,
      selectedDateStr: null,
      dateAppointments: 15,
      canceled: 1,
      highlighted: {
        daysOfMonth: [],
      },
      pagination: -1,
      currentPage: 1,
      loadingTable: false,
      newPatientsOfMonth: 21,
      male: 9,
      female: 12,
      ref: 0,
      appointments: [],
      loading: false,
      loadingService: null,
      monthlyPatients: [],
      dailyAppointments: {},
      statusOptions: [],
    };
  },

  components: {
    Datepicker,
    Calendar,
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
    role() {
      return this.user.roleId;
    },
    infiniteScrollDisabled() {
      return this.page >= this.pagination || this.loadingTable;
    },
  },
  methods: {
    async onStatusChange(statusId, patientId, idx) {
      try {
        const statusObj = this.statusOptions.find((x) => x.id === statusId);
        if (statusObj) {
          const response = await this.axios.patch(`patient/status/${patientId}`, {
            statusId,
          });
          const { data } = response;
          await this.axios.post(`patient/changelog/${patientId}`, {
            title: 'Semáforo',
            message: `Se ha actualizado el estado del paciente a "${statusObj.status}"`,
          });
          this.$notify({
            type: 'success',
            message: data.message,
          });
          this.appointments[idx].patientInfo.status = statusObj;
        }
      } catch (error) {
        this.$errorNotify(error);
      }
    },
    specialPermission(appointment) {
      return this.showMDAppointments
      && ['FD', 'TS'].includes(appointment.user.roleId)
        ? this.setPermission(['FD', 'TS']) : !this.showMDAppointments;
    },
    openDateDialog(idx) {
      this.dateDialogAppointmentIdx = idx;
      const appointment = this.appointments[idx];
      this.dateDialogDefault = appointment.date;
      this.dateDialog = true;
    },
    dateDialogOnSelectHour(val) {
      if (val) {
        this.dateDialogTimeSelected = val;
      }
    },
    async dateDialogOnSelectDate(val) {
      try {
        this.dateDialogLoading = true;
        if (val && val !== this.dateDialogDateSelected) {
          this.dateDialogDateSelected = val;
          const idx = this.dateDialogAppointmentIdx;
          const appointment = this.appointments[idx];
          await this.getReservedHours(appointment.userId);
        }
      } catch {
        // code
      } finally {
        this.dateDialogLoading = false;
      }
    },
    async getReservedHours(idx) {
      try {
        this.dateDialogLoading = true;
        if (this.dateDialogDateSelected) {
          this.dateDialogReserved = [];
          const response = await this.axios(`patient/appointment/MD/reserved-schedules/${idx}?date=${this.dateDialogDateSelected}`);
          const { data } = response;
          if (Array.isArray(data) && data.length > 0) {
            this.dateDialogReserved = data;
          }
        }
        this.dateDialogLoading = false;
      } catch (error) {
        this.$errorNotify(error);
      } finally {
        this.dateDialogLoading = false;
      }
    },
    async changeAppointmentDate() {
      try {
        const {
          dateDialogDateSelected: date,
          dateDialogTimeSelected: time,
          dateDialogAppointmentIdx: idx,
        } = this;
        const appointment = this.appointments[idx];
        this.dateDialogLoading = true;
        if (date && time) {
          let url = 'md';
          if (appointment.user.roleId === 'TS') {
            url = 'social';
          }
          const response = await this.axios.patch(`patient/appointment/${url}/reschedule/${appointment.id}`, {
            date,
            time,
          });
          if (response) {
            const { data } = response;
            let message = 'Se reagendo cita';
            if (url === 'social') {
              message += ' de trabajo social';
            }
            await this.axios.post(`patient/changelog/${appointment.patientId}`, {
              title: 'Agenda',
              message,
            });
            this.$notify({
              type: 'success',
              message: data.message,
            });
          }
          if (appointment.date !== date) {
            this.appointments.splice(idx, 1);
          } else {
            this.appointments[idx].time = time;
          }
          this.dateDialogDateSelected = '';
          this.dateDialogTimeSelected = '';
          this.dateDialogReserved = [];
          this.dateDialogAppointmentIdx = null;
          this.dateDialogLoading = false;
          this.dateDialogDefault = '';
          this.dateDialog = false;
        } else {
          this.$message({
            type: 'error',
            message: 'Seleccione la fecha y hora correcta',
          });
        }
      } catch (error) {
        this.$errorNotify(error);
      } finally {
        this.dateDialogLoading = false;
      }
    },
    async handleCommand(command) {
      try {
        if (command === 'ALL') {
          this.appointmentsShowing = this.appointments;
          this.currentSelectedUserId = null;
          this.filterText = 'Mostrar Todo';
        } else {
          this.appointmentsShowing = this.appointments.filter((a) => a.userId === command);
          this.currentSelectedUserId = command;
          const [user] = this.users.filter((x) => x.id === command);
          this.filterText = `${user.firstName} ${user.lastName}`;
        }
      } catch (error) {
        // some code
      }
    },
    async getStatistics(date) {
      try {
        const response = await this.axios.get(`patient/statistical/registered/monthly?date=${date}`);
        if (response) {
          const { data } = response;
          this.monthlyPatients = [...data];
        }
        const response2 = await this.axios.get(`patient/statistical/appointments/daily?date=${date}`);
        if (response2) {
          const { data } = response2;
          this.dailyAppointments = { ...data };
        }
      } catch (error) {
        this.$errorNotify(error);
      }
    },
    setPermission(role) {
      if (Array.isArray(role)) {
        return role.includes(this.role);
      }
      return false;
    },
    blockPermission(role, force) {
      if (force) {
        return false;
      }
      if (Array.isArray(role)) {
        return !role.includes(this.role);
      }
      return false;
    },
    redirectToAction(index) {
      const { patientId } = this.appointmentsShowing[index];
      switch (this.user.role.id) {
        case 'OPTO':
          this.$router.push(`/admin/evaluations/opto/${patientId}`);
          break;
        case 'MD':
          this.$router.push(`/admin/evaluations/ofta/${patientId}`);
          break;
        case 'TS':
          this.$router.push(`/admin/evaluations/socialeva/${patientId}`);
          break;
        default:
          break;
      }
    },
    beforeSubmit() {
      this.$refs.form.validate(async (isValid) => {
        if (isValid) {
          await this.cancel(this.currentAppointmentId);
          this.dialogVisible = false;
          this.currentAppointmentId = null;
        }
      });
    },
    handleCancel(id) {
      this.dialogVisible = true;
      this.currentAppointmentId = id;
    },
    async cancel(idx) {
      try {
        this.loading = true;
        let url = '';
        switch (this.role) {
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
            switch (this.appointments[idx].user.roleId) {
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
                this.loading = false;
                return;
            }
        }
        const { patientId, id } = this.appointments[idx];
        const response = await this.axios.patch(`patient/appointment/${url}/cancel/${id}`, {
          cancelReason: this.form.reason,
        });
        if (response) {
          const message = `Se canceló cita (${this.appointments[idx].type}) - ${this.form.reason} -`;
          await this.axios.post(`patient/changelog/${patientId}`, {
            title: 'Agenda',
            message,
          });
          this.appointments[idx].canceled = true;
          this.ref++;
        }
        this.form.reason = null;
        this.loading = false;
      } catch (err) {
        this.$errorNotify(err);
      } finally {
        this.loading = false;
        this.form.reason = null;
      }
    },
    async check(idx) {
      try {
        this.loading = true;
        let url = '';
        switch (this.role) {
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
            this.loading = false;
            return;
        }
        const { id } = this.appointments[idx];
        const response = await this.axios.patch(`patient/appointment/${url}/check/${id}`);
        if (response) {
          this.appointments[idx].checked = true;
          this.ref++;
        }
        this.loading = false;
      } catch (err) {
        this.loading = false;
        this.$errorNotify(err);
      }
    },
    getClass(id) {
      const index = this.appointments.map((e) => e.id).indexOf(id);
      if (this.appointments[index].checked) {
        return 'appointment checked';
      }
      if (this.appointments[index].canceled) {
        return 'appointment canceled';
      }
      return 'appointment';
    },
    async getData(date, page) {
      try {
        this.loadingTable = true;
        let url = 'patient/appointment/';
        switch (this.role) {
          case 'MD':
            url += 'md';
            break;
          case 'OPTO':
            url += 'opto';
            break;
          case 'TS':
            url += this.showMDAppointments ? 'FD' : 'social';
            break;
          case 'ADMIN':
            url += 'admin';
            break;
          case 'FD':
            url += 'FD';
            break;
          default:
            this.loadingTable = false;
            return;
        }
        url = `${url}?date=${date}`;
        if (/[0-9]$/.test(page)) {
          url += `&page=${page}`;
        }
        const response = await this.axios(url);
        const { data } = response;
        if (data && Array.isArray(data.dataset)) {
          this.appointments = this.appointments.concat(data.dataset);
          if (this.currentSelectedUserId) {
            this.handleCommand(this.currentSelectedUserId);
          } else {
            this.appointmentsShowing = this.appointments;
          }
          this.pagination = data.pagination;
        }
        this.loadingTable = false;
      } catch (err) {
        this.$errorNotify(err);
        this.loadingTable = false;
      }
    },
    async load() {
      try {
        if (this.appointments.length) {
          this.page++;
          const date = moment(this.selectedDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
          await this.getData(date, this.page);
        }
      } catch (err) {
        this.$errorNotify(err);
      }
    },
    formatHour(hour) {
      const FORMAT_TIME_INPUT = 'HH:mm';
      const FORMAT_TIME_OUTPUT = 'hh:mm A';
      return moment(hour, FORMAT_TIME_INPUT).format(FORMAT_TIME_OUTPUT);
    },
    async hightlights(date) {
      try {
        this.highlighted.daysOfMonth = [];
        let path = '';
        switch (this.role) {
          case 'MD':
            path = '/md';
            break;
          case 'OPTO':
            path = '/opto';
            break;
          case 'TS':
            path = this.showMDAppointments ? '/fd' : '/social';
            break;
          case 'ADMIN':
            path = '/admin';
            break;
          case 'FD':
            path = '/fd';
            break;
          default:
            break;
        }
        const param = moment(date, 'YYYY-MM-DD').format('YYYY/MM');
        const response = await this.axios.get(`patient/appointment${path}/hightlight/${param}`);
        if (response.data) {
          this.highlighted.daysOfMonth = response.data;
        }
      } catch (error) {
        // some code
      }
    },
    async changedMonth(args) {
      const FORMAT = 'YYYY-MM-DD';
      let date = null;
      if (args.timestamp) {
        date = moment(new Date(args.timestamp)).format(FORMAT);
      } else {
        date = moment(args).format(FORMAT);
      }
      await this.hightlights(date);
    },
    async getStatuses() {
      try {
        this.loading = true;
        const response = await this.axios.get('patient/status/');
        const { data } = response;
        this.statusOptions = data;
      } catch (error) {
        this.$errorNotify(error);
      } finally {
        this.loading = false;
      }
    },
  },
  async created() {
    this.selectedDate = moment().format();
    await this.hightlights(this.selectedDate);
    await this.getStatuses();
    if (this.blockPermission(['TS', 'MD'])) {
      const response = await this.axios.get('patient/appointment/users/MD');
      this.users = response.data;
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
    selectedDate(val) {
      if (val) {
        const date = moment(val, 'YYYY-MM-DD').format('YYYY-MM-DD');
        this.selectedDateStr = date;
        this.appointments = [];
        this.page = 1;
        this.getData(date, this.page);
        this.getStatistics(date);
      }
    },
    async showMDAppointments(val) {
      if (val) {
        if (!this.users.length) {
          const response = await this.axios.get('patient/appointment/users/MD');
          this.users = response.data;
        }
      }
      const date = this.selectedDateStr;
      this.appointments = [];
      this.page = 1;
      this.getData(date, this.page);
      this.getStatistics(date);
    },
  },
};
</script>
<style lang="scss">
.el-dialog__body {
  padding: 5px 10px;
}
.el-dropdown + .el-dropdown {
  margin-left: 10px;
}
.el-divider--vertical {
  width: 2px;
  height: 1.2em;
}
.el-divider {
  background-color: #49749f;
}
.appointmentsContainer {
  .el-divider {
    background-color: #b6d3ef;
  }
  .el-divider--horizontal {
    width: 90%;
    margin: 0 0 0 5%;
  }
}
.vdp-datepicker__calendar .cell.selected {
  background: #49749f !important;
  color: #fff;
}
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled):hover {
  background: rgba(104, 85, 247, 0.25) !important;
  color: #fff;
  border: none;
}
.vdp-datepicker__calendar {
  -webkit-box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.19);
  -moz-box-shadow: 0px 0px 10px 2px rrgba(0, 0, 0, 0.19);
  box-shadow: 0px 0px 10px 2px rrgba(0, 0, 0, 0.19);
}
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover,
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover,
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover {
  border: none !important;
}
.vdp-datepicker__calendar .cell.blank:hover {
  background: #ffffff !important;
}
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day,
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover {
  border-radius: 50%;
}
.vdp-datepicker__calendar .cell.selected:hover {
  background: #006eff;
}
.vdp-datepicker__calendar .cell:hover {
  background: #006eff;
}
</style>
<style lang="scss" scoped>
.row {
  display: flex;
  flex-direction: row;
}
#appointments {
  height: 100%;
  .el-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    .workingArea {
      width: 70%;
      height: 100%;
      display: flex;
      padding: 10px;
      flex-direction: column;
      justify-content: center;
      .card {
        height: 95%;
        border-radius: 5px;
        background: #fff;
        padding: 0px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        .title {
          padding: 10px 25px;
          font-size: 20px;
          color: #557da6;
          font-weight: bold;
          align-self: flex-start;
        }
        .schedule {
          height: 95%;
          width: 95%;
          .header {
            background-color: #49749f;
            display: flex;
            flex-direction: row;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            height: 6%;
            i {
              font-size: 30px;
              color: #ffffff;
            }
            .time {
              width: 13%;
            }
            .status {
              width: 12%;
              margin: 0;
            }
            .info {
              width: 45%;
              margin: 0;
            }
            .comments {
              width: 30%;
            }
            .time,
            .info,
            .status,
            .comments {
              text-align: center;
            }
          }
          .appointmentsContainer {
            background-color: #f8f8f8;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            overflow-x: scroll;
            max-height: 90%;
            .appointment {
              background-color: #ffffff;
              .content {
                display: flex;
                flex-direction: row;
                .time {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  width: 13%;
                  color: #2e2a60;
                  font-weight: 600;
                  .actions {
                    i {
                      cursor: pointer;
                      color: #bfbfbf;
                      margin: 0 3px;
                    }
                  }
                }
                .info {
                  width: 45%;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  .name {
                    color: #2e2a60;
                    font-size: 18px;
                    font-weight: 500;
                    letter-spacing: 0.42px;
                    margin: 10px 0 2px;
                  }
                  .role {
                    color: #828bc2;
                    font-weight: normal;
                    font-size: 12px;
                    letter-spacing: 0.28px;
                    margin: 0 0 2px;
                  }
                  .type {
                    color: #828bc2;
                    font-weight: normal;
                    font-size: 12px;
                    margin: -5px 0 10px 0 ;
                  }
                  .patient {
                    display: flex;
                    flex-direction: row;
                    color: #6a6a6a;
                    font-size: 12px;
                    line-height: 12px;
                    margin: 15px;
                    .name {
                      color: #6a6a6a;
                      font-size: 12px;
                      line-height: 12px;
                      margin: 0 0 0 2px;
                      border-bottom: 1px solid #FFF;
                      &:hover {
                        border-bottom: 1px solid #49749f;
                      }
                    }
                  }
                }
                .status {
                  width: 12%;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  position: relative;
                  .color-code-badge {
                    background-color: #f0f0f0;
                    width: 100%;
                    height: 10px;
                    position: absolute;
                    bottom: 0px;
                  }
                }
                .comments {
                  width: 30%;
                  text-align: center;
                  display: block;
                  padding: 10px 0 10px 0;
                }
                .time,
                .location {
                  text-align: center;
                }
              }
            }
            .canceled {
              .content {
                background: #fcb7b7;
                display: flex;
                flex-direction: row;
                .time {
                  width: 20%;
                  color: #2e2a60;
                  font-weight: 600;
                  .actions {
                    display: none;
                  }
                }
                .info {
                  width: 50%;
                  .role {
                    color: #ffffff;
                  }
                  .patient {
                    color: #ffffff;
                  }
                }
                .location {
                  width: 30%;
                }
              }
            }
            .checked {
              background-color: #f8f8f8;
              .actions {
                display: none;
              }
            }
          }
        }
      }
    }
    .calendarArea {
      padding: 10px;
      width: 30%;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      .calendar {
        height: 60%;
        .title {
          text-align: center;
          color: #2e2a60;
        }
        .stadistics {
          .section {
            width: 300px;
            margin: 10px 0;
            border-radius: 5px;
            background: linear-gradient(180deg, #49749f 15.62%, #193561 100%);
            padding: 10px;
            display: flex;
            flex-direction: row;
            .icon {
              i {
                color: #ffffff;
                font-size: 70px;
                float: right;
              }
            }
            .info {
              flex: 1;
              p {
                margin: 0;
              }
              .label {
                font-size: 16px;
                font-weight: 400;
                color: #ffffff;
              }
              .number {
                font-size: 25px;
                font-weight: bold;
                color: #ffffff;
              }
              .content {
                font-size: 12px;
                font-weight: 400;
                color: #ffffff;
              }
            }
          }
          .section:nth-child(2) {
            background: linear-gradient(180deg, #49749f 15.62%, #193561 100%);
          }
        }
      }
    }
  }
}
</style>
