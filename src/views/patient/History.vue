<template>
  <div class="main-cont">
    <Title
      v-on:closeDialog="$emit('close')"
      text="HISTORIAL DEL PACIENTE"
    />
    <div class="secs">
      <div
        class="section"
        v-for="item in data"
        :key="item.key"
      >
        <div class="sec-title">
          <p class="date">{{ item.date }}</p>
        </div>
        <div class="sec-content">
          <div class="dec">
            <div class="circ"/>
            <div class="line"/>
          </div>
          <div>
            <p class="titl">{{ item.title }}</p>
            <p class="cont">
              {{`${item.message} por `}}
              <b>{{item.person}}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '../../components/Title3';

const moment = require('moment');

export default {
  name: 'History',
  props: {
    patientId: {
      type: Number,
    },
  },
  data() {
    return {
      data: {},
    };
  },
  components: {
    Title,
  },
  methods: {
    async getData() {
      try {
        const response = await this.axios.get(`patient/changelog/${this.patientId}`);
        if (response.statusText.toLowerCase() === 'ok' || response.status === 200) {
          const { data } = response;
          data.forEach((element) => {
            // eslint-disable-next-line
            element.person = `${element.evaluator.firstName} ${element.evaluator.lastName}`;
            const date = moment(element.createdAt);
            // eslint-disable-next-line
            element.date = date.locale('es').format('LLL');
          });
          this.data = data;
        }
      } catch (error) {
        this.$errorNotify(error);
      }
    },
  },
  async mounted() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
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
.main-cont {
  border-left: 1px solid #aeaeae;
  background-color: #F4FAFF;
  .secs {
    overflow-y: scroll!important;
    height: 460px;
    .section {
      padding-bottom: 20px;
      .sec-title {
        padding: 5px 20px;
      }
      .sec-content {
        display: flex;
        flex-direction: row;
        height: 110px;
        background-color: #FFF;
        padding: 10px 50px;
      }
      .dec {
        display: flex;
        flex-direction: column;
        margin: 15px 0px;
        .line {
          width: 2px;
          height: 70px;
          margin: 0px 13px 0px 13px;
          background-color: #5B81A9;
        }
        .circ {
          margin: 0px 10px 0px;
          background-color: #5B81A9;
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
      }
      .titl {
        color: #5B81A9;
        font-weight: 700;
      }
      .date {
        color: #646D82;
        font-weight: 700;
      }
      .cont {
        color: #646D82;
        word-break: break-word;
      }
    }
  }
}
</style>
