<template>
  <el-row class="row" id="docsDialog">
    <el-dialog
      :visible="docsVisible"
      width="70%"
      :close-on-press-escape="false">
      <Docs
        :selectedFolder="folder"
        :showReturn="false"
        v-on:closeDialog="$emit('closeDialog')" />
    </el-dialog>
  </el-row>
</template>

<script>
import Docs from './index';

export default {
  name: 'DocsDialog',
  props: {
    docsVisible: {
      type: Boolean,
      default: false,
    },
    folder: {
      type: String,
    },
  },
  components: {
    Docs,
  },
};
</script>


<style lang="scss">
#docsDialog {
  .el-dialog__header {
    padding: 0px;
  }
  .right-title {
    box-shadow: 0px 5px 5px rgba(200, 200, 200, 0.5)!important;
    -webkit-box-shadow: 0px 5px 5px rgba(200, 200, 200, 0.5)!important;
    -moz-box-shadow: 0px 5px 5px rgba(200, 200, 200, 0.5)!important;
    margin-bottom: 10px;
  }
  .el-dialog__body{
    margin-top: 0px!important;
    padding: 0px!important;
    min-height: 200px!important;
    height: 530px;
    max-height: 530px!important;
  }
  .files {
    height: 200!important;
  }
}
</style>
