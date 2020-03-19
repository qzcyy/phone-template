<template>
  <div class="maintenance">
    <!--<div class="maintenance-search"></div>-->
    <van-tabs v-model="activeTab" color="#3F90F7" @change="changeTab">
      <van-tab v-for="tab in tabs" :key="tab.componentCode" :title="tab.name" :name="tab.componentCode" />
      <van-sidebar v-model="activeSidebar" @change="changeSidebar">
        <van-sidebar-item v-for="sidebar in sidebars" :key="sidebar.componentCode" :title="sidebar.name" />
      </van-sidebar>
    </van-tabs>
    <div class="maintenance-list">
      <div class="maintenance-filter">
        {{ selectedSidebar.name }}
        <a href="javascript:;">部件详情</a>
        <a href="javascript:;">品牌筛选</a>
      </div>
      <van-list
        v-model="loading"
        class="maintenance-list-wrapper"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="queryList"
      >
        <div v-for="item in list" :key="item.id" class="maintenance-item van-clearfix" @click="$router.push('/parts/detail/'+item.id)">
          <img :src="item.imgPath || require('../../../assets/pic_def_bj.png')" alt="图片加载失败">
          <div class="right-box">
            <div class="title-4 van-ellipsis">{{ item.brand }} {{ item.name }}</div>
            <span>{{ item.specificationModel }} | {{ item.factoryNumber }}</span>
            <span>备注：{{ item.modelRemark||'--' }}</span>
            <span>车型备注：{{ item.remarks||'--' }}</span>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import { ImagePreview } from 'vant'
import { queryTopComponentList, queryBottomComponentList, queryAllPartsList } from '@/api/parts'
export default {
  data() {
    return {
      activeSidebar: 0,
      activeTab: '',
      tabs: [],
      sidebars: [],
      list: [],
      loading: false,
      finished: true,
      searchQuery: {
        pageIndex: 1,
        pageSize: 10
      }
    }
  },
  computed: {
    selectedSidebar() {
      return this.sidebars[this.activeSidebar] || {}
    }
  },
  mounted() {
    this.queryTabs()
  },
  methods: {
    changeTab(componentCode) {
      this.sidebars = []
      this.list = []
      queryBottomComponentList({
        componentCode
      }).then(res => {
        this.sidebars = res
        const codeIndex = res.findIndex(item => item.componentCode === this.$store.state.carModel.secondcomponentcode)
        this.activeSidebar = codeIndex === -1 ? 0 : codeIndex
        this.changeSidebar()
      })
    },
    changeSidebar() {
      this.list = []
      this.searchQuery.pageIndex = 1
      this.queryList()
    },
    queryList() {
      this.loading = true
      this.finished = false
      if (!this.$route.params.id) return
      queryAllPartsList({
        componentCode: this.selectedSidebar.componentCode,
        groupId: this.$route.params.id,
        ...this.searchQuery
      }).then(res => {
        this.list = this.list.concat(res.list)
        this.loading = false
        if (res.total > this.list.length) {
          this.searchQuery.pageIndex++
        } else {
          this.finished = true
        }
      })
    },
    queryTabs() {
      queryTopComponentList().then(res => {
        this.tabs = res
        this.activeTab = this.$store.state.carModel.firstcomponentcode
        queryBottomComponentList({
          componentCode: this.activeTab || res[0].componentCode
        }).then(res => {
          this.sidebars = res
          const codeIndex = res.findIndex(item => item.componentCode === this.$store.state.carModel.secondcomponentcode)
          this.activeSidebar = codeIndex === -1 ? 0 : codeIndex
          this.changeSidebar()
        })
      })
    }
  }
}
</script>
