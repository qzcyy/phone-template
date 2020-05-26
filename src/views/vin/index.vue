<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        class="van-search-b"
        shape="round"
        show-action
        placeholder="请输17位车架号查询"
        @search="onSearch"
      >
        <div slot="action" @click="onCancel">取消</div>
        <div slot="label">VIN</div>
      </van-search>
    </form>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      class="vin-search-list"
      @load="onLoad"
    >
      <van-cell v-for="item in searchList" :key="item.id" @click="listSearch(item.vin)">
        <span slot="title" style="width: 100%">{{ item.vin }}</span>
        <van-icon
          slot="right-icon"
          name="search"
          style="line-height: inherit;"
        />
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import { queryVinScanningList, saveVinScanning, queryCarModelByVin, queryCarModelGroupByVinAggregation } from '@/api/vin.js'
import '../../styles/vin.scss'
import { Toast } from 'vant'

export default {
  data() {
    return {
      value: '',
      list: [],
      loading: false,
      finished: false,
      searchQuery: {
        pageIndex: 1,
        pageSize: 10
      }
    }
  },
  computed: {
    searchList() {
      if (this.value) {
        return this.list.filter(item => item.vin.indexOf(this.value) !== -1)
      } else {
        return this.list
      }
    }
  },
  mounted() {
    this.onLoad()
    this.value = this.$route.params.vin
  },
  methods: {
    listSearch(val) {
      this.value = val
      this.onSearch(val)
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
        // if (res.length === 1) {-
          // this.$router.push('/parts/' + res[0].ids + '?name=' + res[0].title + '&vin=' + val + '&nLevelIDs=' + res[0].nLevelIDs)
        // } else {
          this.$router.push('/vinSearch/' + val)
        // }
      }, err => {
        this.$toast.clear()
      })
    },
    onCancel() {
      // this.$router.go(-1)
      history.back(-1)
    },
    onLoad(val) {
      this.loading = true
      queryVinScanningList(this.searchQuery).then(res => {
        this.loading = false
        this.list = this.list.concat(res.list)
        this.searchQuery.pageIndex++
        if (res.list.length < this.searchQuery.pageSize) {
          this.finished = true
        }
      })
    }
  }
}
</script>
<style>
  .van-search-b{
    border-bottom: 2px solid #F4F5F7;
  }
</style>
