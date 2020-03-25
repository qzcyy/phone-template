<template>
  <div class="checkError">
    <NavBar />
    <div class="innerCon">
      <div class="checkError-box">
        <div class="checkError-box-item">
          <div class="checkError-box-item-key">纠错类型</div>
          <div class="checkError-box-item-value">{{ $route.query.type==='vin'?'VIN解析纠错':$route.query.type==='commodity'?'商品详情纠错':'匹配关系纠错' }}</div>
        </div>
        <div v-if="$route.query.type==='vin'" class="checkError-box-item">
          <div class="checkError-box-item-key">VIN</div>
          <div class="checkError-box-item-value">{{ $route.query.vin }}</div>
        </div>
        <div v-if="$route.query.type!=='commodity'" class="checkError-box-item">
          <div class="checkError-box-item-key">车型</div>
          <div v-if="!checkErrorCarModel" class="checkError-box-item-value">无解析结果</div>
          <div v-else class="checkError-box-item-value">
            <h4 class="checkError-box-item-value-title van-ellipsis">{{ checkErrorCarModel.brand }} {{ checkErrorCarModel.carModel }}</h4>
            <p class="checkError-box-item-value-msg">
              <span class="carModel-list-msg-item">{{ checkErrorCarModel.modelYear }} </span>|
              <span class="carModel-list-msg-item">{{ checkErrorCarModel.salesName }} </span>
            </p>
            <p class="checkError-box-item-value-msg">
              <span class="carModel-list-msg-item">{{ checkErrorCarModel.chassisNum }} </span>|
              <span class="carModel-list-msg-item">{{ checkErrorCarModel.transmissionDescription }} </span>|
              <span class="carModel-list-msg-item">档位:{{ checkErrorCarModel.gearsNum }}</span>
            </p>
            <p class="checkError-box-item-value-msg">
              <span class="carModel-list-msg-item">({{ checkErrorCarModel.productionYear }} - {{ checkErrorCarModel.discontinuationYear }}) </span>|
              <span class="carModel-list-msg-item">{{ checkErrorCarModel.fuelType }}</span> <span
                class="carModel-list-msg-item"
              >{{ checkErrorCarModel.engineModel }}</span>
              |
              <span class="carModel-list-msg-item">{{ checkErrorCarModel.maxPower }}KW</span>
            </p>
          </div>
        </div>
        <div v-if="$route.query.type==='part'||$route.query.type==='commodity'" class="checkError-box-item">
          <div class="checkError-box-item-key">商品</div>
          <div v-if="!checkErrorPartsDetail.part" class="checkError-box-item-value">无配件 - {{ checkErrorPartsDetail.component&&checkErrorPartsDetail.component.name }}</div>
          <div v-else class="checkError-box-item-value">
            <h4 class="checkError-box-item-value-title van-ellipsis">{{ checkErrorPartsDetail.part.name }} {{ checkErrorPartsDetail.part.brand }} {{ checkErrorPartsDetail.part.factoryNumber }}</h4>
            <p class="checkError-box-item-value-msg">
              <span class="carModel-list-msg-item">{{ checkErrorPartsDetail.component&&checkErrorPartsDetail.component.name }} </span>
            </p>
          </div>
        </div>
      </div>
      <div class="checkError-box pb15">
        <h5 class="checkError-box-title">错误说明</h5>
        <textarea v-model="comment" placeholder="请输入错误说明" />
      </div>
      <div class="checkError-box pb15">
        <h5 class="checkError-box-title">上传图片</h5>
        <van-uploader v-model="fileList" :name=" new Date().getTime()" multiple :after-read="afterRead" :before-read="beforeRead" />
      </div>
      <div class="btn-box">
        <van-button block :loading="loading" loading-text="提交中..." type="info" @click="submit">
          确认提交
        </van-button>
      </div>
    </div>
  </div>
