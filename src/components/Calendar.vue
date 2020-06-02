<template>
  <div class="calendar-wrapper">
    <div class="calendar">
      <div class="title">
        <p>
          SELECCIONE LA FECHA DE LA CITA
        </p>
      </div>
      <div class="calendar__component">
        <datepicker
          v-model="selectedDate"
          :language="languages[language]"
          :inline="true"
          :disabled-dates="disabledDates"
        />
      </div>
    </div>
    <div class="schedule__component">
      <div class="schedule__component-inner">
        <div class="title">
          <p>
            HORARIOS DISPONIBLES
          </p>
        </div>
        <div class="options">
          <div
            class="options__row"
            v-for="a in 13"
            :key="`opt-0-${a.toString()}`"
          >
            <el-button
              class="option"
              v-for="e in 6"
              :key="a.toString()+e.toString()"
              :ref="a.toString()+e.toString()"
              type="primary"
              @click="btnClick(a.toString()+e.toString())"
              round
              style="margin-bottom: 2px;"
            >
              {{ 10 > (a+6) ? `0${a+6}` : a+6 }}:{{ (-10+(10*e)) === 0 ? '00' : -10+(10*e) }}
            </el-button>
          </div>
          <div
            class="options__row"
            v-for="a in 1"
            :key="`opt-1-${a.toString()}`"
          >
            <el-button
              class="option"
              :key="'141'"
              :ref="'141'"
              type="primary"
              @click="btnClick('141')"
              round
              style="margin-bottom: 2px;"
            >
              20:00
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import * as lang from 'vuejs-datepicker/src/locale';

const moment = require('moment');

export default {
  name: 'Calendar',
  props: {
    disableds: {
      type: Array,
      default() { return []; },
    },
    selectedDateDefault: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      languages: lang,
      language: 'es',
      selectedDate: '',
      selectedHour: '',
      lastSelectedHour: null,
      disabledDates: {
        // to: new Date(moment().subtract(1, 'days').format()),
      },
    };
  },
  components: {
    Datepicker,
  },
  methods: {
    btnClick(value) {
      const hour = this.$refs[value][0].$el.innerText;
      this.selectedHour = hour;
      this.clearSelection();
      this.$refs[value][0].$el.style.backgroundColor = '#006EFF';
      this.$refs[value][0].$el.style.color = '#fff';
      // eslint-disable-next-line
      this.lastSelectedHour = this.$refs[value][0];
      this.$emit('selectedHour', hour);
    },
    clearSelection() {
      if (this.lastSelectedHour && this.lastSelectedHour !== this.selectedHour) {
        this.lastSelectedHour.$el.style.backgroundColor = '#F8F9F9';
        this.lastSelectedHour.$el.style.color = '#000';
      }
    },
    resetBtns() {
      // eslint-disable-next-line
      for (const ref in this.$refs) {
        this.$refs[ref][0].$el.disabled = false;
        this.$refs[ref][0].$el.style.backgroundColor = '#F8F9F9';
        this.$refs[ref][0].$el.style.cursor = 'pointer';
        this.$refs[ref][0].$el.style.color = '#000';
      }
    },
    dateChanged() {
      this.resetBtns();
      // eslint-disable-next-line
      const now = moment();

      const date = moment(this.selectedDate).format('YYYY-MM-DD');
      // eslint-disable-next-line
      for (const ref in this.$refs) {
        // eslint-disable-next-line
        const plainTime = this.$refs[ref][0].$el.innerText;
        // const [hourPlain, minutesPlain] = plainTime.split(':');
        for (let i = 0; i < this.disableds.length; i++) {
          const { time } = this.disableds[i];
          if (plainTime === time) {
            this.$refs[ref][0].$el.disabled = true;
            this.$refs[ref][0].$el.style.backgroundColor = 'salmon';
            this.$refs[ref][0].$el.style.cursor = 'default';
          }
        }
        // const bDate = moment(`${date} ${hourPlain}:${minutesPlain}:00`, 'YYYY-MM-DD HH:mm:ss');
        // const diff = bDate.diff(now, 'minutes');
        // if (diff <= 0) {
        //   this.$refs[ref][0].$el.disabled = true;
        //   this.$refs[ref][0].$el.style.backgroundColor = 'cyan';
        //   this.$refs[ref][0].$el.style.cursor = 'default';
        // }
      }
      this.$emit('selectedDate', date);
      this.$emit('selectedHour', null);
    },
  },
  created() {
    if (this.selectedDateDefault) {
      this.selectedDate = moment(this.selectedDateDefault).valueOf();
    } else {
      this.selectedDate = Date.now();
    }
    this.$message({
      message: 'Se ha desbloqueado temporalmente el calendario. Por favor, ingrese los datos con precaución.',
      duration: 10000,
      type: 'warning',
      offset: 50,
      showClose: true,
    });
  },
  watch: {
    selectedDate() {
      this.dateChanged();
    },
    disableds(val) {
      if (val) {
        this.dateChanged();
      }
    },
    selectedDateDefault(val) {
      if (val) {
        this.selectedDate = moment(val).valueOf();
      }
    },
  },
};
</script>
<style lang="scss">
.calendar-wrapper {
  position: relative;
  width: 100%;
  max-width: 320px;
  min-width: 220px;
  margin-left: 50%;
  transform: translateX(-50%);
  height: auto;
  padding-bottom: 10px;
  overflow-y: auto !important;
  .calendar {
    width: 100%;
    height: auto;
    text-align: center;
    .title {
      p {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 7px;
      }
    }
    .calendar__component {
      display: flex;
      justify-content: center;
      width:100%;
      .vdp-datepicker {
        .vdp-datepicker__calendar {
          width: 90%;
          height: 100%;
          margin: 0px 5%;
          -webkit-box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.19);
          -moz-box-shadow: 0px 0px 10px 2px rrgba(0,0,0,0.19);
          box-shadow: 0px 0px 10px 2px rrgba(0,0,0,0.19);
          .cell {
            height: 30px!important;
            line-height: 25px!important;
            cursor: pointer;
            &.disabled {
              cursor: default !important;
            }
            &:not(.blank):not(.disabled).month:hover,
            &:not(.blank):not(.disabled).year:hover {
              border: 1px solid #006EFF !important;
            }
            &.selected {
              background: #006EFF;
              color: #FFF;
            }
            &:not(.disabled):hover {
              color: #FFF;
              background: #006EFF !important;
            }
          }
        }
      }
    }
  }
  .schedule__component {
    width: 100%;
    min-width: 280px !important;
    margin-top: 10px;
    height: auto;
    text-align: center;
    display: flex;
    justify-content: center;
    .schedule__component-inner {
      width: 90%;
      height: inherit;
      background-color: #FFFFFF;
      -webkit-box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.19);
      -moz-box-shadow: 0px 0px 10px 2px rrgba(0,0,0,0.19);
      box-shadow: 0px 0px 10px 2px rrgba(0,0,0,0.19);
      .title {
        p {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 5px;
        }
      }
      .options {
        margin-left: 5%;
        margin-bottom: 10px;
        width: 90%;
        height: inherit;
        .options__row {
          display: flex;
          overflow: hidden;
          justify-content: space-evenly;
          height: 20px;
          width: 100%;
          .option {
            border: none;
            margin: 0px;
            padding: 0px;
            overflow: hidden;
            height: 90%;
            width: calc(25% - 2px);
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
