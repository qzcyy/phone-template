<template>
  <div class="maintenance">
    <!--<div class="maintenance-search"></div>-->
    <div class="maintenance-list">
      <van-list
        v-show="list.length||loading"
        v-model="loading"
        class="maintenance-list-wrapper"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="queryList"
      >
        <div v-for="item in list" :key="item.id" class="maintenance-item" @click="goDetail(item)">
          <img :src="item.imgs.split(',')[0] || require('../../../assets/pic_def_bj.png')" alt="图片加载失败">
          <div class="right-box">
            <div class="title-4 van-ellipsis">{{ item.brand }} {{ item.name }}</div>
            <span>{{ item.specificationModel }} | {{ item.factoryNumber }}</span>
            <span>备注：{{ item.modelRemark||'--' }}</span>
          </div>
        </div>
      </van-list>
      <div v-show="!list.length&&!loading" class="no-message" />
    </div>
  </div>
</template>
<script>
import { ImagePreview } from 'vant'
import { queryMaintainPartList } from '@/api/parts'
export default {
  props: ['carModelGroupDetail'],
  data() {
    return {
      list: [],
      loading: false,
      finished: true
    }
  },
  mounted() {
    this.queryList()
  },
  methods: {
    goDetail(item) {
      this.$router.push('/parts/detail/' + item.id)
    },
    showImgList(urls, index) {
      ImagePreview({
        images: urls.map(item => item.imgPath),
        startPosition: index,
        closeable: true
      })
    },
    queryList() {
      this.loading = true
      this.finished = false
      if (!this.$route.params.id) return
      const params = {
        groupId: this.$route.params.id
      }
      queryMaintainPartList(params).then(res => {
        this.list = res
        this.loading = false
        this.finished = true
      })
    }
  }
}
</script>
