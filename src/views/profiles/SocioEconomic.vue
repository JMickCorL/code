  <template>
  <div class="container">
    <div class="sections" v-if="haveData">
      <div class="section">
        <p class="sec-title">
          <el-divider content-position="left">
            DATOS INFORMATIVOS DEL BENEFICIARIO
          </el-divider>
        </p>
        <div class="row">
          <div>
            <p class="title">
              TIEMPO DE RESIDENCIA EN TIJUANA
            </p>
            <p class="content">
              {{socioeva.residenceTimeAtTijuana}}
            </p>
          </div>
        </div>
      </div>
      <div class="section">
        <p class="sec-title">
          <el-divider content-position="left">
            LINEA DE BIENESTAR
          </el-divider>
        </p>
        <div class="row">
          <div>
            <p class="title">
              ESCOLARIDAD
            </p>
            <p class="content">
              {{socioeva.academicDegree}}
            </p>
          </div>
          <div>
            <p class="title">
              CONDICIONES DE LA VIVIENDA
            </p>
            <p class="content">
              {{socioeva.houseCondition}}
            </p>
          </div>
        </div>
      </div>
      <div class="section">
        <p class="sec-title">
          <el-divider content-position="left">
            CARACTERÍSTICAS DE LA VIVIENDA
          </el-divider>
        </p>
        <div class="row">
          <div>
            <p class="title">
              PAREDES
            </p>
            <p class="content">
              {{socioeva.houseWalls}}
            </p>
          </div>
          <div>
            <p class="title">
              TECHO
            </p>
            <p class="content">
              {{socioeva.houseFloor}}
            </p>
          </div>
          <div>
            <p class="title">
              PISO
            </p>
            <p class="content">
              {{socioeva.houseRoof}}
            </p>
          </div>
        </div>
      </div>
      <div class="section">
        <p class="sec-title">
          <el-divider content-position="left">
            CUARTOS DE LA VIVIENDA
          </el-divider>
        </p>
        <div class="row">
          <div>
            <p class="title">
              CUARTOS
            </p>
            <p class="content">
              {{rooms}}
            </p>
          </div>
          <div>
            <p class="title">
              BAÑO
            </p>
            <p class="content">
              {{socioeva.houseRoomsBathroom}}
            </p>
          </div>
        </div>
      </div>
      <div class="section">
        <p class="sec-title">
          <el-divider content-position="left">
            SERVICIOS DE LA VIVIENDA
          </el-divider>
        </p>
        <p class="content">
          {{services}}
        </p>
      </div>
      <div class="section">
        <p class="sec-title">
          <el-divider content-position="left">
            MUEBLES Y ELECTRODOMÉSTICOS
          </el-divider>
        </p>
        <p class="content">
          {{houseStuff}}
        </p>
      </div>
      <div class="section">
        <p class="sec-title">
          <el-divider content-position="left">
            CUENTA CON AUTO PROPIO
          </el-divider>
        </p>
        <p class="content">
          {{ socioeva.car || 'NO' }}
        </p>
      </div>
      <div class="section">
        <p class="sec-title">
          <el-divider content-position="left">
            INGRESOS MENSUALES EN PROMEDIO
          </el-divider>
        </p>
        <p class="sub"/>
        <div
          class="row"
          v-for="contributor in socioeva.familyCore"
          :key="contributor.id"
        >
          <div>
            <p class="title lh2">
              NOMBRE COMPLETO
            </p>
            <p class="content">
              {{contributor.fullname}}
            </p>
          </div>
          <div>
            <p class="title lh2">
              PARENTESCO
            </p>
            <p class="content">
              {{contributor.relationship}}
            </p>
          </div>
          <div>
            <p class="title lh2">
              OCUPACIÓN
            </p>
            <p class="content">
              {{contributor.occupation}}
            </p>
          </div>
          <div>
            <p class="title lh2">
              APORTACIÓN MENSUAL EN PESOS
            </p>
            <p class="content">
              {{normalizeCurrency(contributor.monthlyContribution)}}
            </p>
          </div>
        </div>
        <div
          class="col"
          v-for="contributor in socioeva.familyWide"
          :key="contributor.id"
        >
          <div class="row">
            <div>
              <p class="title lh2">
                NOMBRE COMPLETO
              </p>
              <p class="content">
                {{contributor.fullname}}
              </p>
            </div>
            <div>
              <p class="title lh2">
                PARENTESCO
              </p>
              <p class="content">
                {{contributor.relationship}}
              </p>
            </div>
            <div>
              <p class="title lh2">
                OCUPACIÓN
              </p>
              <p class="content">
                {{contributor.occupation}}
              </p>
            </div>
            <div>
              <p class="title lh2">
                APORTACIÓN MENSUAL EN PESOS
              </p>
              <p class="content">
                {{normalizeCurrency(contributor.monthlyContribution)}}
              </p>
            </div>
          </div>
          <div>
            <p class="title lh2">
              OTRA CONTRIBUCIÓN
            </p>
            <p class="content">
              {{normalizeCurrency(contributor.otherContribution)}}
            </p>
          </div>
        </div>
        <div class="row">
          <div>
            <p class="title">
              TOTAL DE INGRESOS
            </p>
            <p class="content">
              {{ normalizeCurrency(totalContribution) }}
            </p>
          </div>
        </div>
      </div>
      <div class="section expences">
        <p class="sec-title">
          <el-divider content-position="left">
            EGRESOS MENSUALES EN PROMEDIO
          </el-divider>
        </p>
        <div class="row">
          <div>
            <p class="title lh2">
              AGUA
            </p>
            <p class="content">
              {{ normalizeCurrency(socioeva.expenseWater) }}
            </p>
          </div>
          <div>
            <p class="title lh2">
              LUZ
            </p>
            <p class="content">
              {{normalizeCurrency(socioeva.expenseLight)}}
            </p>
          </div>
          <div>
            <p class="title lh2">
              TELÉFONO/ INTERNET FIJO
            </p>
            <p class="content">
              {{ normalizeCurrency(socioeva.expensePhone) }}
            </p>
          </div>
          <div>
            <p class="title lh2">
              CELULAR
            </p>
            <p class="content">
              {{ normalizeCurrency(socioeva.expenseCellPhone) }}
            </p>
          </div>
          <div>
            <p class="title lh2">
              GAS
            </p>
            <p class="content">
              {{ normalizeCurrency(socioeva.expenseGas) }}
            </p>
          </div>
          <div>
            <p class="title lh2">
              ALIMENTACIONES
            </p>
            <p class="content">
              {{ normalizeCurrency(socioeva.expenseFood) }}
            </p>
          </div>
        </div>
        <div class="row">
          <div class="large-text" style="margin-right:20px!important;">
            <p class="title lh" style="width: 170px;">
              PRODUCTOS DE LIMPIEZA O MANTENIIENTO DEL HOGAR
            </p>
            <p class="content">
              {{normalizeCurrency(socioeva.expenseHouseSupplies)}}
            </p>
          </div>
          <div style="margin-right:20px!important;">
            <p class="title lh">
              SALUD
            </p>
            <p class="content">
              {{normalizeCurrency(socioeva.expenseHealth)}}
            </p>
          </div>
          <div style="margin-right:20px!important;">
            <p class="title lh">
              EDUCACIÓN
            </p>
            <p class="content">
              {{normalizeCurrency(socioeva.expenseEducation)}}
            </p>
          </div>
          <div style="margin-right:20px!important;">
            <p class="title lh">
              RENTA
            </p>
            <p class="content">
              {{normalizeCurrency(socioeva.expenseRent)}}
            </p>
          </div>
          <div class="large-text">
            <p class="title lh" style="width: 150px;">
              GASOLINA Y/O TRANSPORTE PUBLICO
            </p>
            <p class="content">
              {{normalizeCurrency(socioeva.expenseTransport)}}
            </p>
          </div>
        </div>
        <div class="row">
          <div>
            <p class="title">
              TARJETA DE CREDITO
            </p>
            <p class="content">
              {{normalizeCurrency(socioeva.expenseCreditCard)}}
            </p>
          </div>
          <div>
            <p class="title">
              OTROS
            </p>
            <p class="content">
              {{normalizeCurrency(socioeva.expenseOther)}}
            </p>
          </div>
        </div>
        <div class="row">
          <div>
            <p class="title">
              TOTAL DE EGRESOS
            </p>
            <p class="content">
              {{normalizeCurrency(totalExpenses)}}
            </p>
          </div>
        </div>
        <div class="row">
          <div>
            <p class="title">
              REMANENTE O DEUDA
            </p>
            <p class="content">
              {{normalizeCurrency(totalContribution - totalExpenses)}}
            </p>
          </div>
        </div>
      </div>
      <div class="section">
        <p class="sec-title">
          <el-divider content-position="left">
            CUALITATIVO
          </el-divider>
        </p>
        <div class="row">
          <div>
            <p class="title">
              DESCRIPCIÓN DE LA SITUACIÓN FAMILIAR
            </p>
            <p class="content">
              {{socioeva.familySituationDescription}}
            </p>
          </div>
          <div>
            <p class="title">
              COMENTARIOS DE LA TRABAJADORA SOCIAL
            </p>
            <p class="content">
              {{socioeva.comments}}
            </p>
          </div>
        </div>
      </div>
      <div class="section">
        <p class="sec-title">
          <el-divider content-position="left">
           EVALUACIÓN DE LA TRABAJADORA SOCIAL
          </el-divider>
        </p>
        <p class="content">
          {{socioeva.evaluationResult}}
        </p>
      </div>
      <div class="section">
        <p class="sec-title">
          <el-divider content-position="left">
            PROGRAMA AL QUE CALIFICA
          </el-divider>
        </p>
        <p class="content">
          {{ socioeva.programApplied || 'N/A' }}
        </p>
      </div>
      <div class="section" style="margin-bottom: 30px;">
        <p class="sec-title">
          <el-divider content-position="left">
            AUTORIZÓ
          </el-divider>
        </p>
        <p class="content">
          {{ socioeva.creator ? socioeva.creator.firstName : '' }}
          {{ socioeva.creator ? socioeva.creator.lastName : '' }}
        </p>
      </div>
    </div>
    <div v-else class="no-data" :style="{height: height}">
      <h3>Aun no se lleva a cabo la evaluación</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SocioEconomic',
  props: {
    patientId: {
      type: Number,
    },
  },
  data() {
    return {
      socioeva: {
        familyCore: [],
        familyWide: [],
      },
      haveData: false,
      height: !this.haveData ? '250px' : '450px',
    };
  },
  computed: {
    totalContribution() {
      let acct = 0;
      for (let i = 0; i < this.socioeva.familyCore.length; i++) {
        const element = this.socioeva.familyCore[i];
        acct += parseFloat(element.monthlyContribution);
      }
      for (let i = 0; i < this.socioeva.familyWide.length; i++) {
        const element = this.socioeva.familyWide[i];
        acct += parseFloat(element.monthlyContribution) + parseFloat(element.otherContribution);
      }
      return acct;
    },
    totalExpenses() {
      let acct = 0;
      const keys = [
        'expenseWater',
        'expenseLight',
        'expensePhone',
        'expenseCellPhone',
        'expenseGas',
        'expenseFood',
        'expenseHouseSupplies',
        'expenseHealth',
        'expenseEducation',
        'expenseRent',
        'expenseTransport',
        'expenseCreditCard',
        'expenseOther',
      ];
      for (let i = 0; i < keys.length; i++) {
        const element = this.socioeva[keys[i]];
        if (element) {
          acct += parseFloat(element);
        }
      }
      return acct;
    },
    services() {
      const services = [];
      const servicesMap = {
        serviceLight: 'Luz',
        serviceSewerSystem: 'Drenaje y alcantarillado',
        serviceCableTv: 'Televisión por cable',
        servicePhone: 'Teléfono fijo',
        serviceInternet: 'Internet',
        serviceAsphaltStreet: 'Pavimiento en las calles',
        servicePublicWater: 'Agua Pública',
        serviceOther: 'Otro',
      };
      const keys = Object.keys(servicesMap);
      keys.forEach((key) => {
        if (this.socioeva[key]) {
          services.push(servicesMap[key]);
        }
      });
      return services.join(', ') || 'Sin servicios';
    },
    rooms() {
      const rooms = [];
      const roomsMap = {
        houseRoomsLivingRoom: 'Sala',
        houseRoomsDiningRoom: 'Comedor',
        houseRoomsKitchen: 'Cocina',
        houseRoomsBedroom: 'Recámara',
        houseRoomsStudyingRoom: 'Estudio',
        houseRoomsCourtyard: 'Patio',
        houseRoomsOther: 'Otro',
      };
      const keys = Object.keys(roomsMap);
      keys.forEach((key) => {
        if (this.socioeva[key]) {
          let room = roomsMap[key];
          if (key === 'houseRoomsBedroom') {
            const value = this.socioeva.houseRoomsBedroom;
            const suffix = value > 1 ? 's' : '';
            room = `${value} ${room}${suffix}`;
          }
          rooms.push(room);
        }
      });
      return rooms.join(', ') || 'Sin datos';
    },
    houseStuff() {
      const houseStuff = [];
      const houseStuffMap = {
        houseStuffTV: 'Televisión',
        houseStuffFridge: 'Refrigerador',
        houseStuffStove: 'Esuúfa',
        houseStuffDishWasher: 'Lava platos',
        houseStuffMicrowaveOven: 'Horno de Microondas',
        houseStuffBlender: 'Licuadora',
        houseStuffWashingMachine: 'Lavadora',
        houseStuffDryer: 'Secadora',
        houseStuffComputer: 'Computadora o Ipad',
        houseStuffDiningRoomSet: 'Comedor',
        houseStuffLivingRoomSet: 'Sala',
        houseStuffBedroomSet: 'Recámara',
      };
      const keys = Object.keys(houseStuffMap);
      keys.forEach((key) => {
        if (this.socioeva[key]) {
          houseStuff.push(houseStuffMap[key]);
        }
      });
      return houseStuff.join(', ') || 'Sin datos';
    },
  },
  methods: {
    normalizeCurrency(val) {
      const value = val || 0;
      return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value);
    },
    async getData() {
      try {
        const response = await this.axios.get(`patient/social/details/${this.patientId}`);
        if (response.data) {
          this.socioeva = {
            ...response.data,
            creator: {
              firstName: response.data['creator.firstName'],
              lastName: response.data['creator.lastName'],
            },
          };
          this.haveData = true;
        }
      } catch (error) {
        this.$errorNotify(error);
      }
    },
    normalizeBoolean(val) {
      return val ? 'SÍ' : 'NO';
    },
  },
  async created() {
    await this.getData();
  },
};
</script>

