<template>
  <div class="main">
    <div v-if="!currentFolder">
      <Title v-on:closeDialog="closeDialog" :text="'DOCUMENTOS'"/>
      <div class="folders">
        <div
          class="folder"
          v-for="(folder, index) in allowedFolders()"
          :key="index"
          @click="selectFolder(folder)">
          <div class="img-container">
            <img src="@/assets/folder.png">
            <p>{{folder}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="main" v-if="currentFolder">
      <Title
        v-on:closeDialog="closeDialog"
        :text="`DOCUMENTOS / ${currentFolder}`"/>
      <div class="files">
        <p class="back" @click="currentFolder = null" v-if="showReturn">
          <i class="el-icon-arrow-left"/>
          Atras
        </p>
        <div class="header title">
          <p class="name">NOMBRE</p>
          <p class="date">INGRESO</p>
          <p class="createdBy">PUBLICADO POR</p>
        </div>
        <div
          class="file"
          v-for="(file, index) in files"
          :key="index"
        >
          <div class="prev-container">
            <el-image
              v-if="file.mimetype.split('/')[0] === 'image'"
              class="preview"
              :src="`${baseURL}/static/file/${file.patientId}/${file.id}.${file.ext}`"
              :preview-src-list="
                [`${baseURL}/static/file/${file.patientId}/${file.id}.${file.ext}`]
              "
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"/>
              </div>
            </el-image>
            <div
              style="height: 100%;width:100%"
              v-if="file.mimetype.split('/')[1] === 'pdf'"
            >
              <img src="../../assets/pdf-badge.png" alt="pdf icon">
            </div>
            <div
              style="height: 100%;width:100%"
              v-if="
                file.mimetype.split('/')[1] !== 'pdf'
                && file.mimetype.split('/')[0] !== 'image'"
            >
              <img src="../../assets/file-badge.png" alt="file icon">
            </div>
          </div>
          <div style="width: 40%">
            <p>{{`${file.name}.${file.ext}`}}</p>
          </div>
          <div class="content" style="width: 20%">
            <p>{{file.createdAt}}</p>
          </div>
          <div class="content" style="width: 20%">
            <p>{{`${file.creator.firstName} ${file.creator.lastName}`}}</p>
          </div>
          <a
            :href="`${baseURL}/static/file/${file.patientId}/${file.id}.${file.ext}`"
            target="_blank"
            :download="`${file.id}.${file.ext}`"
            class="content"
            style="
              width: 20%;
              display:flex;
              justify-content:center;
              align-items:center;
          ">
            <i class="el-icon-download" style="font-size:20px"/>
          </a>
        </div>
      </div>
      <el-button type="primary" @click="handleOpenFile">
        <i class="el-icon-upload"/>
        Adjuntar archivo
      </el-button>
      <input
      id="docsInp"
      ref="docsInp"
      type="file"
      style="display: none;"
      v-on:change="addFile">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
import { originalURL } from '../../API';
import Title from '../../components/Title';

export default {
  name: 'Docs',
  props: {
    patientId: {
      type: Number,
    },
    selectedFolder: {
      type: String,
      default: null,
    },
    showReturn: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      baseURL: originalURL,
      srcList: [],
      folders: [
        'ANTECEDENTES',
        'FICHA TÉCNICA',
        'OFTALMOLOGÍA',
        'OPTOMETRÍA',
        'TRABAJO SOCIAL',
      ],
      files: [],
      data: {
        ofta: [],
        opto: [],
        social: [],
        background: [],
        dataSheet: [],
      },
      currentFolder: '',
      patient: null,
    };
  },
  components: {
    Title,
  },
  computed: {
    ...mapState({
      roleID: (state) => state.auth.user.role.id,
    }),
  },
  methods: {
    allowedFolders() {
      const output = [
        'ANTECEDENTES',
        'FICHA TÉCNICA',
        'OFTALMOLOGÍA',
        'OPTOMETRÍA',
        'TRABAJO SOCIAL',
      ];
      return output;
    },
    selectFolder(folder) {
      this.currentFolder = folder;
      this.$emit('onChangeFolder', folder);
      switch (folder) {
        case 'OFTALMOLOGÍA':
          this.files = this.data.ofta;
          break;
        case 'OPTOMETRÍA':
          this.files = this.data.opto;
          break;
        case 'TRABAJO SOCIAL':
          this.files = this.data.social;
          break;
        case 'ANTECEDENTES':
          this.files = this.data.background;
          break;
        case 'FICHA TÉCNICA':
          this.files = this.data.dataSheet;
          break;
        default:
          this.files = null;
          break;
      }
    },
    handleOpenFile() {
      document.getElementById('docsInp').click();
    },
    async addFile() {
      try {
        const file = this.$refs.docsInp.files;
        if (file.length) {
          const MbLimit = 10;
          const size = file[0].size / 1024 / 1024 < MbLimit;
          if (size) {
            const { id } = this.$route.params;
            const val = id || this.patientId;
            const data = new FormData();
            data.append('file', file[0]);
            data.append('virtualPath', `/${this.currentFolder.toUpperCase()}`);
            const response = await this.axios({
              url: `patient/file/${val}`,
              method: 'POST',
              data,
              headers: {
                'content-type': 'application/form-data',
              },
            });
            if (response) {
              await this.axios.post(`patient/changelog/${val}`, {
                patient: val,
                title: this.currentFolder.toUpperCase(),
                message: 'Se agregó archivo',
              });
              await this.getData();
            }
          } else {
            this.$message({
              type: 'error',
              message: 'La imagen excede el tamaño limite, por favor use un archivo inferior a 1 Mb.',
              showClose: false,
            });
          }
        } else {
          this.$message({
            type: 'error',
            message: 'Archivo no encontrado',
            showClose: false,
          });
        }
      } catch (error) {
        this.$errorNotify(error);
      }
    },
    closeDialog() {
      this.$emit('closeDialog');
    },
    async getData() {
      try {
        const { id } = this.$route.params;
        const val = id || this.patientId;
        const response = await this.axios.get(`patient/file/${val}`);
        const { data } = response;
        if (data) {
          const fNm = {
            '/OPTOMETRÍA': 'opto',
            '/OFTALMOLOGÍA': 'ofta',
            '/TRABAJO SOCIAL': 'social',
            '/ANTECEDENTES': 'background',
            '/FICHA TÉCNICA': 'dataSheet',
          };
          Object.values(fNm).forEach((item) => {
            this.data[item] = [];
          });
          data.forEach(async (item) => {
            this.data[fNm[item.virtualPath]].push({
              ...item,
              createdAt: moment(item.createdAt).format('DD-MM-YYYY'),
              updatedAt: moment(item.updatedAt).format('DD-MM-YYYY'),
            });
          });
        }
        this.selectFolder(this.currentFolder || this.selectedFolder);
      } catch (error) {
        this.$errorNotify(error);
      }
    },
  },
  async mounted() {
    await this.getData();
  },
  watch: {
    selectedFolder(val) {
      if (val) {
        this.currentFolder = val;
      }
    },
  },
};
</script>
<style lang="scss">
.el-image-viewer__mask {
  opacity: .97!important;
}
</style>
<style lang="scss" scoped>
.main {
  max-height: 500px;
  p {
    padding: 0px 10px;
  }
  .title {
    width: 100%;
    height: 60px;
    position: sticky;
    top: 0;
  }
  .back {
    font-size: 14px;
    color: #9B9B9B;
    width: 20%;
  }
  .back:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  .el-button {
    float: right;
    margin-right: 15px;
    margin-top: 15px;
  }
  .folders {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    .folder {
      width: 200px;
      height: 200px;
      padding: 30px;
      .img-container {
        width: 100%;
        height: 100%;
        img {
          object-fit: contain;
          width: 80%;
          margin-left: 10%;
          height: 80%;
          padding-bottom: 0px;
        }
        p {
          font-size: 15px;
          font-weight: bold;
          min-width: 145px;
        }
      }
    }
  }
  .files {
    display: flex;
    flex-direction: column;
    max-height: 400px;
    height: 400px;
    overflow-y: scroll;
    .header {
      width: 100%;
      display: flex;
      flex-direction: row;
      background-color: #FFFFFF;
      z-index: 3;
      p {
        font-size: 12px;
        font-weight: bold;
        color: #000;
      }
      .name {
        width: 35%;
        margin-left: 10%;
      }
      .date {
        text-align: center;
        width: 18.5%;
      }
      .createdBy {
        text-align: center;
        width: 18.5%;
      }
    }
    .file {
      display: flex;
      flex-direction: row;
      p {
        font-size: 12px;
        color: #000;
      }
      .content {
        text-align: center;
      }
      .prev-container {
        width: 10%;
        height: 40px;
        .preview {
          padding-left: 10%;
          width: 80%;
          height: 80%;
        }
        img {
          padding-left: 10%;
          width: 80%;
          height: 80%;
          object-fit: contain;
        }
      }
    }
  }
}
</style>
