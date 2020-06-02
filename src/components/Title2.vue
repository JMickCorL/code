<template>
  <div class="top">
    <div class="left-title col">
      <p class="title">
        {{title}}
      </p>
      <router-link
        v-if="patientName"
        :to="`/admin/patient/full-profile/${patientId}`"
        tag="a"
        class="patient-name"
      >
        {{ patientName }}
        -
        ({{ patientId }})
      </router-link>
      <P class="subtitle">
        {{label}}
      </P>
    </div>
    <div v-if="isFullProfile" class="right col" style="height:100%;max-width: 250px">
      <div class="row">
        <el-button
          type="primary"
          style="background-color: #e9e9e9;border: 0px;"
          @click="goBack()"
          :disabled="disabled"
        >
          VOLVER
        </el-button>
        <div class="img-cont">
          <div class="col">
            <img
              style="cursor: pointer"
              @click="$emit('showHistory')"
              draggable="false"
              src="@/assets/icon-history.png"
            >
          </div>
        </div>
        <div class="img-cont">
          <div class="col">
            <img
              draggable="false"
              src="@/assets/icon-print.png"
              @click="$emit('print')"
              style="cursor: pointer"
            >
          </div>
        </div>
      </div>
    </div>
    <div v-else class="right col" style="height:100%;max-width: 250px">
      <div class="row">
        <el-button
          type="primary"
          style="background-color: #6993FF;color:#fff;"
          :disabled="disabled"
          v-on:click="$emit('beforeSubmit')">
          {{btnText}}
        </el-button>
        <el-button
          type="primary"
          style="background-color: #e9e9e9;border: 0px;"
          :disabled="disabled"
          @click="goBack()"
        >
          VOLVER
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Title2',
  props: {
    isFullProfile: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
    label: {
      type: String,
    },
    btnText: {
      type: String,
      default: 'AGENDAR',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      patientName: '',
    };
  },
  computed: {
    patientId() {
      return this.$route.params.id;
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getPatientName() {
      if (this.patientId) {
        this.axios.get(`patient/info/${this.patientId}`).then((response) => {
          const { data } = response;
          if (data) {
            this.patientName = `${data.firstName} ${data.lastName}`;
          }
        });
      }
    },
  },
  created() {
    this.getPatientName();
  },
  watch: {
    patientId(val) {
      if (val) {
        this.getPatientName();
      }
    },
  },
};
</script>

<style lang="scss">
.top {
  z-index: 10;
  background-color: #fff!important;
  min-height: 60px;
  height: auto;
  padding: 0px 20px;
  .row {
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
  .left-title {
    background-color: #fff!important;
    float: left;
    height: 100%;
    .title {
      color: #006EFF;
      font-weight: bold;
      font-size: 15px!important;
      margin: 0px;
    }
    .patient-name {
      margin: 0px;
      font-weight: bold;
      color: #18CD3B;
    }
    .subtitle {
      color: #646D82;
      font-weight: normal;
      font-size: 12px;
      margin: 0px;
    }
  }
  .right {
    float: right;
    .el-button {
      color: #787878;
      height: 30px;
      padding: 5px 10px;
    }
    img {
      width: 40px;
    }
  }
}
</style>
