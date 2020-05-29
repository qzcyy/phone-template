<template>
  <div class="transmission-list">
    <div class="transmission-list-item van-clearfix">
      <span class="transmission-list-item-key">变速箱/档位</span>
      <div class="transmission-list-item-value">{{ detail.carmodelGroupGearbox&&detail.carmodelGroupGearbox.transmissionDescription }} / {{ detail.carmodelGroupGearbox&&detail.carmodelGroupGearbox.gearsNum }}</div>
    </div>
    <div v-for="item in detail.parts" :key="item.name" class="transmission-list-item van-clearfix">
      <span class="transmission-list-item-key">{{ item.name }}</span>
      <div class="transmission-list-item-value">
        <div v-for="item2 in item.list" :key="item2.id" class="transmission-list-item-value-item">
          <img :src="item2.imgs.split(',')[0]|| require('../../../assets/pic_def_bj.png')" alt="暂无图片">
          <div class="transmission-list-item-value-item-value">
            <div class="title-4 van-ellipsis">{{ item2.brand }} {{ item2.name }}</div>
            <span>{{ item2.specificationModel }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="transmission-list-item van-clearfix">
      <span class="transmission-list-item-key">原厂加注量</span>
      <div class="transmission-list-item-value">
        {{ detail.carmodelGroupGearbox&&detail.carmodelGroupGearbox.fillingcapacity ||'--' }}
      </div>
    </div>
    <div class="transmission-list-item van-clearfix">
      <span class="transmission-list-item-key">换油量(L)</span>
      <div class="transmission-list-item-value">
        重力：{{ detail.carmodelGroupGearbox&&detail.carmodelGroupGearbox.gravity ||'--' }} 机器：{{ detail.carmodelGroupGearbox&&detail.carmodelGroupGearbox.machine ||'--' }}
      </div>
    </div>
    <div class="transmission-list-item van-clearfix">
      <span class="transmission-list-item-key">换油接头</span>
      <div class="transmission-list-item-value">
        {{ detail.carmodelGroupGearbox&&detail.carmodelGroupGearbox.oilchangeConnector ||'--' }}
        <img v-for="(item,index) in detail.oilchangeConnectorPhoto" :key="item" :src="item" @click="showImgList(detail.oilchangeConnectorPhoto,index)">
      </div>
    </div>
    <div class="transmission-list-item van-clearfix">
      <span class="transmission-list-item-key">检查口/加注/放油口</span>
      <div class="transmission-list-item-value">
        <img v-for="(item,index) in detail.inspectionPhoto" :key="item" :src="item" @click="showImgList(detail.inspectionPhoto,index)">
      </div>
    </div>
    <div class="transmission-list-item van-clearfix">
      <span class="transmission-list-item-key">养护指导</span>
      <div class="transmission-list-item-value">
        <img v-for="(item,index) in detail.guidancePhoto" :key="item" :src="item" @click="showImgList(detail.guidancePhoto,index)">
      </div>
    </div>
    <div class="transmission-list-item van-clearfix">
      <span class="transmission-list-item-key">变速箱图片</span>
      <div class="transmission-list-item-value">
        <img v-for="(item,index) in detail.boxPhoto" :key="item" :src="item" @click="showImgList(detail.boxPhoto,index)">
      </div>
    </div>
  </div>
</template>
<script>
import { ImagePreview } from 'vant'
import { queryGearbox } from '@/api/carModel'
export default {
  data() {
    return {
      detail: {}
    }
  },
  mounted() {
    queryGearbox({
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