<style lang="scss">
.el-divider__text {
  padding: 0 5px!important;
}
</style>

<style lang="scss">
.container {
  width: 100%;
  .sections {
    overflow-y: scroll;
    word-break: keep-all;
    width: 100%;
    .expences {
      .row {
        .title, .content {
          padding: 0px!important;
        }
        div:first-child {
          padding: 0 0 0 25px;
        }
      }
    }
    .section {
      padding: 5px 0 0 0;
      width: 100%;
      overflow-x: hidden;
      .sec-title {
        .el-divider__text {
          font-size: 16px;
          font-weight: bold;
          color: #49749F;
        }
      }
      .subtitle {
        font-size: 14px;
        margin: 0px;
        margin-left: 10px;
        margin-top: 15px;
        margin-bottom: 5px;
        font-weight: bold;
        color: #49749F;
      }
      .content {
        margin-top: 2px;
        margin: 0px;
        color: #808C95;
        padding: 0 0 0 25px;
      }
      .col {
        margin-left: 10px;
        .row {
          margin-left: 0px;
        }
        .title {
          font-weight: bold;
          color: #000000;
          margin: 0px;
          padding: 0 0 0 25px;

        }
        .content {
          color: #808C95;
          margin: 0px;
          margin-top: 2px;
          margin-bottom: 10px;
          padding: 0 0 0 25px;
        }
      }
      .row {
        margin-left: 10px;
        margin-top: 5px;
        display: flex;
        flex-direction: row;
        div {
          margin-right: 20px;
          div {
            margin-right: 20px;
          }
        }
        .lh {
          height: 60px;
        }
        .lh2 {
          height: 30px;
        }
        .large-text {
          padding-right: 0px;
          max-width: 200px;
        }
        .title {
          font-weight: bold;
          color: #000000;
          margin: 0px;
          padding: 0 0 0 25px;
        }
        .content {
          color: #808C95;
          margin: 0px;
          margin-top: 2px;
          margin-bottom: 10px;
          padding: 0 0 0 25px;
        }
      }
    }
  }
  .no-data {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    h3 {
      color: #808C95;
      font-size: 21px!important;
    }
  }
}
</style>
