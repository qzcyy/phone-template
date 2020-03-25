<template>
  <div class="mainCon checkError me">
    <NavBar />
    <div class="innerCon">
      <van-tabs v-model="searchQuery.type" color="#3F90F7" title-active-color="#3F90F7" @click="onLoad(true)">
        <van-tab title="已回复" name="1" />
        <van-tab title="未回复" name="2" />
      </van-tabs>
      <van-pull-refresh
        v-model="loadingRefresh"
        success-text="刷新成功"
        loading-text=""
        @refresh="onRefresh"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div v-for="item in list" :key="item.id" class="con-block" :class="{'looked':Number(item.islook)===1}" @click="$router.push('/checkError/detail/'+item.id)">
            <div class="title-2">{{ item.errorCorrectionType }}</div>
            <div class="info-2 mt10">{{ item.submitTime }}</div>
            <div class="arrow-r">
              <van-icon size="20" color="#CCCCCC" name="arrow" />
            </div>
            <div class="tags">
              <van-tag plain :type="Number(item.isuse)===1 ?'success':'primary'">{{ Number(item.isuse)===1 ?'已采用':'未采用' }}</van-tag>
              <van-tag plain>{{ Number(item.recoveryState)===1 ?'已回复':'未回复' }}</van-tag>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import { query } from '../../api/errorCheck'
import '@/styles/checkError.scss'

export default {
  data() {
    return {
      list: [],
      loading: false,
      loadingRefresh: false,
      finished: false,
      searchQuery: {
        pageIndex: 1,
        pageSize: 10,
        type: '2'
      }
    }
  },
  methods: {
    onRefresh() {
      this.finished = false
      this.loading = true
      this.onLoad(true)
    },
    onLoad(initIndex) {
      if (this.loadingRefresh) {
        this.list = []
        this.loadingRefresh = false
      }
      if (initIndex) {
        this.searchQuery.pageIndex = 1
        this.list = []
      }
      this.loading = true
      this.finished = false
      query(this.searchQuery).then(res => {
        this.list = this.list.concat(res.list)
        if (this.list.length >= res.page.total) {
          this.finished = true
          this.loading = false
          this.loadingRefresh = false
        } else {
          this.searchQuery.pageIndex++
          this.loadingRefresh = false
          this.loading = false
        }
      })
    }
  }
}
</script>
