<template>
  <div class="mainCon">
    <NavBar />
    <div class="innerCon" style="overflow: hidden">
      <iframe :src="src" style="width: 100%;height: 100%;margin: -2px 0 0 -2px" />
    </div>
  </div>
</template>
<script>
import { signatureUrl } from '../../utils/signature'
const baseApi = process.env.VUE_APP_BASE_API

export default {
  data() {
    return {
      detail: {},
      src: ''
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      const currentSignatureUrl = signatureUrl({ id: this.$route.params.id })
      if (this.$route.query.type === 'maintenance') {
        this.src = '/pdf/web/viewer.html?file=' + encodeURIComponent(baseApi + '/bookMaintenance/pdf?id%3D' + this.$route.params.id + '&signatureUrl=' + currentSignatureUrl)
      } else {
        this.src = '/pdf/web/viewer.html?file=' + encodeURIComponent(baseApi + '/bookRepair/manual/pdf?id%3D' + this.$route.params.id + '&signatureUrl=' + currentSignatureUrl)
      }
    }
  }
}
</script>
