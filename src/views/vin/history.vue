<template>
  <div class="mainCon">
    <NavBar />
    <van-search
      v-model="value"
      shape="round"
      class="van-search-b"
      placeholder="请输入车型信息"
      @search="searchCarModel"
    >
      <div slot="label">车型</div>
    </van-search>
    <div class="innerCon hasOtherHeader">
      <div class="vin-list">
        <h2 class="title-2 vin-list-title">历史查询记录</h2>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div v-for="item in list" :key="item.id" class="vin-list-item" @click="onSearch(item.vin)">
            <div class="arrow-r">
              <van-icon size="20" color="#CCCCCC" name="arrow" />
            </div>
            <div v-for="(info,index) in item.detail" class="vin-list-item-info mt10">
              <template v-if="info.title">
                <h2 class="title-2 van-ellipsis">
                  {{info.title}}
                  <!--{{ info.manufactor }} {{ info.brand }} {{ info.carModel }} {{ info.modelYear }}款-->
                </h2>
              </template>
              <template v-else>
                <h2 class="title-2 van-ellipsis">
                  {{ info.manufactor }} {{ info.brand }} {{ info.carModel }} {{ info.modelYear }}款
                </h2>
                <div v-if="item.detail.length>1" class="carModel-index">车型{{ index+1 }}</div>
                <div class="info-2 mt10">
                  {{ info.salesName }}({{ info.productionYear }}-{{ info.discontinuationYear }})
                </div>
              </template>
            </div>
            <div class="vin-list-item-bottom van-clearfix mt10">
              <div class="vin-list-item-bottom-vin">
                {{ item.vin }}
              </div>
              <div class="vin-list-item-bottom-time">
                {{ item.createTime }}
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import { queryVinScanningListVague, queryCarModelGroupByVinAggregation, saveVinScanning } from '@/api/vin.js'
import '@/styles/vin.scss'
export default {
  data() {
    return {
      value: '',
      loading: false,
      finished: false,
      list: [],
      searchQuery: {
        pageIndex: 1,
        pageSize: 10,
        condition: ''
      }
    }
  },
  methods: {
    searchCarModel() {
      this.searchQuery.condition = this.value
      this.searchQuery.pageIndex = 1
      this.finished = false
      this.list = []
      this.onLoad()
    },
    onSearch(val) {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '查询中...'
      })
      queryCarModelGroupByVinAggregation({
        vin: val,
        type: 2
      }).then(res => {
        this.$store.commit('carModel/SET_FIRST_COMPONENT_CODE', '')
        this.$store.commit('carModel/SET_SECOND_COMPONENT_CODE', '')
        this.$store.commit('vin/SET_VIN_SEARCH', res)
        this.$store.commit('vin/SET_VIN', val)
        this.$toast.clear()
        saveVinScanning({
          vin: val,
          carGroup: JSON.stringify(res)
        })
        // if (res.length === 1) {
          // this.$router.push('/parts/' + res[0].ids + '?name=' + res[0].title + '&vin=' + val + '&nLevelIDs=' + res[0].nLevelIDs)
        // } else {
          this.$router.push('/vinSearch/' + val)
        // }
      }, err => {
        this.$toast.clear()
      })
    },
    onLoad(val) {
      this.loading = true
      queryVinScanningListVague(this.searchQuery).then(res => {
        this.loading = false
        this.list = this.list.concat(res.list.map(item => {
          return {
            ...item,
            detail: JSON.parse(item.carGroup)
          }
        }))
        this.searchQuery.pageIndex++
        if (res.list.length < this.searchQuery.pageSize) {
          this.finished = true
        }
      })
    }
  }
}
</script>
