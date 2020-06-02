<template>
  <div
    id="container-apointments-history"
    class="container"
    v-loading="commentFormLoading"
  >
    <div
      v-for="(item, idx) in items"
      class="item"
      :key="idx.toString()"
    >
      <div class="id">
        {{ idx + 1 }}
      </div>
      <div class="info">
        <div>
          <b>Tipo: </b>
          <span>{{ item.type }}</span>
        </div>
        <div>
          <b>Fecha: </b>
          <span>{{ dateFormatter(item.date) }}</span>
        </div>
        <div>
          <b>Asignada por: </b>
          <span>
            {{
              `${item.creator.firstName} ${item.creator.lastName} (${item.creator.role.name})`
            }}
          </span>
        </div>
        <div>
          <b>Asignada a: </b>
          <span>
            {{
              `${item.user.firstName} ${item.user.lastName} (${item.user.role.name})`
            }}
          </span>
        </div>
        <div>
          <b>Completada: </b>
          <span>
            {{ item.checked ? 'SI' : 'NO' }}
          </span>
        </div>
        <div>
          <b>Cancelada: </b>
          <span>
            {{ item.canceled ? 'SI' : 'NO' }}
          </span>
        </div>
        <div>
          <b>Razón de cancelación: </b>
          <span>
            {{ item.cancelReason ? item.cancelReason : 'N/A' }}
          </span>
        </div>
      </div>
      <div class="comments">
        <b>
          Comentarios
        </b>
        <span class="comments__actions">
          <el-button
            round
            size="small"
            v-if="!isFormEnabled(idx)"
            @click="enableForm(idx)"
          >
            <i class="el-icon-edit"/>
          </el-button>
          <el-button
            round
            size="small"
            type="danger"
            v-if="isFormEnabled(idx)"
            @click="closeForm"
          >
            <i class="el-icon-close"/>
          </el-button>
          <el-button
            round
            size="small"
            type="success"
            v-if="isFormEnabled(idx)"
            @click="submitEditComment"
          >
            <i class="el-icon-check"/>
          </el-button>
        </span>
        <br v-if="isFormEnabled(idx)">
        <p v-if="!isFormEnabled(idx)">
          {{ item.comments }}
        </p>
        <el-form
          v-if="isFormEnabled(idx)"
          ref="commentForm"
          :model="commentForm"
          :rules="commentFormRules"
          @submit.prevent.native
        >
          <el-form-item prop="comment">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="Agregué el comentario"
              v-model="commentForm.comment"
            />
          </el-form-item>
        </el-form>
        <div/>
      </div>
    </div>
    <el-button
      type="secondary"
      style="
      position:absolute;
      right: 10px;
      bottom: 10px;
      opacity: 0.7;
      "
      @click="scrollToEnd"
    >
      <i class="el-icon-bottom"/>
    </el-button>
  </div>
</template>
<script>
import moment from 'moment';

export default {
  props: {
    patientId: {
      type: Number,
    },
  },
  data() {
    return {
      items: [],
      formEnabled: null,
      commentFormLoading: false,
      commentForm: {
        comment: '',
      },
      commentFormRules: {
        comment: [],
      },
    };
  },
  methods: {
    enableForm(idx) {
      if (!this.formEnabled) {
        this.formEnabled = idx;
        const item = this.items[idx];
        this.commentForm.comment = item.comments;
      } else {
        this.$confirm('Tiene una edición de comentario activa. ¿Desea cancelarlo y continuar?', 'Alerta', {
          confirmButtonText: 'Sí',
          cancelButtonText: 'No',
          type: 'warning',
        }).then(() => {
          this.closeForm();
          this.enableForm(idx);
        });
      }
    },
    isFormEnabled(idx) {
      return this.formEnabled === idx;
    },
    closeForm() {
      this.formEnabled = null;
      this.commentForm.comment = '';
    },
    submitEditComment() {
      this.$refs.commentForm[0].validate(async (isValid) => {
        if (isValid) {
          try {
            const item = this.items[this.formEnabled];
            this.commentFormLoading = true;
            const response = await this.axios.patch(`patient/appointment/md/comments/${item.id}`, {
              comments: this.commentForm.comment,
            });
            const { data } = response;
            if (data) {
              const message = `Se actualizaron comentarios de la cita ${this.formEnabled + 1}`;
              await this.axios.post(`patient/changelog/${item.patientId}`, {
                title: 'Citas',
                message,
              });
              this.$notify({
                type: 'success',
                message: data.message,
              });
            }
            this.items[this.formEnabled].comments = this.commentForm.comment;
            this.closeForm();
          } catch (error) {
            this.$errorNotify(error);
          } finally {
            this.commentFormLoading = false;
          }
        }
      });
    },
    scrollToEnd() {
      const element = document.getElementById('container-apointments-history');
      element.scrollTop = element.scrollHeight;
    },
    dateFormatter(str) {
      const DATE_FORMAT = 'YYYY-MM-DD hh:MM A';
      return moment(str).isValid() ? moment(str).format(DATE_FORMAT) : str;
    },
    async getAppointments() {
      try {
        const response = await this.axios.get(`patient/appointment/md/history/${this.patientId}`);
        const { data } = response;
        if (Array.isArray(data)) {
          this.items = data;
        }
      } catch (error) {
        this.$errorNotify(error);
      }
    },
  },
  mounted() {
    this.getAppointments();
  },
  watch: {
    patientId(val) {
      if (val) {
        this.getAppointments();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  .item {
    width: 100%;
    background-color: #F3FAFF;
    border: 2px solid #FFFFFF;
    display: flex;
    flex-direction: row;
    padding-top: 10px;
    padding-bottom: 10px;
    .id {
      display: flex;
      justify-content: center;
      align-items: center;
      height: auto;
      width: 5%;
    }
    .info {
      margin: 0px !important;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      height: 100%;
      width: 55%;
    }
    .comments {
      position: relative;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      height: 100%;
      width: 40%;
      .comments__actions {
        position: absolute;
        right: 10px;
        .el-button {
          padding: 5px !important;
        }
      }
    }
  }
}
</style>
