<template>
  <div>
    <div class="list-default">
      <div v-for="(item,index) in detail" :key="index" class="list-col">
        <div v-for="(item2,index2) in item" :key="index2" class="list-row">{{ item2 }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { ImagePreview } from 'vant'
import { queryOilInfoByGroupID } from '@/api/carModel'
export default {
  data() {
    return {
      detail: []
    }
  },
  mounted() {
    queryOilInfoByGroupID({
      groupId: this.$route.params.id
    }).then(res => {
      this.detail = res
    })
  },
  methods: {
    showImgList(urls, index) {
      ImagePreview({
        images: urls.map(item => item.imgPath),
        startPosition: index,
        closeable: true
      })
    }
  }
}
</script>
