<template>
  <el-avatar
    :size="size"
    :src="avatar"
    :shape="shape"
    :alt="alt"
    :fit="fit"
    @error="error"
  >
    <img src="../assets/empty-cube-image.png" alt="empty image" >
  </el-avatar>
</template>

<script>
import { Avatar } from 'element-ui';

export default {
  props: {
    own: {
      type: Boolean,
      default: false,
    },
    src: {
      type: String,
      default: '',
    },
    size: {
      type: [Number, String],
      default: 'large',
    },
    shape: {
      type: String,
      default: 'circle',
    },
    alt: {
      type: String,
      default: 'avatar',
    },
    fit: {
      type: String,
      default: 'cover',
    },
    error: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      avatar: null,
    };
  },
  components: {
    'el-avatar': Avatar,
  },
  methods: {
    async fetch() {
      if (this.own && this.src) {
        const response = await this.axios.get(this.src, { responseType: 'arraybuffer' });
        if (response.status === 200) {
          const { data } = response;
          const bytes = new Uint8Array(data);
          const base64String = btoa(String.fromCharCode(...bytes));
          this.avatar = `data:image/png;base64,${base64String}`;
        } else {
          this.avatar = null;
        }
      } else {
        this.avatar = this.src;
      }
    },
  },
  created() {
    this.fetch();
  },
  watch: {
    src(val) {
      if (val) {
        this.fetch();
      } else {
        this.avatar = null;
      }
    },
  },
};
</script>
