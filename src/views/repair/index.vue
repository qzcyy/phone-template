<template>
  <div>
    <NavBar />
    <van-search
      v-model="value"
      shape="round"
      placeholder="品牌、车型、案例名称、车辆信息、故障现象"
      @search="onSearch"
    />
    <div class="innerCon repair">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="item in list" :key="item.id" class="con-block" @click="$router.push('/repair/detail/'+item.id)">
          <h2 class="title-2 van-multi-ellipsis--l2">{{ item.casename }}</h2>
          <div class="info-2 mt10">{{ item.brand }} {{ item.carmodel }}</div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import { findAllRepairCaseListForApp } from '@/api/repair.js'
export default {
  data() {
    return {
      value: '',
      list: [],
      loading: false,
      finished: false,
      searchQuery: {
        pageIndex: 1,
        pageSize: 10,
        condition: ''
      }
    }
  },
  mounted() {
    this.onLoad()
  },
  methods: {
    onSearch(val) {
      this.searchQuery.pageIndex = 1
      this.searchQuery.condition = val
      this.list = []
      this.onLoad()
    },
    onLoad() {
      this.loading = true
      findAllRepairCaseListForApp(this.searchQuery).then(res => {
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
  .innerCon.repair{
    top: 100px;
  }
</style>
