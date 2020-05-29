<template>
  <div style="height: 100%">
    <form action="/">
      <van-search
        v-model="value"
        class="van-search-b"
        shape="round"
        show-action
        placeholder="名称、规格、出厂编码、车型、品牌"
        @search="onLoad"
      >
        <div slot="action" @click="onCancel">取消</div>
      </van-search>
    </form>
    <div class="maintenance" style="height: calc(100% - 58px)">
      <div class="maintenance-list" style="height: 100%">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          class="maintenance-list-wrapper"
          style="height: 100%"
          :immediate-check="false"
          @load="onLoad"
        >
          <div v-for="item in list" :key="item.id" class="maintenance-item" @click="goDetail(item)">
            <img :src="item.imgs.split(',')[0] || require('../../assets/pic_def_bj.png')" alt="图片加载失败">
            <div class="right-box">
              <div class="title-4 van-ellipsis" style="padding: 12px 3px 10px 3px">{{ item.brand }} {{ item.name }}</div>
              <span style="padding: 3px 3px 10px 3px">{{ item.specificationModel }} | {{ item.factoryNumber }}</span>
              <!--<span>备注：{{ item.modelRemark||'&#45;&#45;' }}</span>-->
            </div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import { queryPartsList } from '@/api/parts.js'
import '../../styles/vin.scss'
import '@/styles/parts.scss'
import { Toast } from 'vant'

export default {
  data() {
    return {
      value: '',
      value1: '',
      list: [],
      loading: false,
      finished: false,
      searchQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  methods: {
    goDetail(item) {
      this.$router.push('/parts/detail/' + item.id)
    },
    listSearch(val) {
      this.value = val
      this.onSearch(val)
    },
    onCancel() {
      // this.$router.go(-1)
      history.back(-1)
    },
    onLoad(val) {
      this.loading = true
      if (this.value !== this.value1) {
        this.list = []
        this.searchQuery.page = 1
      }
      queryPartsList(
        {
          ...this.searchQuery,
          name: this.value
        }).then(res => {
        this.loading = false
        this.list = this.list.concat(res)
        this.value1 = this.value
        this.searchQuery.page++
        if (res.length < this.searchQuery.limit) {
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