</template>
<script>
import { uploadImgBatch, saveVIN, SaveMatching, savePart } from '@/api/errorCheck.js'
import { APP_ID } from '../../utils/request'
import '@/styles/checkError.scss'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      checkErrorCarModel: state => state.checkError.checkErrorCarModel,
      commodity: state => state.checkError.commodity,
      checkErrorPartsDetail: state => state.checkError.checkErrorPartsDetail
    })
  },
  data() {
    return {
      fileList: [],
      imgs: [],
      comment: '',
      loading: false
    }
  },
  mounted() {
    if ((this.$route.query.type === 'vin' || this.$route.query.type === 'prat') && !Object.keys(this.checkErrorCarModel).length) {
      this.$toast.fail('页面刷新，缓存信息失效')
      this.$router.back()
    }
    if (this.$route.query.type === 'commodity' && !Object.keys(this.commodity).length) {
      this.$toast.fail('页面刷新，缓存信息失效')
      this.$router.go(-2)
    }
  },
  methods: {
    submit() {
      if (!this.comment) {
        this.$toast({
          message: '请输入错误说明',
          position: 'bottom'
        })
        return
      }
      if (this.$route.query.type === 'vin') {
        this.loading = true
        saveVIN({
          carId: this.checkErrorCarModel.groupId,
          comment: this.comment,
          imgs: this.fileList.length ? this.fileList.map(item => item.url).join() : '',
          vin: this.$route.query.vin,
          carmodel: !this.checkErrorCarModel ? '无解析结果' : `${this.checkErrorCarModel.manufactor} ${this.checkErrorCarModel.brand} ${this.checkErrorCarModel.carModel} ${this.checkErrorCarModel.modelYear} ${this.checkErrorCarModel.salesName} (${this.checkErrorCarModel.productionYear} ${this.checkErrorCarModel.discontinuationYear})`
        }).then(res => {
          this.loading = false
          this.$notify({ type: 'success', message: '提交成功', duration: 3000 })
        }, err => {
          this.loading = false
        })
      } else if (this.$route.query.type === 'part') {
        this.loading = true
        SaveMatching({
          carGroupId: this.checkErrorCarModel.id,
          comment: this.comment,
          imgs: this.fileList.length ? this.fileList.map(item => item.url).join() : '',
          partId: this.checkErrorPartsDetail.part.id,
          carmodel: !this.checkErrorCarModel ? '无解析结果' : `${this.checkErrorCarModel.manufactor} ${this.checkErrorCarModel.brand} ${this.checkErrorCarModel.carModel} ${this.checkErrorCarModel.modelYear} ${this.checkErrorCarModel.salesName} (${this.checkErrorCarModel.productionYear} ${this.checkErrorCarModel.discontinuationYear})`,
          goods: !this.checkErrorPartsDetail.part && !Object.keys(this.checkErrorPartsDetail.part).length
            ? `无匹配结果-${this.checkErrorPartsDetail.componentParent.name}-${this.checkErrorPartsDetail.component.name}`
            : `${this.checkErrorPartsDetail.componentParent.name}-${this.checkErrorPartsDetail.component.name}-${this.checkErrorPartsDetail.part.name}-${this.checkErrorPartsDetail.part.brand}-${this.checkErrorPartsDetail.part.factoryNumber}`
        }).then(res => {
          this.loading = false
          this.$notify({ type: 'success', message: '提交成功', duration: 3000 })
        }, err => {
          this.loading = false
        })
      } else if (this.$route.query.type === 'commodity') {
        this.loading = true
        savePart({
          comment: this.comment,
          imgs: this.fileList.length ? this.fileList.map(item => item.url).join() : '',
          partId: this.checkErrorPartsDetail.part.id,
          goods: !this.checkErrorPartsDetail.part && !Object.keys(this.checkErrorPartsDetail.part).length
            ? `无匹配结果-${this.checkErrorPartsDetail.componentParent.name}-${this.checkErrorPartsDetail.component.name}`
            : `${this.checkErrorPartsDetail.componentParent.name}-${this.checkErrorPartsDetail.component.name}-${this.checkErrorPartsDetail.part.name}-${this.checkErrorPartsDetail.part.brand}-${this.checkErrorPartsDetail.part.factoryNumber}`
        }).then(res => {
          this.loading = false
          this.$notify({ type: 'success', message: '提交成功', duration: 3000 })
        }, err => {
          this.loading = false
        })
      }
    },
    beforeRead(file) {
      if (file.type.indexOf('image/') === -1) {
        this.$toast('请选择图片类型')
        return false
      }
      return true
    },
    afterRead(file, detail) {
      file.status = 'uploading'
      file.message = '上传中...'
      const params = new FormData()
      params.append('file', file.file)
      params.append('type', 'errorcorrection')
      uploadImgBatch(params, {
        headers: { 'Content-Type': 'multipart/form-data', userid: this.$store.getters.userId, appid: APP_ID }
      }).then(res => {
        if (res.data.code === 1) {
          file.status = 'failed'
          file.message = '上传失败'
        } else {
          file.url = res.data.data.path
          file.status = 'done'
          file.message = ''
        }
      }, err => {
        file.status = 'failed'
        file.message = '上传失败'
      })
    }
  }
}
</script>
