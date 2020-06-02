<template>
  <div class="comments-wrapper">
    <div class="messages" >
      <div class="message__inner" v-for="(item, idx) in messages" :key="idx.toString()">
        <div class="author">
          <Avatar
            class="avatar"
            :src="avatarFormater(item.creator.avatar)"
            :size="20"
            fit="cover"
          />
          <div class="name">
            {{ `${item.creator.firstName} ${item.creator.lastName}` }}
          </div>
          <div class="role">
            {{ `(${item.creator.role.name})` }}
          </div>
          <div class="date">
            {{ dateFormat(item.createdAt) }}
          </div>
          <div class="actions">
            <el-button
              v-if="showDeleteBtn(item)"
              :disabled="loading || deleting || fetching"
              @click="deleteComment(item.id)"
              round
              size="small"
              type="danger"
              style="padding:5px"
            >
            <i class="el-icon-close"/>
          </el-button>
          </div>
        </div>
        {{ item.message }}
      </div>
    </div>
    <div class="message-input">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        @submit.prevent.native
        :disabled="loading || fetching"
      >
        <el-form-item prop="message">
          <el-input
            type="textarea"
            :rows="4"
            resize="none"
            placeholder="Escriba el comentario"
            v-model="form.message"
            maxlength="255"
            show-word-limit
            inline-message
            :disabled="loading || fetching"
          />
        </el-form-item>
        <el-button
          type="primary"
          @click.native="beforeSubmit"
          :disabled="loading || fetching"
        >
          <i class="el-icon-position"/>
        </el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import { mapState } from 'vuex';
import { originalURL } from '../../API';

export default {
  props: ['patientId'],
  data() {
    return {
      form: {
        message: '',
      },
      loading: false,
      deleting: false,
      fetching: false,
      messages: [],
      rules: {
        message: [
          {
            required: true,
            message: 'El campo es requerido',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      userId: (state) => state.auth.user.id,
    }),
  },
  methods: {
    showDeleteBtn(item) {
      try {
        return item?.creator?.id === this.userId;
      } catch {
        return false;
      }
    },
    scrollToEnd() {
      const [element] = document.getElementsByClassName('messages');
      element.scrollTop = element.scrollHeight;
    },
    beforeSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submit();
        }
      });
    },
    async submit() {
      try {
        this.loading = true;
        const response = await this.axios.post(`patient/comments/${this.patientId}`, {
          message: this.form.message,
        });
        if (response) {
          await this.getComments();
          const message = 'Se agregó comentario';
          await this.axios.post(`patient/changelog/${this.patientId}`, {
            title: 'COMENTARIOS',
            message,
          });
          this.$notify({
            type: 'success',
            message,
          });
          this.scrollToEnd();
          this.form.message = null;
        }
        this.loading = false;
      } catch (error) {
        this.$errorNotify(error);
      } finally {
        this.loading = false;
      }
    },
    async getComments() {
      try {
        if (!this.fetching) {
          this.fetching = true;
          const response = await this.axios.get(`patient/comments/${this.patientId}`);
          if (response.data) {
            this.messages = [...response.data];
          }
          setTimeout(() => {
            this.scrollToEnd();
          });
        }
      } catch (error) {
        this.$errorNotify(error);
      } finally {
        this.fetching = false;
      }
    },
    avatarFormater(avatar) {
      return avatar ? `${originalURL}/static/user/avatar/${avatar}` : null;
    },
    dateFormat(str) {
      return moment(str).format('YYYY-MM-YY hh:mm A');
    },
    async deleteComment(id) {
      try {
        this.deleting = true;
        const response = await this.axios.delete(`patient/comments/${id}`);
        const { data } = response;
        if (data) {
          this.$notify({
            type: 'success',
            message: data.message,
          });
          this.messages.splice(this.messages.findIndex((x) => x.id === id), 1);
        }
      } catch (error) {
        this.$errorNotify(error);
      } finally {
        this.deleting = false;
      }
    },
  },
  mounted() {
    this.getComments();
  },
  watch: {
    patientId(val) {
      if (val) {
        this.getComments();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.comments-wrapper {
  height: 100%;
  width: 100%;
  .messages {
    width: calc(100% - 10px);
    margin-left: 5px;
    height: calc(100% - 110px);
    overflow-y: auto;
    .message__inner {
      position: relative;
      height: auto;
      border-radius: 5px;
      background-color: rgb(237, 238, 255);
      font-size: 14px;
      font-weight: 500;
      padding: 10px 5px;
      margin: 10px 0px;
      text-align: left;
      .author {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: calc(100%);
        margin-bottom: 5px;
        .avatar {
          margin-right: 5px;
          min-width: 20px !important;
        }
        .name {
          overflow: hidden;
          margin-right: 5px;
          white-space: nowrap !important;
          text-overflow: ellipsis !important;
        }
        .role {
          text-align: left;
          min-width: 130px;
          font-weight: 600;
        }
        .date {
          min-width: 150px;
          text-align: right;
          color: rgba(0,0,0,0.3)
        }
      }
      .actions {
        z-index: 10;
        position: absolute;
        right: 5px;
        top: 5px;
      }
    }
  }
  .message-input {
    width: calc(100% - 10px);
    padding-left: 10px;
    height: 110px;
    .el-form {
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: row;
      .el-form-item {
        width: 100%;
      }
      .el-button {
        height: calc(100% - 14px);
        i {
          font-size: 25px;
          color: #FFFFFF;
        }
      }
    }
  }
}
</style>
