<template>
  <div class="checkError me">
    <NavBar />
    <div class="innerCon">
      <div class="checkError-box">
        <div class="checkError-box-item">
          <div class="checkError-box-item-key">提交时间</div>
          <div class="checkError-box-item-value">{{ detailInfo.submitTime }}</div>
        </div>
        <div class="checkError-box-item">
          <div class="checkError-box-item-key">纠错类型</div>
          <div class="checkError-box-item-value">{{ detailInfo.errorCorrectionType }}</div>
        </div>
        <div v-if="detail.vin" class="checkError-box-item">
          <div class="checkError-box-item-key">VIN</div>
          <div class="checkError-box-item-value">{{ detail.vin }}</div>
        </div>
        <div v-if="detail.carmodel" class="checkError-box-item">
          <div class="checkError-box-item-key">车型</div>
          <div class="checkError-box-item-value">{{ detail.carmodel }}</div>
        </div>
        <div v-if="detail.commodity" class="checkError-box-item">
          <div class="checkError-box-item-key">商品</div>
          <div class="checkError-box-item-value">{{ detail.commodity }}</div>
        </div>

      </div>
      <div class="checkError-box pb15">
        <div class="checkError-box-item">
          <div class="checkError-box-item-key">错误说明</div>
          <div class="checkError-box-item-value">{{ detailInfo.errorDescription }}</div>
        </div>
      </div>
      <div class="checkError-box pb15" v-if="imgs.length">
        <h5 class="checkError-box-title">上传图片</h5>
        <van-grid :border="false" :column-num="4" square :gutter="10">
          <van-grid-item v-for="(item,index) in imgs" :key="item.id" @click="showImgList(imgs,index)">
            <van-image :src="item.imgPath">
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="checkError-box pb15">
        <div class="checkError-box-item">
          <div class="checkError-box-item-key">回复状态</div>
          <div class="checkError-box-item-value">{{ Number(detailInfo.recoveryState)===1?'已回复':'未回复' }}</div>
        </div>
        <div class="checkError-box-item">
          <div class="checkError-box-item-key">是否采用</div>
          <div class="checkError-box-item-value">{{ Number(detailInfo.isuse)===1?'已采用':'未采用' }}</div>
        </div>
        <div class="checkError-box-item">
          <div class="checkError-box-item-key">回复情况</div>
          <div class="checkError-box-item-value">{{ detailInfo.replySituation }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getDetail } from '@/api/errorCheck.js'
import '@/styles/checkError.scss'
import { ImagePreview } from 'vant'
export default {
  data() {
    return {
      imgs: [],
      detail: {},
      detailInfo: {}
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    showImgList(urls, index) {
      ImagePreview({
        images: urls.map(item => item.imgPath),
        startPosition: index,
        closeable: true
      })
    },
    getDetail() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中'
      })
      getDetail({
        ID: this.$route.params.id
      }).then(res => {
        this.detail = res.detail
        this.detailInfo = res.info
        this.imgs = res.imgs
        this.$toast.clear()
      }, err => {
        this.$toast.clear()
      })
    }
  }
}
</script>
