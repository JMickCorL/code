<template>
  <div class="cont">
    <el-row>
      <el-col
        :xs="22"
        :sm="22"
        :md="22"
        :lg="20"
        :xl="18"
      >
        <div class="search-container">
          <el-input
            ref="searchInput"
            v-model="search"
            :placeholder="ph"
            :suffix-icon="loadingSearch ? 'el-icon-loading' : 'el-icon-search'"
            clearable
            :disabled="loadingSearch"
            @keydown.enter.native="searchHandler"
          />
          <el-dropdown @command="handleCommand">
            <el-button type="primary">
              {{ btnText }}
              <i class="el-icon-arrow-down el-icon--right"/>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="filter in filters"
                :command="filter.name"
                :key="`filter-${filter.name}`"
              >
                {{ filter.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="card" id="card" ref="card">
          <div class="title">
            <span>PACIENTES REGISTRADOS</span>
          </div>
          <el-table
            :data="tableData"
            highlight-current-row
            empty-text="No hay datos"
            :height="tableHeight"
            @row-click="handleClick"
            :row-class-name="rowFormatter"
            v-loading="loading"
          >
            <el-table-column width="100" prop="id" label="EXPEDIENTE"/>
            <el-table-column width="300" prop="fullName" label="NOMBRE"/>
            <el-table-column
              min-width="120"
              prop="appointment_date"
              align="center"
              label="PRÓXIMA CITA"
              label-class-name="normal"
              class-name="bold"
            />
            <el-table-column
              min-width="100"
              prop="phone"
              align="center"
              label="TELÉFONO"/>
            <el-table-column
              min-width="100"
              prop="cellPhone"
              align="center"
              label="CELULAR"/>
            <el-table-column
              min-width="100"
              prop="gender"
              align="center"
              label="GÉNERO"
            />
            <el-table-column
              min-width="150"
              prop="birthdate"
              align="center"
              label="FECHA DE NACIMIENTO"
            />
            <el-table-column
              min-width="180"
              prop="curp"
              align="center"
              label="CURP"
            />
          </el-table>
          <el-pagination
            background
            :hide-on-single-page="true"
            layout="prev, pager, next"
            :current-page="currentPage"
            @current-change="onPageChange"
            :page-count="pagination"/>
        </div>
        <el-dialog
          id="main-popup"
          :visible.sync="dialogVisible"
          width="80%"
          :close-on-press-escape="false"
          :before-close="handleClose"
        >
          <el-tabs
            type="border-card"
          >
            <el-tab-pane>
              <el-tooltip
                slot="label"
                content="Perfil general"
                placement="top-start"
                effect="light"
              >
                <img class="icon-img" draggable="false" src="@/assets/general.png" >
              </el-tooltip>
              <div class="row">
                <LeftContainer :isProfile="true" :currentRow="currentRow" />
                <div v-if="!showHistory" class="right-container">
                  <Title
                    v-on:closeDialog="closeDialog"
                    :text="'PERFIL GENERAL'"
                    :isGeneral="true"
                    :patientId="currentRow.id"
                  />
                  <div
                    v-if="haveGeneralProfile"
                    class="right-content general"
                    style="padding-left:0 25px 0 25px;"
                  >
                    <div>
                      <p class="title">ESTADO CIVIL</p>
                      <p class="content">{{currentRow.maritalStatus || 'Sin registrar' }}</p>
                    </div>
                    <div>
                      <p class="title">FECHA DE NACIMIENTO</p>
                      <p class="content">
                        {{currentRow.birthdate || 'Sin registrar' }}
                        ({{ $ageAsWords(currentRow.birthdate) }})
                      </p>
                    </div>
                    <div>
                      <p class="title">RANGO DE EDAD</p>
                      <p class="content">{{currentRow.ageRange || 'Sin registrar' }}</p>
                    </div>
                    <div>
                      <p class="title">LUGAR DE NACIMIENTO</p>
                      <p class="content">{{currentRow.birthplace || 'Sin registrar' }}</p>
                    </div>
                    <div>
                      <p class="title">PARTICIPA COMO</p>
                      <p class="content">{{currentRow.participateAs || 'Sin registrar' }}</p>
                    </div>
                    <div>
                      <p class="title">DERECHOHABIENCIA</p>
                      <p class="content">{{currentRow.affiliation || 'N/A'}}</p>
                    </div>
                    <div>
                      <p class="title">ETNIA</p>
                      <p class="content">{{currentRow.ethnic || 'N/A'}}</p>
                    </div>
                    <div>
                      <p class="title">OCUPACIÓN</p>
                      <p class="content">{{currentRow.occupation || 'Sin registrar' }}</p>
                    </div>
                    <div>
                      <p class="title">REFERENCIA</p>
                      <p class="content">{{currentRow.reference || 'Sin registrar' }}</p>
                    </div>
                    <div class="history">
                      <p>VER HISTORIAL</p>
                      <div class="img-cont">
                        <img
                          draggable="false"
                          @click="showHistory = true"
                          src="@/assets/icon-history.png"
                        >
                      </div>
                    </div>
                  </div>
                  <div v-else class="no-data">
                    <h2>El perfil general aun no ha sido registrado</h2>
                    <div class="history">
                      <p>VER HISTORIAL</p>
                      <div class="img-cont">
                        <img
                          draggable="false"
                          @click="showHistory = true"
                          src="@/assets/icon-history.png"
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <transition name="slide-fade" v-if="showHistory">
                  <History
                    :key="logKey"
                    class="History"
                    v-on:close="showHistory = false"
                    :patientId="currentRow.id"
                  />
                </transition>
              </div>
            </el-tab-pane>
            <el-tab-pane disabled>
              <el-tooltip
                slot="label"
                content="Cita Subsecuente"
                placement="top-start"
                effect="light"
              >
                <div style="height:100%;width:100%;">
                  <img
                    @click="navigateTo('/admin/appointments/subsequent')"
                    class="icon-img"
                    draggable="false"
                    src="@/assets/icon-cita.png"
                  >
                </div>
              </el-tooltip>
            </el-tab-pane>
            <el-tab-pane disabled>
              <el-tooltip
                slot="label"
                content="Cita Para Trabajo Social"
                placement="top-start"
                effect="light"
              >
                <div style="height:100%;width:100%;">
                  <img
                    @click="navigateTo('/admin/appointments/social')"
                    class="icon-img"
                    draggable="false"
                    src="@/assets/icon-social.png"
                  >
                </div>
              </el-tooltip>
            </el-tab-pane>
            <el-tab-pane>
              <el-tooltip
                slot="label"
                content="Historial de citas"
                placement="top-start"
                effect="light"
              >
                <img
                  class="icon-img"
                  draggable="false"
                  src="@/assets/icon-appointment-history.png"
                >
              </el-tooltip>
              <div class="row">
                <LeftContainer :isProfile="true" :currentRow="currentRow" />
                <div class="right-container" style="height: inherit;">
                  <Title
                    v-on:closeDialog="closeDialog"
                    text="HISTORIAL DE CITAS"
                  />
                  <div
                    class="right-content general"
                    style="height: 100%"
                  >
                    <AppointmentsHistory :patientId="currentRow.id" />
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane>
              <el-tooltip
                slot="label"
                content="Notas de Archivo"
                placement="top-start"
                effect="light"
              >
                <img
                  class="icon-img"
                  draggable="false"
                  src="@/assets/comments-icon.png"
                >
              </el-tooltip>
              <div class="row">
                <LeftContainer :isProfile="true" :currentRow="currentRow" />
                <div class="right-container" style="height: inherit;">
                  <Title
                    v-on:closeDialog="closeDialog"
                    text="COMENTARIOS"
                  />
                  <div
                    class="right-content general"
                    style="height: 440px"
                  >
                    <Comments :patientId="currentRow.id" />
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane>
              <el-tooltip
                slot="label"
                content="Documentos"
                placement="top-start"
                effect="light"
              >
                <img
                  @click="visibleDocs = true"
                  class="icon-img"
                  draggable="false"
                  src="@/assets/icon-docs.png"
                >
              </el-tooltip>
              <div class="row">
                <LeftContainer :currentRow="currentRow" />
                <div class="right-container">
                  <Docs
                    :patientId="currentRow.id"
                    :visible="visibleDocs"
                    v-on:closeDialog="closeDialog"
                    :key="docsKey"
                  />
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane v-if="hasPermission('TS')">
              <el-tooltip
                slot="label"
                content="Perfil
                socioeconómico"
                placement="top-start"
                effect="light"
              >
                <img class="icon-img" draggable="false" src="@/assets/icon-social-r.png" >
              </el-tooltip>
              <div class="row">
                <LeftContainer :currentRow="currentRow" />
                <div class="right-container">
                  <Title
                    v-on:closeDialog="closeDialog"
                    :text="'PERFIL SOCIOECONÓMICO'"
                    :editable="hasPermission('TS')"
                    :patientId="currentRow.id"
                    url="admin/evaluations/socialeva"
                  />
                  <div class="right-content">
                    <SocEcProfile :patientId="currentRow.id" :key="socEcKey" />
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane v-if="hasPermission('OPTO')">
              <el-tooltip
                slot="label"
                content="Perfil
                optométrico"
                placement="top-start"
                effect="light"
              >
                <img class="icon-img" draggable="false" src="@/assets/icon-optometria.png" >
              </el-tooltip>
              <div class="row">
                <LeftContainer :currentRow="currentRow" />
                <div class="right-container">
                  <Title
                    v-on:closeDialog="closeDialog"
                    :text="'PERFIL OPTOMÉTRICO'"
                    :editable="hasPermission('OPTO')"
                    :patientId="currentRow.id"
                    url="admin/evaluations/opto"
                  />
                  <div class="right-content">
                    <OptoProfile
                      :patientId="currentRow.id"
                      :isFullProfile="false"
                      :key="optoKey"
                    />
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane v-if="hasPermission('MD')">
              <el-tooltip
                slot="label"
                content="Perfil
                oftalmológico"
                placement="top-start"
                effect="light"
              >
                <img class="icon-img" draggable="false" src="@/assets/icon-oftalmologia.png" >
              </el-tooltip>
              <div class="row">
                <LeftContainer :currentRow="currentRow" />
                <div class="right-container">
                  <Title
                    v-on:closeDialog="closeDialog"
                    :text="'PERFIL OFTALMOLÓGICO'"
                    :editable="hasPermission('MD')"
                    :patientId="currentRow.id"
                    url="admin/evaluations/ofta"
                  />
                  <div class="right-content">
                    <OftaProfile :patientId="currentRow.id" :key="oftaKey" />
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import LeftContainer from './LeftContainer';
import OftaProfile from '../profiles/Ofta';
import OptoProfile from '../profiles/Opto';
import SocEcProfile from '../profiles/SocioEconomic';
import History from './History';
import AppointmentsHistory from './AppointmentsHistory';
import Comments from './Comments';
import Title from '../../components/Title';
import Docs from '../Docs/index';

const moment = require('moment');

export default {
  data() {
    return {
      pagination: 0,
      currentPage: 1,
      tableHeight: 500,
      tableData: [],
      visibleDocs: false,
      btnText: '',
      ph: '',
      dialogVisible: false,
      showHistory: false,
      haveGeneralProfile: false,
      currentRow: 0,
      oftaKey: 0,
      optoKey: 100,
      socEcKey: 200,
      docsKey: 300,
      logKey: 400,
      search: '',
      loadingSearch: false,
      filterType: 'id',
      filters: [
        {
          name: 'name',
          label: 'Busqueda por nombre completo',
          query: '&fullname=',
        },
        {
          name: 'id',
          label: 'Busqueda por expediente',
          query: '&id=',
        },
      ],
    };
  },
  components: {
    LeftContainer,
    OftaProfile,
    OptoProfile,
    SocEcProfile,
    Title,
    History,
    AppointmentsHistory,
    Docs,
    Comments,
  },
  computed: {
    ...mapState({
      lastSearch: (state) => state.app.lastSearch,
      typeSearch: (state) => state.app.typeSearch,
      role: (state) => state.auth.user.role,
    }),
  },
  methods: {
    rowFormatter({ row }) {
      const val = row.accepted;
      if (!val && val !== null) {
        return 'warning-row';
      }
      return '';
    },
    hasPermission(section) {
      const { id } = this.role;
      if (id === 'ADMIN') {
        return true;
      }
      if (id === section) {
        return true;
      }
      return false;
    },
    handleClose(done) {
      this.showHistory = false;
      done();
    },
    navigateTo(route) {
      const { id } = this.currentRow;
      this.$router.push({ path: `${route}/${id}` });
    },
    calcTableH() {
      const height = this.$refs.card.clientHeight;
      this.tableHeight = height - 20;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    closeDocs() {
      this.visibleDocs = false;
    },
    selectAgeRange(birthdate) {
      const bd = moment(birthdate);
      const today = moment().now;
      const diff = Math.abs(bd.diff(today, 'years'));
      if (diff < 1) {
        return 'Menor de 1 Año';
      }
      if (diff < 6) {
        return '1 a 5 Años';
      }
      if (diff < 12) {
        return '6 a 11 Años';
      }
      if (diff < 18) {
        return '12 a 17 Años';
      }
      if (diff < 30) {
        return '18 a 29 Años';
      }
      if (diff < 60) {
        return '30 a 60 Años';
      }
      return '60 Años o mas';
    },
    async getPatientData(patientId) {
      try {
        let patient = {};
        const response = await this.axios.get(`patient/info/${patientId}`);
        const { data } = response;
        patient = data ? {
          ...data,
          fullName: `${data.firstName} ${data.lastName}`,
          ageRange: this.selectAgeRange(data.birthdate),
        } : this.patient;
        const response2 = await this.axios.get(`patient/profile/${patientId}`);
        const data2 = response2.data;
        patient = data2 ? {
          ...data,
          ...data2,
          fullName: `${data.firstName} ${data.lastName}`,
          fullAddress: `${data2.address}, \
            ${data2.city}, ${data2.state}, ${data2.country}`,
          ageRange: this.selectAgeRange(data.birthdate),
        } : patient;
        this.haveGeneralProfile = true;
        return patient;
      } catch (error) {
        this.haveGeneralProfile = false;
        const response = await this.axios.get(`patient/info/${patientId}`);
        const { data } = response;
        return {
          ...data,
          fullName: `${data.firstName} ${data.lastName}`,
          ageRange: this.selectAgeRange(data.birthdate),
        };
      }
    },
    async handleClick(row) {
      const patient = await this.getPatientData(row.id);
      this.currentRow = {
        ...patient,
        id: row.id,
      };
      this.oftaKey += 1;
      this.optoKey += 1;
      this.docsKey += 1;
      this.socEcKey += 1;
      this.logKey += 1;
      this.dialogVisible = true;
    },
    handleCommand(command) {
      const [filter] = this.filters.filter((x) => x.name === command);
      if (filter) {
        this.filterType = command;
        this.btnText = filter.label;
        this.ph = filter.label;
      }
    },
    async getData() {
      try {
        this.loading = true;
        const [filter] = this.filters.filter((x) => x.name === this.filterType);
        let url = `patient/list?page=${this.currentPage}`;
        if (filter && this.search) {
          url += `${filter.query}${this.search}`;
        }
        const response = await this.axios.get(url);
        const { data } = response;
        if (data) {
          const { dataset, pagination } = data;
          if (Array.isArray(dataset)) {
            this.pagination = pagination;
            this.tableData = dataset.map((x) => ({
              ...x,
              fullName: `${x.firstName} ${x.lastName}`,
            }));
          }
        }
      } catch (err) {
        this.$errorNotify(err);
      } finally {
        this.loading = false;
      }
    },
    async onPageChange(page) {
      this.currentPage = page;
      await this.getData(page);
    },
    async searchHandler() {
      try {
        this.loadingSearch = true;
        await this.getData();
        this.loadingSearch = false;
      } catch (error) {
        this.loadingSearch = false;
      }
    },
  },
  mounted() {
    window.addEventListener('resize', this.calcTableH);
  },
  beforeDestroy() {
    this.$store.dispatch('app/setLastSearch', this.search || null);
    this.$store.dispatch('app/setTypeSearch', this.filterType || null);
    window.removeEventListener('resize', this.calcTableH);
  },
  async created() {
    if (this.lastSearch) {
      this.search = this.lastSearch;
    }
    if (this.typeSearch) {
      this.filterType = this.typeSearch;
      this.handleCommand(this.typeSearch);
    }
    this.searchHandler();
    setTimeout(() => {
      this.calcTableH();
    });
  },
  watch: {
    filterType(val) {
      if (val) {
        this.$refs.searchInput.select();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.general {
  overflow: unset!important;
}
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .5s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(400px);
  opacity: 0;
}
</style>

<style lang="scss">
.el-table .warning-row {
  background: oldlace !important;
}
#main-popup {
  .el-dialog__wrapper {
    overflow: unset!important;
  }
  .el-dialog__body {
    word-break: break-word!important;
  }
  .el-dialog {
    margin-top: 120px!important;
    min-width: 850px!important;
  }
  .el-dialog__header {
    height: 0px!important;
    padding: 0px!important;
  }
  .el-dialog__body{
    margin-top: 0px!important;
    padding: 0px!important;
  }
}
.History {
  position: absolute;
  width: 60%;
  height: 100%;
  right: 0px;
  top: 0px;
}
.history {
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 15px;
  right: 15px;
  .img-cont {
    height: 100%;
    margin-left: 15px;
    img {
      width: 50px!important;
      cursor: pointer;
    }
  }
}
.el-tabs__nav {
  width: 100%!important;
  #tab-landing, #tab-0, #tab-1, #tab-2, #tab-3, #tab-4 {
    background-color: #F4FAFF!important;
  }
  #tab-landing,  #tab-0 {
    margin-left: 20px;
    background-color: #49749F!important;
  }
  #tab-5 {
    margin-right: 20px;
  }
  #tab-5, #tab-6, #tab-7, #tab-8 {
    background-color: #49749F!important;
    float: right!important;
  }
}
.el-tabs__header {
  width: 100%!important;
  background-color: transparent!important;
  position: absolute;
  top: -55px;
}
.el-tabs__item {
  background-color: #fff;
  height: 55px!important;
  margin: 0px 5px;
  padding: 0px 10px!important;
}
.icon-img {
  height: 52px!important;
  cursor: pointer;
}
.el-tabs {
  .is-active {
    height: 55px!important;
  }
}
.el-tabs--border-card {
  border: none!important;
}
.el-tabs__content {
 padding: 0px!important;
}
.info {
  p{
    margin-left: 10px;
    margin-bottom: 0px;
  }
}
.row {
  display: flex;
  flex-direction: row;
  .right-container {
    background-color: #fff;
    width: 60%;
    height: 100%;
    ::-webkit-scrollbar {
      width: 5px;
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
    .no-data {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      height: 400px;
    }
    .right-content {
      width: 100%;
      max-height: 524px;
      overflow-y: scroll;
      overflow-x: hidden;
      margin: 0px;
      .title {
        margin: 0px;
        margin-top: 10px;
        font-weight: bold;
        color: #000;
      }
      .content {
        margin-top: 2px;
        margin: 0px;
        color: #808C95;
      }
    }
  }
}
.center {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 20px;
  p {
    margin-bottom: 0px!important;
  }
  .img-container {
    img {
      width: 100px!important;
      height: 100px!important;
      border-radius: 50%;
      object-fit: contain;
    }
  }
}
.cont {
    height: 100%;
  .el-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    .el-col {
      height: 95%;
      width:95%;
      display: flex;
      flex-direction: column;
      .search-container {
        margin-bottom: 10px;
        display: flex;
        flex-direction: row;
        width: 50%;
        .el-input {
          width: 60%;
          max-width: 60%;
          float: left!important;
          margin-right: 10px;
        }
      }
      .card {
        height: 90%;
        border-radius: 5px;
        background: #fff;
        padding: 0px;
        .title {
          margin: 5px 0px 0px 10px;
          font-size: 15px;
          color: #557DA6;
          font-weight: bold;
        }
        .el-table td {
          padding: 8px 0px;
        }
        .el-table {
          width: 100%;
          font-size: 11px;
          color: #646D82;
          margin-bottom: 5px;
          padding-left: 5px;
          .bold {
            font-weight: bold;
            color: #000;
          }
          .normal {
            color: #646D82;
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
        }
      }
    }
  }
}
</style>
