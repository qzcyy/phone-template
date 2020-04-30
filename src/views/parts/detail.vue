<template>
  <div class="mainCon">
    <NavBar>
      <div slot="right">
        <van-icon class="mr10" :name="require('../../assets/icon_mis.png')" size="24" @click="errorCheck" />
        <van-icon :name="require('../../assets/icon_home_line_balck.png')" size="24" @click="$router.push('/home')" />
      </div>
    </NavBar>
    <div class="innerCon">
      <van-swipe v-if="detail.imgList&&detail.imgList.length" class="detail-swipe" @change="onChange">
        <van-swipe-item v-for="(item,index) in detail.imgList" :key="index">
          <img class="detail-swipe-img" :src="item.imgPath|| require('../../assets/pic_def_bj.png')" alt="图片加载失败" @click="showImgList(detail.imgList,index)">
        </van-swipe-item>
        <div slot="indicator" class="custom-indicator">
          {{ current + 1 }}/{{ detail.imgList&& detail.imgList.length }}
        </div>
      </van-swipe>
      <van-swipe v-else class="detail-swipe">
        <van-swipe-item>
          <img class="detail-swipe-img" :src="require('../../assets/pic_def_bj.png')" alt="图片加载失败">
        </van-swipe-item>
        <div slot="indicator" class="custom-indicator">
          1/1
        </div>
      </van-swipe>
      <div class="detail-container">
        <h2 class="title-2">{{ detail.brand }} {{ detail.categoryName }} {{ detail.name }}</h2>
        <p class="info-2 mt10">{{ detail.partsCode }} | {{ detail.specificationModel }}</p>
      </div>
      <div class="detail-container mt10">
        <h3 class="title-3">基本信息</h3>
        <p class="info-box-1 wb50"><span class="box-title">配件品质</span> {{ detail.partquality?detail.partquality==='0'?'原厂件':detail.partquality==='1'?'品牌件':'拆车件':'--' }}</p>
        <p class="info-box-1 wb50"><span class="box-title">出厂编码</span> {{ detail.factoryNumber }}</p>
        <p class="info-box-1 wb50"><span class="box-title">是否OE件</span> {{ detail.isoe==='1'?'是':'否' }}</p>
        <p class="info-box-1 wb50"><span class="box-title">包装规格</span> {{ detail.packagingSpecification }}</p>
        <p class="info-box-1 wb50"><span class="box-title">产地</span> {{ detail.placeProduction }}</p>
        <p class="info-box-1 wb50"><span class="box-title">单位</span> {{ detail.measurementUnit }}</p>
        <p class="info-box-1"><span class="box-title">车型备注</span> {{ detail.modelRemark }}</p>
      </div>
      <div v-if="detail.extendDatas&&detail.extendDatas.length" class="detail-container mt10">
        <h3 class="title-3">规格参数</h3>
        <p v-for="item in detail.extendDatas" :key="item.key" class="info-box-1 wb50"><span class="box-title">{{ item.key }}</span> {{ item.value }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { queryPartDetail } from '@/api/parts'
import { ImagePreview } from 'vant'

export default {
  data() {
    return {
      detail: {},
      current: 0
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    errorCheck() {
      this.$store.commit('checkError/SET_COMMIDITY', this.detail)
      this.$router.push('/checkError?type=commodity')
    },
    onChange(index) {
      this.current = index
    },
    getDetail() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中'
      })
      queryPartDetail({
        id: this.$route.params.partId
      }).then(res => {
        this.detail = res
        this.$toast.clear()
      })
    },
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
